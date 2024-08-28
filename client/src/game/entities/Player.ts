import { Scene, GameObjects, Animations } from 'phaser';
import Grass from '../tiles/Grass';
import Tile from '../tiles/Tile';
import { PlayerAvatar } from '@/shared/players/types';
import { Vector2 } from '@/shared/maps/types';

export default class Player extends GameObjects.Container {
    protected static readonly POSITION_UPDATE_INTERVAL = 250;
    static readonly avatars: PlayerAvatar[] = ["red", "blue", "may"] as const; // "bug_catcher", "cloudz", "flynger"
    static readonly speed = 180;
    static readonly NAME_TAG = {
        OFFSET: 41,
        PADDING_X: 16
    } as const;

    scene: Scene;
    headSprite: GameObjects.Sprite;
    bodySprite: GameObjects.Sprite;
    nameTagBackground: GameObjects.Graphics;
    nameTag: GameObjects.Text;
    avatar: string;
    name: string;

    /* For estimating velocity */
    private prevX: number;
    private prevY: number;

    declare body: Phaser.Physics.Arcade.Body; // Assert proper type

    // create anims
    static createAnimations(scene: Scene) {
        const directions = ['down', 'left', 'right', 'up'];
        const frameSets = [
            { start: 0, end: 3 },
            { start: 4, end: 7 },
            { start: 8, end: 11 },
            { start: 12, end: 15 }
        ];
        for (const avatar of Player.avatars) {
            for (const i in directions) {
                const direction = directions[i];
                scene.anims.create({
                    key: `${avatar}_${direction}`,
                    frames: scene.anims.generateFrameNumbers(avatar, frameSets[i]),
                    frameRate: 10,
                    repeat: -1
                });
            }
        }
    }

    constructor(scene: Scene, x: number, y: number, avatar: string, name: string) {
        super(scene, x, y);
        this.scene = scene;
        this.avatar = avatar;
        this.name = name;

        // Create sprite
        this.headSprite = scene.add.sprite(0, 0, avatar);
        this.headSprite.setCrop(0, 0, 32, 36); // 32 pixels tall
        this.headSprite.setOrigin(0.5, 0.5);
        this.add(this.headSprite);

        // Create bottom half of the sprite with alpha
        this.bodySprite = scene.add.sprite(0, 0, avatar);
        this.bodySprite.setCrop(0, 36, 32, 12); // 12 pixels tall

        // Enable container physics
        scene.physics.world.enable(this);
        this.body.onOverlap = true;
        this.body.setSize(26, 12);
        this.body.setOffset(-13, 10);

        scene.physics.add.collider(this, Tile.collidingTiles);

        // Create name tag text
        this.nameTag = scene.add.text(0, 0, name, {
            font: '28px Power Clear',
            color: '#ffffff'
        });
        this.nameTag.setOrigin(0.5, 0);
        this.nameTag.scale = 0.6;
        this.nameTag.setDepth(100000);

        // Create background rectangle for the name tag
        const nameTagBackgroundWidth = this.nameTag.width * this.nameTag.scale + Player.NAME_TAG.PADDING_X;
        this.nameTagBackground = scene.add.graphics();
        this.nameTagBackground.fillStyle(0x222222, 0.8); // Gray color with 80% opacity
        this.nameTagBackground.fillRoundedRect(-nameTagBackgroundWidth / 2, 0, nameTagBackgroundWidth, 20, 6); // x, y, width, height, radius
        this.nameTagBackground.setDepth(99999);

        // body.setCollideWorldBounds();

        // Add name tag and background to the scene (not inside the container)
        scene.add.existing(this);
        scene.add.existing(this.nameTagBackground);
        scene.add.existing(this.nameTag);

        // handle postupdate
        scene.events.on('postupdate', () => {
            // Update body
            this.bodySprite.setPosition(this.x, this.y);
            // Update the position of the name tag and background to follow the player
            this.nameTag.setPosition(this.x + 1, this.y - Player.NAME_TAG.OFFSET);
            this.nameTagBackground.setPosition(this.x, this.y - Player.NAME_TAG.OFFSET);
        });

        Players.set(name, this);
        console.log("Creating player: " + name);
    }

    update(time: number, delta: number) {
        const { x: velocityX, y: velocityY } = this.getVelocity(delta);
        
        if (this.scene.physics.world.overlap(this, Grass.list)) {
            this.bodySprite.setAlpha(0.25);
            this.bodySprite.setTint(0x444444);
            if (this.body.velocity.length()) {
                if (time % Math.floor(1000 / delta) < 15) this.createParticleEffect();
                this.onGrass(delta);
            }
        } else if (this.bodySprite.alpha !== 1) {
            this.bodySprite.setAlpha(1);
            this.bodySprite.setTint(0xffffff);
        }

        // Determine the animation to play based on movement
        if (velocityX < 0) {
            this.headSprite.anims.play(this.avatar + "_left", true);
            this.bodySprite.anims.play(this.avatar + "_left", true);
        } else if (velocityX > 0) {
            this.headSprite.anims.play(this.avatar + "_right", true);
            this.bodySprite.anims.play(this.avatar + "_right", true);
        } else if (velocityY < 0) {
            this.headSprite.anims.play(this.avatar + "_up", true);
            this.bodySprite.anims.play(this.avatar + "_up", true);
        } else if (velocityY > 0) {
            this.headSprite.anims.play(this.avatar + "_down", true);
            this.bodySprite.anims.play(this.avatar + "_down", true);
        } else if (this.bodySprite.anims.isPlaying) {
            // If there is no movement, stops animation at an odd frame (when player's hands are normal)
            const currentFrame = this.bodySprite.anims.currentFrame as Animations.AnimationFrame;
            if (currentFrame.index % 2 === 1) {
                this.headSprite.anims.stop();
                this.bodySprite.anims.stop();
            }
        }

        /* Update depth */
        this.setDepth(this.y + 6);
        this.bodySprite.setDepth(this.y + 6);
    }

    tweenToPosition(targetX: number, targetY: number, duration: number = Player.POSITION_UPDATE_INTERVAL) {
        this.scene.tweens.add({
            targets: this,
            x: targetX,
            y: targetY,
            duration,
            ease: Phaser.Math.Easing.Linear
        });
    }

    getVelocity(delta: number): Vector2 {
        const velocity = {
            x: (this.x - this.prevX) / delta,
            y: (this.y - this.prevY) / delta
        };
        this.prevX = this.x;
        this.prevY = this.y;
        return velocity;
    }

    onGrass(delta: number) {}

    createParticleEffect() {
        const offsetX = 8 * (this.body?.velocity.x ?? 0) / Player.speed;
        const offsetY = 8 * (this.body?.velocity.y ?? 0) / Player.speed;
        const emitter = this.scene.add.particles(0, 0, "yellow_leaf", {
            x: [this.x - 8 + offsetX, this.x + offsetX, this.bodySprite.x + 8 + offsetX],
            y: [this.bodySprite.y + 16 + offsetY, this.bodySprite.y + 20 + offsetY, this.bodySprite.y + 24 + offsetY],
            speedY: [-50, -58, -64],  // Particles go up initially
            gravityY: 100,                     // Gravity pulls particles down
            lifespan: 1000,// Particle lifespan
            quantity: 2,
            scale: [0.7, 0.85, 1],
            angle: { min: -10, max: 10 },      // Slight angle for a natural effect
            speedX: [-22, -11, 11, 22],  // Random x velocity
            tint: [0xFFFFFF, 0xD4B494, 0xF0E5D2],
            rotate: { start: 0, end: 45 },
            frame: [0, 1, 2, 3]
        });
        this.scene.time.delayedCall(0, () => {
            emitter.stop();
        });
        this.scene.time.delayedCall(1000, () => {
            emitter.destroy();
        });
        emitter.setDepth(2000);
    }

    destroy(fromScene?: boolean): void {
        super.destroy(fromScene);
        this.bodySprite.destroy();
        this.nameTag.destroy();
        this.nameTagBackground.destroy();
    }
}


export const Players: Map<string, Player> = new Map();

// class PlayerTag extends GameObjects.Text {
//     static style = { font: '18px Power Clear', fill: '#ebebeb', backgroundColor: '#333', shadow: { offsetX: 30, offsetY: 30, color: "#666", fill: true } };
//     static yOffset = 10;

//     constructor(scene, player) {
//         super(scene, player.getCenter().x, player.body.y - PlayerTag.yOffset, player.name, PlayerTag.style);
//         this.setOrigin(0.5);
//         this.setShadow(2, 2, '#707070', 0, true, true);

//         // handle label
//         scene.events.on('postupdate', () => {
//             this.setPosition(player.getCenter().x, player.body.y - PlayerTag.yOffset);
//         });

//         scene.add.existing(this);
//     }
// }
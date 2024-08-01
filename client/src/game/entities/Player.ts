import { Scene, Physics, GameObjects, Input, Types, Animations } from 'phaser';
import MainScene from '../scenes/MainScene';
import Grass from '../tiles/Grass';

export default class Player extends GameObjects.Container {
    static readonly avatars = ["red", "blue", "green", "may", "greenMay", "brendan", "oak"]; // "bug_catcher", "cloudz", "flynger"
    static readonly speed = 180;
    static readonly NAME_TAG = {
        OFFSET: 41,
        PADDING_X: 16
    } as const;

    scene: MainScene;
    headSprite: GameObjects.Sprite;
    bodySprite: GameObjects.Sprite;
    nameTagBackground: GameObjects.Graphics;
    nameTag: GameObjects.Text;
    cursors: Types.Input.Keyboard.CursorKeys;
    wasd: any;
    avatar: string;

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

    constructor(scene: MainScene, x: number, y: number, avatar: string, name: string) {
        super(scene, x, y);
        this.scene = scene;
        this.avatar = avatar;

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
        const body = this.body as Physics.Arcade.Body;
        body.onOverlap = true;
        body.setSize(26, 12);
        body.setOffset(-13, 10);
        // scene.physics.add.overlap(this, Grass.list);
        // scene.physics.world.on('overlap', (gameObject1: GameObjects.Sprite, gameObject2: GameObjects.Sprite) => {
        //     this.bodySprite.setAlpha(0.3);
        // });
        // this.scene.add.existing(this.bodySprite);

        // this.bodySprite.alpha = 0;

        // this.sprite = scene.add.sprite(0, 0, avatar);
        // this.add(this.sprite);
        // this.sprite.setOrigin(0.5, 2 / 3);

        // Cover half of the sprite to hide in grass=

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

        // define inputs
        const keyboard = scene.input.keyboard as Input.Keyboard.KeyboardPlugin;
        this.cursors = keyboard.createCursorKeys();
        this.wasd = keyboard.addKeys('W,S,A,D');
    }

    update(time: number, delta: number) {
        let velocityX = (this.cursors.left.isDown || this.wasd.A.isDown ? -Player.speed : 0) +
            (this.cursors.right.isDown || this.wasd.D.isDown ? Player.speed : 0);
        let velocityY = (this.cursors.up.isDown || this.wasd.W.isDown ? -Player.speed : 0) +
            (this.cursors.down.isDown || this.wasd.S.isDown ? Player.speed : 0);

        // Normalize diagonal movement
        if (velocityX !== 0 && velocityY !== 0) {
            velocityX *= Math.SQRT1_2;
            velocityY *= Math.SQRT1_2;
        }

        if (this.body instanceof Phaser.Physics.Arcade.Body) {
            this.body.setVelocity(velocityX, velocityY);
            if (this.scene.physics.world.overlap(this, Grass.list)) {
                this.bodySprite.setAlpha(0.3);
                if (this.body.velocity.length() && time % Math.floor(1000 / delta) < 15) {
                    this.createParticleEffect();
                }
            } else this.bodySprite.setAlpha(1);
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

    createParticleEffect() {
        const offsetX = 8 * (this.body?.velocity.x ?? 0) / Player.speed;
        const offsetY = 8 * (this.body?.velocity.y ?? 0) / Player.speed;
        const emitter = this.scene.add.particles(0, 0, "yellow_leaf", {
            x: [this.x - 8 + offsetX, this.x + offsetX, this.bodySprite.x + 8 + offsetX],
            y: [this.bodySprite.y + 16 + offsetY, this.bodySprite.y + 20 + offsetY, this.bodySprite.y + 24 + offsetY],
            speedY: [-50, -58, -64],  // Particles go up initially
            gravityY: 100,                     // Gravity pulls particles down
            lifespan: 1600,// Particle lifespan
            quantity: 2,
            scale: [0.7, 0.85, 1],
            angle: { min: -10, max: 10 },      // Slight angle for a natural effect
            speedX: [-22, -11, 11, 22],  // Random x velocity
            tint: [0xFFFFFF, 0xD4B494, 0xF0E5D2],
            rotate: { start: 0, end: 45 },
            frame: [0, 1, 2, 3]
        });
        this.scene.time.delayedCall(1, () => {
            emitter.stop();
        });
        this.scene.time.delayedCall(1001, () => {
            emitter.destroy();
        });
        emitter.setDepth(2000);
    }
}

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
import { Scene, Physics, GameObjects, Input, Types, Animations } from 'phaser';

export default class Player extends GameObjects.Container {
    static readonly speed = 180;

    scene: Scene;
    sprite: GameObjects.Sprite;
    nameTagBackground: GameObjects.Graphics;
    nameTag: GameObjects.Text;
    cursors: Types.Input.Keyboard.CursorKeys;
    wasd: any;

    // create anims
    static createAnimations(scene: Scene) {
        scene.anims.create({
            key: 'down',
            frames: scene.anims.generateFrameNumbers('red', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: 'left',
            frames: scene.anims.generateFrameNumbers('red', { start: 4, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: 'right',
            frames: scene.anims.generateFrameNumbers('red', { start: 8, end: 11 }),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: 'up',
            frames: scene.anims.generateFrameNumbers('red', { start: 12, end: 15 }),
            frameRate: 10,
            repeat: -1
        });
    }

    constructor(scene: Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, name: string) {
        super(scene, x, y);

        this.scene = scene;

        // Create sprite
        this.sprite = scene.add.sprite(0, 0, texture);
        this.add(this.sprite);

        // Create background rectangle for the name tag
        this.nameTagBackground = scene.add.graphics();
        this.nameTagBackground.fillStyle(0x444444, 0.8); // Gray color with 50% opacity
        this.nameTagBackground.fillRoundedRect(-30, -30, 60, 20, 6); // x, y, width, height, radius
        this.nameTagBackground.setDepth(10);

        // Create name tag text
        this.nameTag = scene.add.text(0, -30, name, {
            font: '16px Power Clear',
            color: '#ffffff',
            padding: { left: 2, right: 2, top: 1, bottom: 1 }
        });
        this.nameTag.setOrigin(0.5, 1);
        this.nameTag.setDepth(10);

        // Enable container physics
        scene.physics.world.enable(this);
        const body = this.body as Physics.Arcade.Body;
        body.setSize(26, 24);
        body.setOffset(-13, 0);
        body.setCollideWorldBounds();

        // Add name tag and background to the scene (not inside the container)
        scene.add.existing(this);
        scene.add.existing(this.nameTagBackground);
        scene.add.existing(this.nameTag);

        // handle label postupdate
        scene.events.on('postupdate', () => {
            // Update the position of the name tag and background to follow the player
            this.nameTag.setPosition(this.x, this.y - 20);
            this.nameTagBackground.setPosition(this.x, this.y - 8);
        });

        // define inputs
        const keyboard = scene.input.keyboard as Input.Keyboard.KeyboardPlugin;
        this.cursors = keyboard.createCursorKeys();
        this.wasd = keyboard.addKeys('W,S,A,D');
    }

    update() {
        let velocityX = (this.cursors.left.isDown || this.wasd.A.isDown ? -Player.speed : 0) +
            (this.cursors.right.isDown || this.wasd.D.isDown ? Player.speed : 0);
        let velocityY = (this.cursors.up.isDown || this.wasd.W.isDown ? -Player.speed : 0) +
            (this.cursors.down.isDown || this.wasd.S.isDown ? Player.speed : 0);

        // Normalize diagonal movement
        if (velocityX !== 0 && velocityY !== 0) {
            velocityX *= Math.SQRT1_2;
            velocityY *= Math.SQRT1_2;
        }

        if (this.body instanceof Phaser.Physics.Arcade.Body)
            this.body.setVelocity(velocityX, velocityY);

        // Determine the animation to play based on movement
        if (velocityX < 0) {
            this.sprite.anims.play("left", true);
        } else if (velocityX > 0) {
            this.sprite.anims.play("right", true);
        } else if (velocityY < 0) {
            this.sprite.anims.play("up", true);
        } else if (velocityY > 0) {
            this.sprite.anims.play("down", true);
        } else if (this.sprite.anims.isPlaying) {
            // If there is no movement, stops animation at an odd frame (when player's hands are normal)
            const currentFrame = this.sprite.anims.currentFrame as Animations.AnimationFrame;
            if (currentFrame.index % 2 === 1) {
                this.sprite.anims.stop();
            }
        }

        // Update depth based on y position
        this.setDepth(this.y);
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
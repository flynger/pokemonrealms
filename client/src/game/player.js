import Phaser from 'phaser';

export default class Player extends Phaser.GameObjects.Container {
    // create anims
    static createAnimations(scene) {
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

    constructor(scene, x, y, texture, frame, name) {
        super(scene, x, y);

        this.scene = scene;
        this.sprite = this.scene.add.sprite(0, 0, texture, frame);

        // Create background rectangle for the name tag
        this.nameTagBackground = this.scene.add.graphics();
        this.nameTagBackground.fillStyle(0x444444, 0.8); // Gray color with 50% opacity
        this.nameTagBackground.fillRoundedRect(-30, -30, 60, 20, 6); // x, y, width, height, radius
        this.nameTagBackground.setDepth(10);

        // Create name tag text
        this.nameTag = this.scene.add.text(0, -30, name, {
            font: '16px Power Clear',
            color: '#ffffff',
            padding: { left: 2, right: 2, top: 1, bottom: 1 }
        });
        this.nameTag.setOrigin(0.5, 1);
        this.nameTag.setDepth(10);

        this.add(this.sprite);

        this.scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.wasd = this.scene.input.keyboard.addKeys('W,S,A,D');

        // Add name tag and background to the scene (not inside the container)
        this.scene.add.existing(this.nameTagBackground);
        this.scene.add.existing(this.nameTag);

        // handle label
        scene.events.on('postupdate', () => {
            // Update the position of the name tag and background to follow the player
            this.nameTag.setPosition(this.x, this.y - 20);
            this.nameTagBackground.setPosition(this.x, this.y - 8);
        });
    }

    update() {
        const speed = 140;
        let velocityX = (this.cursors.left.isDown || this.wasd.A.isDown ? -speed : 0) +
            (this.cursors.right.isDown || this.wasd.D.isDown ? speed : 0);
        let velocityY = (this.cursors.up.isDown || this.wasd.W.isDown ? -speed : 0) +
            (this.cursors.down.isDown || this.wasd.S.isDown ? speed : 0);

        // Normalize diagonal movement
        if (velocityX !== 0 && velocityY !== 0) {
            velocityX *= Math.SQRT1_2;
            velocityY *= Math.SQRT1_2;
        }

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
        }

        // If there is no movement, stops animation at an odd frame (when player's hands are normal)
        if (this.sprite.anims.isPlaying && velocityX === 0 && velocityY === 0) {
            const currentFrameIndex = this.sprite.anims.currentFrame.index;
            if (currentFrameIndex % 2 === 1) {
                this.sprite.anims.stop();
            }
        }

        // Update depth based on y position
        this.setDepth(this.y);
    }
}

// class PlayerTag extends Phaser.GameObjects.Text {
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
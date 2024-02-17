import Phaser from 'phaser';

let player;
const DRAG_AMOUNT = 1600;
const ACCELERATION_AMOUNT = DRAG_AMOUNT + 500;
const MAX_VELOCITY = 225;
export default class ExampleScene extends Phaser.Scene {
    preload() {
        this.load.image("logo", "sprites/beta_testing.PNG");
        this.load.spritesheet('red',
            'sprites/characters/red_walk.png',
            { frameWidth: 32, frameHeight: 48, spacing: 2 }
        );
    }

    create() {
        player = this.physics.add.sprite(100, 450, 'red');

        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('red', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('red', { start: 4, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('red', { start: 8, end: 11 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('red', { start: 12, end: 15 }),
            frameRate: 10,
            repeat: -1
        });

        // handle label
        this.events.on('postupdate', () => {
            this.label.setPosition(player.x, player.y - 30);
        });

        // This will trigger the scene as now being ready.
        this.events.emit("READY", true);
    }

    update() {
        const cursors = this.input.keyboard.createCursorKeys();
        const horizDown = cursors.left.isDown || cursors.right.isDown;
        const vertDown = cursors.up.isDown || cursors.down.isDown;
        const normAcceleration = vertDown && horizDown ? ACCELERATION_AMOUNT / 2 ** 0.5 : ACCELERATION_AMOUNT;

        // handle horizontal
        // const noSigHorizMovement = Math.abs(player.body.velocity.x) < 100;
        if (cursors.left.isDown) {
            player.setAccelerationX(-normAcceleration);
            player.play('left', true);
        } else if (cursors.right.isDown) {
            player.setAccelerationX(normAcceleration);
            player.play('right', true);
        } else {
            player.setAccelerationX(0);
        }

        // handle vertical
        if (cursors.up.isDown) {
            player.setAccelerationY(-normAcceleration);
            if (!horizDown) player.anims.play('up', true);
        } else if (cursors.down.isDown) {
            player.setAccelerationY(normAcceleration);
            if (!horizDown) player.anims.play('down', true);
        } else {
            player.setAccelerationY(0);
        }

        let velocityMagnitude = player.body.velocity.length();
        if (velocityMagnitude > MAX_VELOCITY) {
            player.body.velocity.setLength(MAX_VELOCITY);
            velocityMagnitude = MAX_VELOCITY;
        } else if (velocityMagnitude === 0 && player.anims.isPlaying) {
            if (player.anims.currentFrame.textureFrame % 2 === 1)
                player.stopOnFrame(player.anims.currentFrame.nextFrame.textureFrame);
            else player.stop();
        }
        player.anims.timeScale = 0.2 + 0.8 * velocityMagnitude / MAX_VELOCITY;
    }
}

// function shiftFirstToEnd(arr) {
//     arr.push(arr.shift());
// }
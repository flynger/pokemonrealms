import Phaser from 'phaser';

let player;
const DRAG_AMOUNT = 1000;
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
        // You made this!
        const text = this.add.text(250, 250, "Phaser")
        text.setInteractive({ useHandCursor: true })
        // this.add.image(400, 300, "logo")
        /** @tutorial I made this! */
        // Get all that lovely dataState into your scene,
        let { clickCount } = this.registry.getAll()
        text.on("pointerup", () => {
            // This will trigger the "changedata" event handled by the component.
            this.registry.merge({ clickCount: clickCount++ })
        })

        player = this.physics.add.sprite(100, 450, 'red');
        player.setDrag(DRAG_AMOUNT);
        player.setCollideWorldBounds(true);
        player.anims.play('down', true);

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

        // This will trigger the scene as now being ready.
        this.game.events.emit("READY", true);
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
        } else if (velocityMagnitude == 0) {
            console.log(player.anims.getFrameName());
        }
        player.anims.timeScale = velocityMagnitude / MAX_VELOCITY;
    }
}
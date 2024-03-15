import Phaser from 'phaser';

export default class Player extends Phaser.GameObjects.Sprite {
    static walkSpeed = 1;
    static runSpeed = 1.5;
    static DRAG_AMOUNT = 1600;
    static ACCELERATION_AMOUNT = Player.DRAG_AMOUNT + 500;
    static MAX_VELOCITY = 225;

    constructor(scene, x = 100, y = 450, name = "Unnamed") {
        super(scene, x, y, 'red');
        scene.add.existing(this);
        this.setInteractive();
        // this.setDrag(Player.DRAG_AMOUNT);
        // this.setCollideWorldBounds(true);
        // this.tag = new PlayerTag(this);


    }

    create() {
        // this.tag.create();
    }

    update() {
        if (this.body) {
            const cursors = this.scene.input.keyboard.createCursorKeys();
            const horizDown = cursors.left.isDown || cursors.right.isDown;
            const vertDown = cursors.up.isDown || cursors.down.isDown;
            const normAcceleration = vertDown && horizDown ? Player.ACCELERATION_AMOUNT / 2 ** 0.5 : Player.ACCELERATION_AMOUNT;

            // handle horizontal
            // const noSigHorizMovement = Math.abs(player.body.velocity.x) < 100;
            if (cursors.left.isDown) {
                this.setAccelerationX(-normAcceleration);
                this.play('left', true);
            } else if (cursors.right.isDown) {
                this.setAccelerationX(normAcceleration);
                this.play('right', true);
            } else {
                this.setAccelerationX(0);
            }

            // handle vertical
            if (cursors.up.isDown) {
                this.setAccelerationY(-normAcceleration);
                if (!horizDown) this.anims.play('up', true);
            } else if (cursors.down.isDown) {
                this.setAccelerationY(normAcceleration);
                if (!horizDown) this.anims.play('down', true);
            } else {
                this.setAccelerationY(0);
            }

            let velocityMagnitude = this.body.velocity.length();
            if (velocityMagnitude > Player.MAX_VELOCITY) {
                this.body.velocity.setLength(Player.MAX_VELOCITY);
                velocityMagnitude = Player.MAX_VELOCITY;
            } else if (velocityMagnitude === 0 && this.anims.isPlaying) {
                if (this.anims.currentFrame.textureFrame % 2 === 1)
                    this.stopOnFrame(this.anims.currentFrame.nextFrame.textureFrame);
                else this.stop();
            }
            this.anims.timeScale = 0.2 + 0.8 * velocityMagnitude / Player.MAX_VELOCITY;
        }
    }
}

class PlayerTag extends Phaser.GameObjects.Text {
    static style = { font: '20px Futura', fill: '#000000' };

    constructor(scene, player) {
        super(scene, player.x, player.y - 30);
        this.setOrigin(0.5);

        // handle label
        this.scene.events.on('postupdate', () => {
            this.label.setPosition(player.x, player.y - 30);
        });

        scene.add.existing(this);
    }
}
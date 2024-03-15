import Phaser from 'phaser';
import Player from './player';

let player;

export default class ExampleScene extends Phaser.Scene {
    preload() {
        this.load.image("logo", "sprites/beta_testing.PNG");
        this.load.spritesheet('red',
            'sprites/characters/red_walk.png',
            { frameWidth: 32, frameHeight: 48, spacing: 2 }
        );
    }

    create() {
        player = new Player(this);

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

        player.create();

        // This will trigger the scene as now being ready.
        this.events.emit("READY", true);
    }

    update() {
        player.update();
    }
}

// function shiftFirstToEnd(arr) {
//     arr.push(arr.shift());
// }
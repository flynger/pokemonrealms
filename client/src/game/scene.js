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
        Player.createAnimations(this);

        // create player
        player = new Player(this);
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
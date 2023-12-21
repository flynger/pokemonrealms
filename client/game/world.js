import Phaser from 'phaser';

var player, platforms, cursors, stars, bombs;
var score = 0;
var scoreText;

export default class World extends Phaser.Scene {
    constructor() {
		super('world');
	}

    preload() {
        // this.load.setBaseURL('https://labs.phaser.io');

        // this.load.image('sky', 'assets/skies/sky4.png');
        // this.load.image('ground', 'assets/sprites/platform.png');
        // this.load.image('star', 'assets/sprites/star.png');
        // this.load.image('bomb', 'assets/sprites/bomb1.png');
        this.load.spritesheet('red', 'res/characters/red_walk_test.png',
            { frameWidth: 32, frameHeight: 48 }
        );
    }

    create() {

    }

    update() {

    }
}
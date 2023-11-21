import Phaser from 'phaser';

var platforms;
class Example extends Phaser.Scene {
    preload() {
        this.load.setBaseURL('https://labs.phaser.io');

        this.load.image('sky', 'assets/skies/sky3.png');
        this.load.image('ground', 'assets/sprites/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude',
            'assets/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
    }

    create() {
        this.add.image(400, 300, 'sky');

        platforms = this.physics.add.staticGroup();

        platforms.create(400, 568, 'ground').setScale(2, 1).refreshBody();;

        platforms.create(600, 400, 'ground').setScale(0.8, 0.5).refreshBody();
        platforms.create(50, 250, 'ground').setScale(0.8, 0.5).refreshBody();
        platforms.create(750, 220, 'ground').setScale(0.8, 0.5).refreshBody();
    }
}

const config = {
    type: Phaser.AUTO,
    title:'pokemon-realms',
    parent:'game',
    width: 800,
    height: 600,
    scene: Example,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    }
};

const game = new Phaser.Game(config);
export default game;
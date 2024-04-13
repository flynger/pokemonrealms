import Phaser from 'phaser';
import Player from './player';

let player;
const tilesets = ["gen4hgss_1", "gen4hgss_2", "kyledove", "wilsonscarloxy_indoor", "wilsonscarloxy_outdoor"];

export default class ExampleScene extends Phaser.Scene {
    preload() {
        this.load.image("logo", "sprites/beta_testing.PNG");
        this.load.spritesheet('red',
            'sprites/characters/red_walk.png',
            { frameWidth: 32, frameHeight: 48, spacing: 2 }
        );

        // load the PNG file
        for (const tileset of tilesets) {
            this.load.image(tileset, 'tilesets/' + tileset + '.png');
        }

        // load the JSON file
        this.load.tilemapTiledJSON('tilemap', 'maps/Ballet Town Town.json')
    }

    create() {
        // create the Tilemap
        const map = this.make.tilemap({ key: 'tilemap' });

        // add the tileset image we are using
        const tiles = tilesets.map(tileset => map.addTilesetImage(tileset, tileset));

        const layers = [];
        for (let i = 0; i < 7; i++) {
            layers.push(map.createLayer(i, tiles));
        }

        // this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        Player.createAnimations(this);

        // create player
        player = new Player(this);
        player.create();

        this.cameras.main.startFollow(player, true);

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
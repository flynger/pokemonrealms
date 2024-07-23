import Player from "./Player";
import Phaser from "phaser";

const tilesets = ["gen4hgss_1", "gen4hgss_2", "kyledove", "wilsonscarloxy_indoor", "wilsonscarloxy_outdoor"];

export default class MainScene extends Phaser.Scene {
    player!: Player;

    constructor() {
        super({ key: 'MainScene' });
    }

    preload() {
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

        for (let i in map.layers) {
            // map.crea
        }

        Player.createAnimations(this);

        this.player = new Player(this, 100, 100, 'red', 'flynger');
        // this.physics.add.collider(this.player);

        this.cameras.main.startFollow(this.player, true);

        // This will trigger the scene as now being ready.
        this.events.emit("READY", true);
    }

    update() {
        this.player.update();
    }
}
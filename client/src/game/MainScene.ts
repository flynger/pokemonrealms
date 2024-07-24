import Player from "./Player";
import { Scene, Tilemaps } from "phaser";

const tilesets = ["kyledove", "farm_exterior"];

export default class MainScene extends Scene {
    private player!: Player;

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
            this.load.image(tileset, 'tilesets/' + tileset + '_extruded.png');
        }

        // load the JSON file
        this.load.tilemapTiledJSON('tilemap', 'maps/Ranch/Ranch.json')
    }

    create() {
        // create the Tilemap
        const map = this.make.tilemap({ key: 'tilemap' });

        // Add the tileset image(s) to the map
        for (const tileset of tilesets) {
            map.addTilesetImage(tileset, tileset, 32, 32, 1, 2);
        }

        // const sprites = map.createFromTiles([652, 653, 654], -1);

        //  Bounce the sprites just to show they're no longer tiles:
        // this.tweens.add({
        //     targets: sprites,
        //     y: '-=32',
        //     duration: 1000,
        //     ease: 'Sine.easeInOut',
        //     yoyo: true,
        //     repeat: -1
        // });

        Player.createAnimations(this);

        this.player = new Player(this, 250, 400, 'red', 'flynger');

        for (const i in map.layers) {
            const layer = map.createLayer('Tile Layer ' + (+i + 1), tilesets) as Tilemaps.TilemapLayer;
            layer.setCollisionByProperty({ isCollideable: true });
            this.physics.add.collider(this.player, layer);
        }

        this.cameras.main.startFollow(this.player, false, 0.05, 0.05);

        this.physics.world.setFPS(165);

        // This will trigger the scene as now being ready.
        this.events.emit("READY", true);
    }

    update(time: number, delta: number): void {
        // Update player
        this.player.update();
    }
}
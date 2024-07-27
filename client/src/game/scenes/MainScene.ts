import Player from "../entities/Player";
import { Physics, Scene, Tilemaps } from "phaser";
import { EventBus } from "../EventBus";

const tilesets = ["kyledove", "farm_exterior"];

export default class MainScene extends Scene {
    private player: Player;

    constructor() {
        super('MainScene');
    }

    preload() {
        // this.load.setPath('assets');

        // load the player spritesheet(s)
        this.load.spritesheet('red',
            'sprites/characters/red_walk.png',
            { frameWidth: 32, frameHeight: 48, spacing: 2 }
        );

        // load the PNG file
        for (const tileset of tilesets) {
            this.load.spritesheet(tileset, 'tilesets/' + tileset + '_extruded.png', { frameWidth: 32, margin: 1, spacing: 2 });
        }

        // load the JSON file
        this.load.tilemapTiledJSON('tilemap', 'maps/Ranch/Ranch.json')
    }

    create() {
        // create the Tilemap
        const map = this.add.tilemap('tilemap');
        const depthSortedTiles: Record<string, Record<number, any>> = {};
        const depthSortArray = [];

        // Add the tileset image(s) to the map
        for (const tilesetName of tilesets) {
            depthSortedTiles[tilesetName] = {};

            const tileset = map.addTilesetImage(tilesetName, tilesetName, 32, 32, 0, 2) as Tilemaps.Tileset;
            const tileProperties: Record<string, any> = tileset.tileProperties;
            for (const tile in tileProperties) {
                const tileData = tileProperties[tile];
                if ("depthOffset" in tileData) {
                    depthSortedTiles[tilesetName][+tile] = tileData;
                    depthSortArray.push(+tile + tileset.firstgid);
                }
            }
        }

        Player.createAnimations(this);

        this.player = new Player(this, 250, 400, 'red', 'Eichardo');

        for (const i in map.layers) {
            const layer = map.createLayer('Tile Layer ' + (+i + 1), tilesets) as Tilemaps.TilemapLayer;
            layer.setCollisionByProperty({ isCollideable: true });
            this.physics.add.collider(this.player, layer);
            for (const sprite of map.createFromTiles(depthSortArray, -1, { useSpriteSheet: true } as any) ?? []) {
                const tileData = depthSortedTiles[sprite.texture.key][+sprite.frame.name];
                sprite.setDepth(sprite.y + tileData.depthOffset * 32);
                if (tileData.isCollideable) {
                    this.physics.world.enable(sprite, Physics.Arcade.STATIC_BODY);
                    this.physics.add.collider(this.player, sprite);
                }
            }
        }

        //  Bounce the sprites just to show they're no longer tiles:
        // this.tweens.add({
        //     targets: this.player,
        //     y: '-=32',
        //     duration: 1000,
        //     ease: 'Sine.easeInOut',
        //     yoyo: true,
        //     repeat: -1
        // });

        // follow player around with slight lerping
        this.cameras.main.startFollow(this.player, false, 0.05, 0.05);

        // fix player jitter
        this.physics.world.setFPS(165);

        // This will trigger the scene as now being ready.
        EventBus.emit('current-scene-ready', this);
    }

    update() {
        // Update player
        this.player.update();
    }
}
import Player from "../entities/Player";
import { Physics, Scene, Tilemaps } from "phaser";
import { EventBus } from "../EventBus";
import Tileset from "../maps/Tileset";
import Grass from "../tiles/Grass";

const tilesets = ["kyledove", "farm_exterior"];

export default class MainScene extends Scene {
    private player: Player;

    constructor() {
        super('MainScene');
    }

    preload() {
        // this.load.setPath('assets');

        // load the player spritesheet(s)
        for (const avatar of Player.avatars) {
            this.load.spritesheet(avatar,
                `characters/${avatar}_walk.png`,
                { frameWidth: 32, frameHeight: 48, spacing: 2 }
            );
        }

        // initialize tilesets
        Tileset.initializeAll(this);

        // load the JSON file
        this.load.tilemapTiledJSON('tilemap', 'maps/Ranch2.json')
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

        this.player = new Player(this, 100, 100, Player.avatars[Phaser.Math.Between(0, Player.avatars.length - 1)], 'Eichardo');

        for (const i in map.layers) {
            const layer = map.createLayer(+i, tilesets) as Tilemaps.TilemapLayer;
            layer.setCollisionByProperty({ isCollideable: true });
            this.physics.add.collider(this.player, layer);
            // for (const sprite of map.createFromTiles(depthSortArray, -1, { useSpriteSheet: true } as any) ?? []) {
            //     const tileData = depthSortedTiles[sprite.texture.key][+sprite.frame.name];
            //     sprite.setDepth(sprite.y + tileData.depthOffset * 32);
            //     if (tileData.isCollideable) {
            //         this.physics.world.enable(sprite, Physics.Arcade.STATIC_BODY);
            //         this.physics.add.collider(this.player, sprite);
            //     }
            // }
        }

        const grassPatch = [
            [333, 334, 335],
            [341, 342, 343],
            [341, 342, 343],
            [341, 342, 343],
            [349, 350, 351]
        ];
        for (const i in grassPatch) {
            const row = grassPatch[i];
            for (const j in row) {
                const tile = row[j];
                new Grass(this, 96 + 32 * +j, 150 + 32 * +i, "kyledove", tile);
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
        this.cameras.main.setZoom(1.4);

        // This will trigger the scene as now being ready.
        EventBus.emit('current-scene-ready', this);
    }

    update() {
        // Update player
        this.player.update();
    }
}
import Player from "../entities/Player";
import { GameObjects, Physics, Scene, Tilemaps } from "phaser";
import { EventBus } from "../EventBus";
import Tileset from "../maps/Tileset";
import Grass from "../tiles/Grass";
import Tilemap from "../maps/Tilemap";
import LocalPlayer from "../entities/LocalPlayer";

const tilesets = ["kyledove", "farm_exterior"];

export default class MainScene extends Scene {
    private player: LocalPlayer;
    map: Tilemap;

    constructor() {
        super('MainScene');
    }

    preload() {
        // this.load.setPath('assets');

        // load the player spritesheet(s)
        for (const avatar of Player.avatars) {
            this.load.spritesheet(avatar,
                `assets/characters/${avatar}_walk.png`,
                { frameWidth: 32, frameHeight: 48, spacing: 2 }
            );
        }

        // initialize tilesets & grass
        Tileset.initializeAll(this);

        // load the JSON file
        this.map = new Tilemap(this, "Ranch", "Ranch");
        this.load.spritesheet("yellow_leaf",
            "assets/particles/yellow_leaf_extruded.png",
            { frameWidth: 8, frameHeight: 8, spacing: 2, margin: 1 }
        );
    }

    create() {
        // Load map & grass
        Grass.initialize();
        this.map.load();

        Player.createAnimations(this);
        this.player = new LocalPlayer(
            this, 500, 200, Player.avatars[Phaser.Math.Between(0, Player.avatars.length - 1)], 'Barry0524'
        );

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
        this.cameras.main.startFollow(this.player, false);
        this.cameras.main.setLerp(5 / 100, 5 / 100)
        this.cameras.main.setZoom(1.4);

        // This will trigger the scene as now being ready.
        EventBus.emit('current-scene-ready', this);
    }

    update(time: number, delta: number) {
        // Update player
        // this.cameras.main.setLerp(delta / 100, delta / 100)
        this.player.update(time, delta);
    }
}
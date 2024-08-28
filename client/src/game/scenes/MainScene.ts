import Player, { Players } from "../entities/Player";
import { GameObjects, Physics, Scene, Tilemaps } from "phaser";
import { EventBus } from "../EventBus";
import Tileset from "../maps/Tileset";
import Grass from "../tiles/Grass";
import Tilemap from "../maps/Tilemap";
import LocalPlayer from "../entities/LocalPlayer";
import { InitialMapData, PlayerMovementData } from "@/shared/maps/types";

// const tilesets = ["kyledove", "farm_exterior"];

export default class MainScene extends Scene {
    private player: LocalPlayer;
    map: Tilemap;

    constructor() {
        super('MainScene');
    }

    preload() {
        console.log("MainScene preload")
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
        const mapData: InitialMapData = this.registry.get("mapData");
        this.map = new Tilemap(this, mapData.player.location);
        this.load.spritesheet("yellow_leaf",
            "assets/particles/yellow_leaf_extruded.png",
            { frameWidth: 8, frameHeight: 8, spacing: 2, margin: 1 }
        );
    }

    create() {
        console.log("MainScene create")
        // Load map & grass
        Grass.initialize();
        this.map.load();

        Player.createAnimations(this);
        const mapData: InitialMapData = this.registry.get("mapData");
        const { position, name, avatar } = mapData.player;
        this.player = new LocalPlayer(
            this, position.x, position.y, avatar, name
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
        this.registry.remove("mapData");
        EventBus.emit('current-scene-ready', this);
    }

    update(time: number, delta: number) {
        // Update player
        // this.cameras.main.setLerp(delta / 100, delta / 100)
        for (const player of Players.values()) {
            player.update(time, delta);
        }
    }

    movePlayer({ name, avatar, position }: PlayerMovementData) {
        if (name === this.player.name) return;
        
        if (!Players.has(name)) {
            new Player(
                this, position.x, position.y, avatar, name
            );
        } else {
            const player = Players.get(name);
            player?.tweenToPosition(position.x, position.y);
        }
    }

    removePlayer(name: string) {
        const player = Players.get(name);
        player?.destroy();
        Players.delete(name);
    }
}
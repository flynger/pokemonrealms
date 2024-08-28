import { Scene } from "phaser";
import Tile from "../tiles/Tile";
import Tileset from "./Tileset";
import Grass from "../tiles/Grass";
import { MapLocation } from "@/shared/maps/types";
import Player, { Players } from "../entities/Player";

// type Tile = Record<string, number> | null;
export default class Tilemap {
    scene: Scene;
    loc: MapLocation;
    subarea: string;
    width: number;
    height: number;
    // layers: Tile[][];

    constructor(scene: Scene, loc: MapLocation) {
        this.loc = loc;
        this.scene = scene;
        const { map, subarea } = loc;
        scene.load.json(`${map}/${subarea}.json`, `maps/${map}/${subarea}.json`);
    }

    load() {
        Players.clear();

        const mapData = this.scene.cache.json.get(`${this.loc.map}/${this.loc.subarea}.json`);
        this.width = mapData.width;
        this.height = mapData.height;
        const tileWidth = this.width / 32;
        // const tileHeight = this.height / 32;
        const layers = mapData.layers;

        for (const i in layers) {
            const layer = layers[i];
            for (const j in layer) {
                const tile = layer[j];
                if (tile !== null) {
                    const tileset = Object.keys(tile)[0];
                    const tileId = tile[tileset];
                    const x = 32 * (+j % tileWidth) + 16;
                    const y = 32 * Math.floor(+j / tileWidth) + 16;
                    
                    const tileProperties = Tileset.getTileProperties(tileset, tileId);
                    const tileType = tileProperties?.class ?? "Tile";
                    switch (tileType) {
                        case "Grass":
                            new Grass(this.scene, x, y, tileset, tileId);
                            break;
                        default:
                            new Tile(this.scene, x, y, tileset, tileId);
                    }
                }
            }
        }
    }
}
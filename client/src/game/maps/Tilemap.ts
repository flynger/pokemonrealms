import { Scene } from "phaser";
import Tile from "../tiles/Tile";
import Tileset from "./Tileset";
import Grass from "../tiles/Grass";

// type Tile = Record<string, number> | null;
export default class Tilemap {
    scene: Scene;
    area: string;
    subarea: string;
    width: number;
    height: number;
    // layers: Tile[][];

    constructor(scene: Scene, area: string, subarea: string) {
        this.area = area;
        this.subarea = subarea;
        this.scene = scene;
        scene.load.json(`${area}/${subarea}.json`, `maps/${area}/${subarea}.json`);
    }

    load() {
        const mapData = this.scene.cache.json.get(`${this.area}/${this.subarea}.json`);
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
                    console.log(tile)
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
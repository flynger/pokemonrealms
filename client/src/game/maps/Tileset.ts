import { Scene } from "phaser";

type TileProperties = {
    isCollideable?: true,
    isGrass?: true,
    depthOffset?: number
}

export default class Tileset {
    static readonly list = ["kyledove", "farm_exterior"];
    static scene: Scene;

    static initializeAll(scene: Scene) {
        Tileset.scene = scene;
        for (const tileset of Tileset.list) {
            scene.load.spritesheet(tileset, 'tilesets/' + tileset + '_extruded.png', { frameWidth: 32, margin: 1, spacing: 2 });
            scene.load.json(`${tileset}.json`, `maps/tilesets/${tileset}.json`);
        }
    }

    static getTileProperties(tileset: string, id: number): TileProperties {
        return this.scene.cache.json.get(`${tileset}.json`)[id];
    }
}
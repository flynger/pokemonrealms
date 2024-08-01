import { GameObjects, Scene } from "phaser";
import Tileset from "../maps/Tileset";

export default class Tile extends GameObjects.Sprite {
    constructor(scene: Scene, x: number, y: number, tileset: string, tile: number) {
        super(scene, x, y, tileset, tile);
        const tileProperties = Tileset.getTileProperties(tileset, tile);
        if (tileProperties && tileProperties.depthOffset !== undefined)
            this.setDepth(y + tileProperties.depthOffset);
        else this.setDepth(-Infinity);
        scene.add.existing(this);
    }
}
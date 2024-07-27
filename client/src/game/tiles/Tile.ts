import { GameObjects, Scene } from "phaser";
import Tileset from "../maps/Tileset";

export default class Tile extends GameObjects.Sprite {
    constructor(scene: Scene, x: number, y: number, tileset: string, tile: number) {
        super(scene, x, y, tileset, tile);
        const depthOffset = Tileset.getTileProperties(tileset, tile).depthOffset;
        if (depthOffset !== undefined)
            this.setDepth(y + depthOffset);
        scene.add.existing(this);
    }
}
import { Display, GameObjects, Physics, Scene } from "phaser";
import Tile from "./Tile";
import Tileset from "../maps/Tileset";

export default class Grass extends Tile {
    static list: Grass[] = [];
    // private static graphics: GameObjects.Graphics;
    // static mask: Display.Masks.GeometryMask;
    // static layer: Display.Masks.GeometryMask;

    static initialize() {
        Grass.list = [];
        // Grass.graphics = scene.make.graphics();
        // Grass.graphics.fillRect(0, 0, 32, 32);
    }

    static createMask() {
        // const mask = Grass.graphics.createGeometryMask();
        // mask.setInvertAlpha(true);
        // Grass.mask = mask;
    }

    constructor(scene: Scene, x: number, y: number, tileset: string, tile: number) {
        super(scene, x, y, tileset, tile);
        Grass.list.push(this);
        // fill shape based on mask
        // const mask = {
        //     x: 0,
        //     y: 0,
        //     width: 32,
        //     height: 32
        // };
        // const grass = {
        //     x: 0,
        //     y: 0,
        //     width: 32,
        //     height: 32
        // };
        // Grass.graphics.fillRect(x + mask.x - 16, y + mask.y - 16, mask.width, mask.height);
    }
}
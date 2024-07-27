import { Scene } from "phaser";
import Tile from "./Tile";

export default class Grass extends Tile {
    constructor(scene: Scene, x: number, y: number, tileset: string, tile: number) {
        super(scene, x, y, tileset, tile);
    }
}
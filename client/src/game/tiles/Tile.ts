import { GameObjects, Physics, Scene } from "phaser";
import Tileset from "../maps/Tileset";

export default class Tile extends GameObjects.Sprite {
    static collidingTiles: Tile[] = [];

    constructor(scene: Scene, x: number, y: number, tileset: string, tile: number) {
        super(scene, x, y, tileset, tile);
        const tileProperties = Tileset.getTileProperties(tileset, tile);

        // Create collider
        if (tileProperties && tileProperties.collider) {
            scene.physics.world.enable(this);
            const body = this.body as Physics.Arcade.Body;
            body.setSize(tileProperties.collider.width, tileProperties.collider.height);
            body.setOffset(tileProperties.collider.x, tileProperties.collider.y);

            if (tileProperties.class === "Tile") {
                body.immovable = true;
                Tile.collidingTiles.push(this);
            }
        }
        
        // Set depth
        if (tileProperties && tileProperties.depthOffset !== undefined) {
            this.setDepth(y + tileProperties.depthOffset);
        } else this.setDepth(-Infinity);

        scene.add.existing(this);
    }
}
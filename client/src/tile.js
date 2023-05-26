class tile {
    static tiles = [];
    constructor(x, y, sheet, tileX, tileY, layer, offset = 0) {
        // console.log(tilesets[sheet].textures[[tileX, tileY]])
        this.sprite = new PIXI.Sprite(tilesets[sheet].textures[sheet + [tileX, tileY]]);
        this.sprite.zIndex = layer == 0 ? -100 : y - 16;
        this.sprite.zIndex += offset;
        this.sprite.x = x;
        this.sprite.y = y;
        gameContainer.addChild(this.sprite);
        tiles.push(this);
        // this.rigidBody = Matter.Bodies.rectangle(x + 16, y + 16, 32, 32);
        // Matter.Body.setStatic(this.rigidBody, true);
    }
    step() {

    }
}
const tiles = tile.tiles;
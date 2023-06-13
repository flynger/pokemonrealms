/*
Alex Ge, Arnav Singh, Richard Wei, Will Gannon, Harry Liu

This file implements log functionality 
*/
class log {
    static logs = {};
    constructor(x, y) {
        this.leftSprite = new PIXI.Sprite(kyledoveSheet.textures['log1']);
        this.rightSprite = new PIXI.Sprite(kyledoveSheet.textures['log2']);
        this.leftSprite.zIndex = this.rightSprite.zIndex = y - 19;
        this.leftSprite.x = x;
        this.rightSprite.x = x + 32;
        this.leftSprite.y = this.rightSprite.y = y;
        gameContainer.addChild(this.leftSprite);
        gameContainer.addChild(this.rightSprite);
        colliders[[x, y]] = new collider(x, y, 64, 32);
        //colliders[[x + 32, y]] = new collider(x + 32, y, 32, 32);
    }
}
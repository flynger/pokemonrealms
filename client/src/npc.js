class npc {
    static npcs = {};
    constructor(x, y) {
        this.npcSprite = new PIXI.Sprite(kyledoveSheet.textures['log1']);
        this.npcSprite.zIndex = this.rightSprite.zIndex = y - 19;
        this.npcSprite.x = x;
        this.npcSprite.y = y;
        gameContainer.addChild(this.npcSprite);
        colliders[[x, y]] = new collider(x, y, 32, 32);
        //colliders[[x + 32, y]] = new collider(x + 32, y, 32, 32);
    }
}
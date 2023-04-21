// plz go touch grass
class grass {
    static grassSprites;
    static async initializeGrassSpritesheet() {
        let spriteName = 'wildgrass';
        let sheetData = makeHorizontalSheet('wildgrass', `res/tilesets/wildgrass.png`, 101, 16, 1, 6, 1, 1, 0, false);
        sheetData.animations = {
            "backGrass": [spriteName + "_0_0", spriteName + "_0_1"],
            "frontGrass": [spriteName + "_0_2", spriteName + "_0_3", spriteName + "_0_4", spriteName + "_0_5"]
        };
        this.grassSprites = new PIXI.Spritesheet(
            PIXI.BaseTexture.from(sheetData.meta.image),
            sheetData
        );
        await this.grassSprites.parse();
    }
    constructor(x, y) {
        this.backSprite = new PIXI.AnimatedSprite(grass.grassSprites.animations['backGrass']);
        this.frontSprite = new PIXI.AnimatedSprite(grass.grassSprites.animations['frontGrass']);
        this.backSprite.x = x;
        this.backSprite.y = y;
        this.frontSprite.x = x;
        this.frontSprite.y = y;
        app.stage.addChild(this.backSprite);
        app.stage.addChild(this.frontSprite);
    }
}
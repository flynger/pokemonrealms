// plz go touch grass
class grass {
    static grasses = [];
    static grassSprites;
    static async initializeGrassSpritesheet() {
        let spriteName = 'wildgrass';
        let sheetData = makeHorizontalSheet('wildgrass', `res/tilesets/wildgrass.png`, 202, 32, 1, 6, 1, 1, 0, false);
        sheetData.animations = {
            "backGrass": [spriteName + "_0_1", spriteName + "_0_0"],
            "frontGrass": [spriteName + "_0_2", spriteName + "_0_3", spriteName + "_0_4", spriteName + "_0_5"]
        };

        // let newSheetData = makeHorizontalSheet('gen5grass', `res/tilesets/wildgrass.png`, 202, 32, 1, 6, 1, 1, 0, false);
        // sheetData.animations = {
        //     "backGrass": [spriteName + "_0_1", spriteName + "_0_0"],
        //     "frontGrass": [spriteName + "_0_2", spriteName + "_0_3", spriteName + "_0_4", spriteName + "_0_5"]
        // };
        this.grassSprites = new PIXI.Spritesheet(
            PIXI.BaseTexture.from(sheetData.meta.image),
            sheetData
        );
        await this.grassSprites.parse();
    }
    passers = {};
    constructor(x, y) {
        this.backSprite = new PIXI.AnimatedSprite(grass.grassSprites.animations['backGrass']);
        this.backSprite.animationSpeed = 0.1;
        this.backSprite.loop = false;
        this.backSprite.currentFrame = 1;
        this.backSprite.texture = grass.grassSprites.animations['backGrass'][1];
        this.frontSprite = new PIXI.AnimatedSprite(PIXI.BaseTexture.from('gen5grass'));
        this.frontSprite.loop = false;
        this.frontSprite.animationSpeed = 0.2;
        this.frontSprite.currentFrame = 3;
        this.frontSprite.texture = grass.grassSprites.animations['frontGrass'][3];
        this.backSprite.zIndex = -5; y - 6;
        this.frontSprite.zIndex = -5; y + 3;
        this.backSprite.x = this.frontSprite.x = x;
        this.backSprite.y = this.frontSprite.y = y;
        this.animating = false;
        gameContainer.addChild(this.backSprite);
        gameContainer.addChild(this.frontSprite);
        grass.grasses.push(this);
    }
    step() {
        let playerInGrass = false;
        for (let name in this.passers) {
            let passer = player.players[name];
            if (!passer) {
                delete this.passers[name];
                continue;
            }
            playerInGrass = true;
            if (!collide(passer.getHitbox(), this.getHitbox())) {
                passer.currentlyOccupiedGrasses.splice(passer.currentlyOccupiedGrasses.indexOf(this), 1);
                if (passer.currentlyOccupiedGrasses.length == 0) {
                    player.players[name].bodySprite.alpha = 1;
                }
                delete this.passers[name];
            }
        }
        // if (playerInGrass) {
        //     this.backSprite.alpha = 0.7;
        //     this.frontSprite.alpha = 0.7;
        // } else {
        //     this.backSprite.alpha = 1;
        //     this.frontSprite.alpha = 1;
        // }
        for (let name in player.players) {
            if (!this.passers[name]) {
                let passer = player.players[name];
                if (collide(passer.getHitbox(), this.getHitbox())) {
                    this.passers[name] = true;
                    passer.currentlyOccupiedGrasses.push(this);
                    passer.bodySprite.alpha = 0.25;
                    this.backSprite.gotoAndPlay(0);
                    this.frontSprite.gotoAndPlay(0);
                }
            }
        }
    }

    getHitbox() {
        let grassBounds = this.frontSprite.getBounds();
        grassBounds.width = 16 * ratio;
        grassBounds.x += 8 * ratio;
        grassBounds.height = 12 * ratio;
        grassBounds.y += 20 * ratio;
        return grassBounds;
    }
}
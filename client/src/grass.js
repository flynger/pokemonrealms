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
        this.frontSprite = new PIXI.AnimatedSprite(grass.grassSprites.animations['frontGrass']);
        this.frontSprite.loop = false;
        this.frontSprite.animationSpeed = 0.2;
        this.frontSprite.currentFrame = 3;
        this.frontSprite.texture = grass.grassSprites.animations['frontGrass'][3];
        this.backSprite.zIndex = y - 6;
        this.frontSprite.zIndex = y + 3;
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
            if (!player.players[name]) {
                delete this.passers[name];
                continue;
            }
            playerInGrass = true;
            let playerBounds = player.players[name].sprite.getBounds();
            playerBounds.y += 40;
            playerBounds.height = 8;
            playerBounds.x += 2;
            playerBounds.width = 28;
            let grassBounds = this.frontSprite.getBounds();
            grassBounds.width = 28;
            grassBounds.x += 2;
            if (!collide(playerBounds, grassBounds)) {
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
                let playerBounds = player.players[name].sprite.getBounds();
                playerBounds.y += 40;
                playerBounds.height = 8;
                playerBounds.x += 2;
                playerBounds.width = 28;
                // let backGrassBounds = this.backSprite.getBounds();
                // if (collide(playerBounds, backGrassBounds)) {
                //     this.passers[name] = true;
                //     this.backSprite.gotoAndPlay(0);
                // }
                let grassBounds = this.frontSprite.getBounds();
                grassBounds.width = 28;
                grassBounds.x += 2;
                if (collide(playerBounds, grassBounds)) {
                    this.passers[name] = true;
                    this.backSprite.gotoAndPlay(0);
                    this.frontSprite.gotoAndPlay(0);
                    this.frontSprite.onComplete = () => {
                        //this.animating = false;
                    };
                }
            }
        }
    }
}
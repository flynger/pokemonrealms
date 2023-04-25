// plz go touch grass
class grass {
    static grasses = [];
    static grassSprites;
    static async initializeGrassSpritesheet() {
        let spriteName = 'gen5grass';
        // let sheetData = makeHorizontalSheet('gen5grass', `res/tilesets/wildgrass.png`, 202, 32, 1, 6, 1, 1, 0, false);
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
        this.sprite = new PIXI.Sprite(gen5exteriorSheet.textures['grass']);
        this.sprite.zIndex = y - 16;
        this.sprite.x = x;
        this.sprite.y = y;
        gameContainer.addChild(this.sprite);
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
            let leftCollided = collide(passer.getLeftHitbox(), this.getHitbox());
            let rightCollided = collide(passer.getRightHitbox(), this.getHitbox());
            if (!leftCollided && passer.leftHitboxCollidingObject == this) {
                passer.leftHitboxCollidingObject = null;
            }
            if (!rightCollided && passer.rightHitboxCollidingObject == this) {
                passer.rightHitboxCollidingObject = null;
            }
            if (!rightCollided && !leftCollided) delete this.passers[name];
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
                let leftCollided = collide(passer.getLeftHitbox(), this.getHitbox());
                let rightCollided = collide(passer.getRightHitbox(), this.getHitbox());
                if (leftCollided || rightCollided) {
                    if (leftCollided) {
                        passer.leftHitboxCollidingObject = this;
                    }
                    if (rightCollided) {
                        passer.rightHitboxCollidingObject = this;
                    }
                    this.passers[name] = true;
                    // this.backSprite.gotoAndPlay(0);
                    // this.frontSprite.gotoAndPlay(0);
                }
            }
        }
    }

    getHitbox() {
        return {
            x: this.sprite.x,
            y: this.sprite.y + 16,
            width: 32,
            height: 16
        };
    }
}
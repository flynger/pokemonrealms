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
        this.sprite.zIndex = y - 19;
        this.sprite.x = x;
        this.sprite.y = y;
        gameContainer.addChild(this.sprite);
        grass.grasses.push(this);
    }
    step() {
        let hitBox = this.getHitbox();
        for (let name in this.passers) {
            let passer = player.players[name];
            if (!passer) {
                delete this.passers[name];
                continue;
            }
            let leftCollided = collide(passer.getLeftHitbox(), hitBox);
            let rightCollided = collide(passer.getRightHitbox(), hitBox);
            let topCollided = collide(passer.getTopHitbox(), hitBox);
            let bottomCollided = collide(passer.getBottomHitbox(), hitBox);
            if (!leftCollided && passer.leftHitboxCollidingObject == this) {
                passer.leftHitboxCollidingObject = null;
            } else if (leftCollided && passer.leftHitboxCollidingObject != this) {
                passer.leftHitboxCollidingObject = this;
            }
            if (!rightCollided && passer.rightHitboxCollidingObject == this) {
                passer.rightHitboxCollidingObject = null;
            } else if (rightCollided && passer.rightHitboxCollidingObject != this) {
                passer.rightHitboxCollidingObject = this;
            }
            if (!topCollided && passer.topHitboxCollidingObject == this) {
                passer.topHitboxCollidingObject = null;
            } else if (topCollided && passer.topHitboxCollidingObject != this) {
                passer.topHitboxCollidingObject = this;
            }
            if (!bottomCollided && passer.bottomHitboxCollidingObject == this) {
                passer.bottomHitboxCollidingObject = null;
            } else if (bottomCollided && passer.bottomHitboxCollidingObject != this) {
                passer.bottomHitboxCollidingObject = this;
            }
            if (!rightCollided && !leftCollided) delete this.passers[name];
        }
        for (let name in player.players) {
            if (!this.passers[name]) {
                let passer = player.players[name];
                let leftCollided = collide(passer.getLeftHitbox(), hitBox);
                let rightCollided = collide(passer.getRightHitbox(), hitBox);
                let topCollided = collide(passer.getTopHitbox(), hitBox);
                let bottomCollided = collide(passer.getBottomHitbox(), hitBox);
                if (leftCollided) {
                    passer.leftHitboxCollidingObject = this;
                    this.passers[name] = true;
                }
                if (rightCollided) {
                    passer.rightHitboxCollidingObject = this;
                    this.passers[name] = true;
                }
                if (topCollided) {
                    passer.topHitboxCollidingObject = this;
                    this.passers[name] = true;
                }
                if (bottomCollided) {
                    passer.bottomHitboxCollidingObject = this;
                    this.passers[name] = true;
                }
                // this.backSprite.gotoAndPlay(0);
                // this.frontSprite.gotoAndPlay(0);
            }
        }
    }

    getHitbox() {
        return {
            x: this.sprite.x,
            y: this.sprite.y,
            width: 32,
            height: 32
        };
    }
}
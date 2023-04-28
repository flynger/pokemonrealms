class log {
    logs = {};
    constructor(x, y) {
        this.leftSprite = new PIXI.Sprite(kyledoveSheet.textures['log1']);
        this.rightSprite = new PIXI.Sprite(kyledoveSheet.textures['log2']);
        this.leftSprite.zIndex = this.rightSprite.zIndex = y - 20;
        this.leftSprite.x = x;
        this.rightSprite.x = x + 32;
        this.leftSprite.y = this.rightSprite.y = y;
        gameContainer.addChild(this.leftSprite);
        gameContainer.addChild(this.rightSprite);
        log[[x, y]] = this;
    }

    collide(passer) {
        let hitBox = this.getHitbox();
        let leftCollided = collide(passer.getLeftHitbox(), hitBox);
        let rightCollided = collide(passer.getRightHitbox(), hitBox);
        let topCollided = collide(passer.getTopHitbox(), hitBox);
        let bottomCollided = collide(passer.getBottomHitbox(), hitBox);
        if (leftCollided) {
            passer.leftHitboxCollidingObject = this;
        }
        if (rightCollided) {
            passer.rightHitboxCollidingObject = this;
        }
        if (topCollided) {
            passer.topHitboxCollidingObject = this;
        }
        if (bottomCollided) {
            passer.bottomHitboxCollidingObject = this;
        }
    }

    getHitbox() {
        return {
            x: this.sprite.x,
            y: this.sprite.y,
            width: 64,
            height: 32
        };
    }
}
const logs = log.logs;
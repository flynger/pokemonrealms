// plz go touch grass
class grass {
    static grasses = {};
    static collisionDepth = 8;

    static collisionOccurred(collision) {
        return collision != null && collision.depth >= this.collisionDepth;
    }

    passers = {};

    constructor(x, y) {
        this.sprite = new PIXI.Sprite(gen5exteriorSheet.textures['wildgrass']);
        this.sprite.zIndex = y - 20;
        this.sprite.x = x;
        this.sprite.y = y;
        gameContainer.addChild(this.sprite);
        grasses[[x, y]] = this;
        this.rigidBody = Matter.Bodies.rectangle(x + 16, y + 16, 32, 32);
        Matter.Body.setStatic(this.rigidBody, true);
    }

    step() {
        for (let name in players) {
            let passer = players[name];
            let playerInThisGrass = this.passers.hasOwnProperty(name);
            let hasCollisionOccurred = grass.collisionOccurred(Matter.Collision.collides(passer.rigidBody, this.rigidBody));
            if (playerInThisGrass && !hasCollisionOccurred) {
                passer.grassCounter--;
                delete this.passers[name];
            } else if(!playerInThisGrass && hasCollisionOccurred) {
                if (name == username && (passer.velocity.x != 0 || passer.velocity.y != 0)) socket.emit("grassEnter", {});
                passer.grassCounter++;
                this.passers[name] = true;
            }
        }
    }

    update(passer, removePlayer = false) {
        let name = passer.name;
        // remove player from passers if present
        if (removePlayer) {
            if (this.passers[name]) delete this.passers[name];
            return;
        }
        // update grass collision logic
        let hitBox = this.getHitbox();
        if (this.passers[name]) {
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
        } else {
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
const grasses = grass.grasses;
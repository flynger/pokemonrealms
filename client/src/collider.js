class collider {
    static colliders = {};
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        colliders[[x, y]] = this;
    }

    collide(passer) {
        let leftCollided = collide(passer.getLeftHitbox(), this);
        let rightCollided = collide(passer.getRightHitbox(), this);
        let topCollided = collide(passer.getTopHitbox(), this);
        let bottomCollided = collide(passer.getBottomHitbox(), this);
        if (leftCollided) {
            console.log("left")
            passer.velocity.x = 0;
            passer.setPosition(passer.x + 1, passer.y);
        }
        if (rightCollided) {
            console.log("right")
            passer.velocity.x = 0;
            passer.setPosition(passer.x - 1, passer.y);
        }
        if (topCollided) {
            console.log("top")
            passer.velocity.y = 0;
            passer.setPosition(passer.x, passer.y + 1);
        }
        if (bottomCollided) {
            console.log("bottom")
            passer.velocity.y = 0;
            passer.setPosition(passer.x, passer.y - 1);
        }
    }
}
const colliders = collider.colliders;
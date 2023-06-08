/*
Alex Ge, Arnav Singh, Richard Wei, Will Gannon, Harry Liu

This file implements main collider functionality 
*/
class collider {
    static colliders = {};

    // constructor for collider class: creates rigidbodies adds them to matter.js
    constructor(x, y, width, height) {
        colliders[[x, y]] = this;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.rigidBody = Matter.Bodies.rectangle(x + width / 2, y + height / 2, width, height);
        this.rigidBody.friction = 0;
        Matter.Composite.add(engine.world, this.rigidBody);
        Matter.Body.setStatic(this.rigidBody, true);
        // Matter.Body.setMass(this.rigidBody, 100);
    }

    // Sets player position away 1 coordinate value when player collision with object
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
var colliders = collider.colliders;
/*
Alex G, flynger, Richard W, Harry

This file implements npc functionality 
*/
class npc {
    static npcs = {};
    // constructor for npcs: creates rigidbody, sprite, and name
    constructor(name, avatar, x, y, facing = "down") {
        npcs[name] = this;
        this.name = name;
        this.avatar = avatar;
        this.facing = facing;
        this.createSprites();
        this.createRigidBody(x, y);
        this.updateSprite();
        this.renderName();
        // colliders[[x, y]] = new collider(x, y, 32, 32);
    }

    step() {
        this.nameTagStep();
        this.headSprite.zIndex = this.headSprite.y;
    }
    
    nameTagStep() {
        // update name tag offsets
        this.nameTagTextOffset = this.nameTagText.width + 10;
        this.nameTagTextOffset = - this.nameTagTextOffset / 2 + 16;
        this.nameTagTextOffset = - this.nameTagText.width / 2 + 16;

        // redraw name tag bounding box
        this.nameTagBack.clear();
        this.nameTagBack.beginFill(0x303030);
        this.nameTagBack.drawRoundedRect(this.headSprite.x + this.nameTagTextOffset, this.headSprite.y - 31, this.nameTagTextOffset, 18, 4);
        this.nameTagBack.endFill(0x303030);

        // update name text position
        this.nameTagText.scale.x = 1 / ratio;
        this.nameTagText.scale.y = 1 / ratio;
        this.nameTagText.x = this.headSprite.x + this.nameTagTextOffset + 1;
        this.nameTagText.y = this.headSprite.y - 27;

        this.nameTagBack.zIndex = this.nameTagText.zIndex = this.headSprite.y;
    }

    // Creates rigidbody for npc
    createRigidBody(x, y) {
        this.rigidBody = Matter.Bodies.rectangle(x + 16, y + player.rigidBodyOffset + player.rigidBodyHeight / 2, 32, player.rigidBodyHeight);
        this.rigidBody.frictionAir = 0;
        this.rigidBody.friction = 0;
        // this.rigidBody.collisionFilter.group = -1;
        this.position = this.rigidBody.position;
        this.velocity = this.rigidBody.velocity;
        // Matter.Body.setInertia(this.rigidBody, Infinity);
        Matter.Body.setStatic(this.rigidBody, true);
        Matter.Composite.add(engine.world, this.rigidBody);
    }

    // Creates sprites for npc
    createSprites() {
        this.sprites = player.playerSprites[this.avatar + "_head"];
        this.bodySprites = player.playerSprites[this.avatar + "_body"];
        this.headSprite = new PIXI.AnimatedSprite(this.sprites.animations[this.facing]);
        this.bodySprite = new PIXI.AnimatedSprite(this.bodySprites.animations[this.facing]);
        this.headSprite.texture = this.headSprite.textures[0];
        this.bodySprite.texture = this.bodySprite.textures[0];
        this.headSprite.anchor.set(0, 1 / 3);
        this.bodySprite.y = 24;
        this.headSprite.addChild(this.bodySprite);
        gameContainer.addChild(this.headSprite);
    }

    // Updates sprites for npc
    updateSprite() {
        this.headSprite.x = this.position.x - 16;
        this.headSprite.y = this.position.y - player.rigidBodyOffset - player.rigidBodyHeight / 2;
        if (this.headSprite.playing) {
            let totalVelocity = Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2);
            if (totalVelocity <= 0.0001 && this.speed == 0) {
                Matter.Body.setVelocity(this.rigidBody, { x: 0, y: 0});
                if (this.headSprite.currentFrame % 2 == 1) {
                    this.headSprite.gotoAndStop((this.headSprite.currentFrame + 1) % 4);
                    this.bodySprite.gotoAndStop((this.bodySprite.currentFrame + 1) % 4);
                } else {
                    this.headSprite.stop();
                    this.bodySprite.stop();
                }
            } else {
                //if (totalVelocity / 10 > 0.0) {
                this.headSprite.animationSpeed = this.bodySprite.animationSpeed = totalVelocity / 10;
                //} else {
                //    this.headSprite.animationSpeed = this.bodySprite.animationSpeed = 0;
                //}
            }
        }
    }

    setFacing(direction) {
        this.facing = direction;
        this.headSprite.textures = this.sprites.animations[this.facing];
        this.bodySprite.textures = this.bodySprites.animations[this.facing];
    }

    // Creates nametag for npc
    renderName() {
        if (this.nameTagText) {
            this.nameTagText.destroy();
            this.nameTagBack.destroy();
        }
        this.nameTagText = new PIXI.Text(this.name, {
            fontFamily: 'Power Clear',
            fontSize: 16 * ratio,
            padding: ratio,
            fill: 0xffffff
        });
        this.nameTagBack = new PIXI.Graphics();
        this.nameTagBack.alpha = 0.8;
        textContainer.addChild(this.nameTagBack);
        textContainer.addChild(this.nameTagText);
    }
}
const npcs = npc.npcs;
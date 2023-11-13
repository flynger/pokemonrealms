/*
Alex G, flynger, Richard W, Harry

This file defines the player class 
*/
class player {
    // Physics for player
    static walkSpeed = 1;
    static runSpeed = 1.5;
    static friction = 0.15;
    static rigidBodyWidth = 20;
    static rigidBodyHeight = 20;
    static rigidBodyOffset = 16;
    static avatars = ["red", "green", "blue", "brendan", "may", "oak"];
    static playerSprites = {};
    static players = {};

    static async initializePlayerSpritesheets() {
        for (let avatar of this.avatars) {
            let spriteName = avatar + "_walk";
            let spriteName2 = avatar + "_head";
            let sheetData2 = makeHorizontalSheet(spriteName2, `res/characters/${spriteName}.png`, 134, 198, 1, 4, 4, 2, 2, false, 12);
            sheetData2.animations = {
                "down": [spriteName2 + "_0_0", spriteName2 + "_0_1", spriteName2 + "_0_2", spriteName2 + "_0_3"],
                "left": [spriteName2 + "_1_0", spriteName2 + "_1_1", spriteName2 + "_1_2", spriteName2 + "_1_3"],
                "right": [spriteName2 + "_2_0", spriteName2 + "_2_1", spriteName2 + "_2_2", spriteName2 + "_2_3"],
                "up": [spriteName2 + "_3_0", spriteName2 + "_3_1", spriteName2 + "_3_2", spriteName2 + "_3_3"]
            };
            this.playerSprites[spriteName2] = new PIXI.Spritesheet(
                PIXI.BaseTexture.from(sheetData2.meta.image),
                sheetData2
            );
            let spriteName3 = avatar + "_body";
            let sheetData3 = makeHorizontalSheet(spriteName3, `res/characters/${spriteName}.png`, 134, 198, 1, 4, 4, 2, 2, false, 0, 36);
            sheetData3.animations = {
                "down": [spriteName3 + "_0_0", spriteName3 + "_0_1", spriteName3 + "_0_2", spriteName3 + "_0_3"],
                "left": [spriteName3 + "_1_0", spriteName3 + "_1_1", spriteName3 + "_1_2", spriteName3 + "_1_3"],
                "right": [spriteName3 + "_2_0", spriteName3 + "_2_1", spriteName3 + "_2_2", spriteName3 + "_2_3"],
                "up": [spriteName3 + "_3_0", spriteName3 + "_3_1", spriteName3 + "_3_2", spriteName3 + "_3_3"]
            };
            this.playerSprites[spriteName3] = new PIXI.Spritesheet(
                PIXI.BaseTexture.from(sheetData3.meta.image),
                sheetData3
            );
            await Promise.all([this.playerSprites[spriteName2].parse(), this.playerSprites[spriteName3].parse()]);
        }
    }

    grassCounter = 0;

    constructor(name, avatar, x, y, facing = "down", hasController = false) {
        players[name] = this; // create a reference in player.players
        this.name = name;
        this.avatar = avatar;
        this.facing = facing;
        this.hasController = hasController;
        this.busy = true;
        this.createSprites();
        this.createRigidBody(x, y);
        this.updateSprite();
        this.renderName();
    }

    step(deltaTime) {
        // input and camera logic
        if (this.hasController) {
            this.checkForInput();
            this.checkForInteract();
            this.centerCameraOnSelf();
            this.updateSprite();
            if (this.headSprite.playing) this.sendLocation();
        }
        this.nameTagStep(); // name tag frame update
        //this.grassUpdate(); // grass update
        this.headSprite.zIndex = this.headSprite.y; // update z-index
    }

    endFrame() {
        if (this.grassCounter == 0) {
            //this.nameTagText.text = "not colliding";
            this.bodySprite.alpha = 1;
        } else {
            //this.nameTagText.text = "colliding";
            this.bodySprite.alpha = 0.25;
        }
    }

    nameTagStep() {
        // update name tag offsets
        this.nameTagBackWidth = this.nameTagText.width + 10;
        this.nameTagBackOffset = - this.nameTagBackWidth / 2 + 16;
        this.nameTagTextOffset = - this.nameTagText.width / 2 + 16;

        // redraw name tag bounding box
        this.nameTagBack.clear();
        this.nameTagBack.beginFill(0x303030);
        this.nameTagBack.drawRoundedRect(this.headSprite.x + this.nameTagBackOffset, this.headSprite.y - 31, this.nameTagBackWidth, 18, 4);
        this.nameTagBack.endFill(0x303030);

        // update name text position
        this.nameTagText.scale.x = 1 / ratio;
        this.nameTagText.scale.y = 1 / ratio;
        this.nameTagText.x = this.headSprite.x + this.nameTagTextOffset + 1;
        this.nameTagText.y = this.headSprite.y - 27;

        this.nameTagBack.zIndex = this.nameTagText.zIndex = this.hasController ? 100000 : this.headSprite.y;
    }

    createRigidBody(x, y) {
        this.rigidBody = Matter.Bodies.rectangle(x + 16, y + player.rigidBodyOffset + player.rigidBodyHeight / 2, player.rigidBodyWidth, player.rigidBodyHeight);
        this.rigidBody.frictionAir = 0;
        this.rigidBody.friction = 0;
        this.rigidBody.collisionFilter.group = -1;
        this.position = this.rigidBody.position;
        this.velocity = this.rigidBody.velocity;
        Matter.Body.setInertia(this.rigidBody, Infinity);
        Matter.Composite.add(engine.world, this.rigidBody);
    }

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

        if (!this.hasController) {
            // Add click event listener
            this.headSprite.interactive = true;
            this.headSprite.cursor = 'pointer';
            this.headSprite.on("pointerdown", e => this.onClick(e));
        }
    }

    // Context menu that pops up when another player is clicked
    onClick(e) {
        // Handle sprite click event
        $('#player-context-menu').hide();
        playerClicked = true;
        $('#player-context-menu-name').html(this.name);
        $('#player-context-menu-battle')
            .off()
            .on("click", () => {
            sendBattleRequest(this.name);
            $('#player-context-menu').hide();
        });
        $('#player-context-menu-trade')
            .off()
            .on("click", () => {
            sendTradeRequest(this.name);
            $('#player-context-menu').hide();
        });
        $('#player-context-menu').show();
        $('#player-context-menu').css("top", e.clientY - 56);
        $('#player-context-menu').css("left", e.clientX);
    }

    updateSprite() {
        this.headSprite.x = this.position.x - 16;
        this.headSprite.y = this.position.y - player.rigidBodyOffset - player.rigidBodyHeight / 2;
        if (this.headSprite.playing) {
            let totalVelocity = Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2);
            if (totalVelocity <= 0.0001 && this.speed == 0) {
                Matter.Body.setVelocity(this.rigidBody, { x: 0, y: 0 });
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

    moveTo(x, y) {
        this.headSprite.x = x;
        this.headSprite.y = y;
        Matter.Body.setPosition(this.rigidBody, { x: x + 16, y: y + player.rigidBodyOffset + player.rigidBodyHeight / 2 })
    }

    renderName() {
        if (this.nameTagText) {
            this.nameTagText.destroy();
            this.nameTagBack.destroy();
        }
        this.nameTagText = new PIXI.Text(this.name + (this.hasController ? " (You)" : ""), {
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
    
    checkForInput() {
        // set player speed
        if (!this.busy && (Input.RIGHT != Input.LEFT || Input.UP != Input.DOWN)) {
            if (Input.SHIFT) {
                this.speed = player.walkSpeed;
            } else {
                this.speed = player.runSpeed;
            }
            this.rigidBody.frictionAir = 0;

            let movementVector = { x: 0, y: 0 };
            // check for keydown
            if (Input.UP && !Input.DOWN) {
                if (Input.LEFT == Input.RIGHT && this.facing != "up") this.setFacing("up");
                this.animate();
                movementVector.y -= this.speed;
            }
            if (Input.DOWN && !Input.UP) {
                if (Input.LEFT == Input.RIGHT && this.facing != "down") this.setFacing("down");
                this.animate();
                movementVector.y += this.speed;
            }
            if (Input.LEFT && !Input.RIGHT) {
                if (this.facing != "left") this.setFacing("left");
                this.animate();
                movementVector.x -= this.speed;
            }
            if (Input.RIGHT && !Input.LEFT) {
                if (this.facing != "right") this.setFacing("right");
                this.animate();
                movementVector.x += this.speed;
            }
            movementVector = Matter.Vector.mult(Matter.Vector.normalise(movementVector), this.speed);
            Matter.Body.setVelocity(this.rigidBody, movementVector);
        } else {
            this.speed = 0;
            this.rigidBody.frictionAir = player.friction;
        }
    }

    checkForInteract() {
        if (!this.busy && Input.SPACE) {
            for (let name in npcs) {
                let collisionData = Matter.Collision.collides(this.rigidBody, npcs[name].rigidBody);
                if (collisionData) {
                    let direction = collisionData.normal.y ? (collisionData.normal.y > 0 ? "up" : "down") : (collisionData.normal.x > 0 ? "left" : "right");
                    let playerDirection = collisionData.normal.y ? (collisionData.normal.y > 0 ? "down" : "up") : (collisionData.normal.x > 0 ? "right" : "left");
                    if (this.facing != playerDirection) this.setFacing(playerDirection);
                    npcs[name].setFacing(direction);
                    // console.log(collisionData);
                }
            }
        }
    }

    animate() {
        if (!this.headSprite.playing) {
            this.headSprite.play();
            this.bodySprite.play();
            this.headSprite.currentFrame = this.bodySprite.currentFrame = this.headSprite.currentFrame % 2 == 0 ? this.headSprite.currentFrame + 1 : this.headSprite.currentFrame;
            this.headSprite.texture = this.sprites.animations[this.facing][this.headSprite.currentFrame];
            this.bodySprite.texture = this.bodySprites.animations[this.facing][this.bodySprite.currentFrame];
        }
    }

    centerCameraOnSelf() {
        let centerX = this.headSprite.x + this.headSprite.width / 2;
        let centerY = this.headSprite.y + this.headSprite.height / 3;
        let mapWidth = map.width * TILE_SIZE;
        let mapHeight = map.height * TILE_SIZE;
        // camera x
        if (mapWidth <= WIDTH) {
            app.stage.pivot.x = (mapWidth - WIDTH) / 2;
        } else {
            if (centerX <= WIDTH / 2) {
                app.stage.pivot.x = 0;
            } else if (centerX >= mapWidth - WIDTH / 2) {
                app.stage.pivot.x = mapWidth - WIDTH;
            } else {
                app.stage.pivot.x = centerX - WIDTH / 2;
            }
        }
        app.stage.pivot.x *= ratio;
        // camera y
        if (mapHeight <= HEIGHT) {
            app.stage.pivot.y = (mapHeight - HEIGHT) / 2;
        } else {
            if (centerY <= HEIGHT / 2) {
                app.stage.pivot.y = 0;
            } else if (centerY >= mapHeight - HEIGHT / 2) {
                app.stage.pivot.y = mapHeight - HEIGHT;
            } else {
                app.stage.pivot.y = centerY - HEIGHT / 2;
            }
        }
        app.stage.pivot.y *= ratio;
    }

    destroy() {
        this.headSprite.destroy();
        this.nameTagText.destroy();
        this.nameTagBack.destroy();
        delete players[this.name];
    }

    // emit methods
    sendLocation() {
        client.socket.emit("playerMovement", {
            x: this.headSprite.x,
            y: this.headSprite.y,
            facing: this.facing,
            currentFrame: this.headSprite.currentFrame,
            map: [map.name, map.submapName]
        });
    }
}
var players = player.players;
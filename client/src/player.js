class player {
    static walkSpeed = 32 / 15;
    static runSpeed = 48 / 15;
    static #decelerationConstant = 0.4;
    static #minDeceleration = 0.1;
    //static maxVelocity = 48 / 15;
    static avatars = ["red", "green", "blue", "brendan", "may", "oak"];
    static #playerSprites = {};
    static players = {};

    static async initializePlayerSpritesheets() {
        for (let avatar of this.avatars) {
            let spriteName = avatar + "_walk";
            let sheetData = makeHorizontalSheet(spriteName, `res/characters/${spriteName}.png`, 134, 198, 1, 4, 4, 2, 2, false);
            sheetData.animations = {
                "down": [spriteName + "_0_0", spriteName + "_0_1", spriteName + "_0_2", spriteName + "_0_3"],
                "left": [spriteName + "_1_0", spriteName + "_1_1", spriteName + "_1_2", spriteName + "_1_3"],
                "right": [spriteName + "_2_0", spriteName + "_2_1", spriteName + "_2_2", spriteName + "_2_3"],
                "up": [spriteName + "_3_0", spriteName + "_3_1", spriteName + "_3_2", spriteName + "_3_3"]
            };
            this.#playerSprites[spriteName] = new PIXI.Spritesheet(
                PIXI.BaseTexture.from(sheetData.meta.image),
                sheetData
            );
            let spriteName2 = avatar + "_head";
            let sheetData2 = makeHorizontalSheet(spriteName2, `res/characters/${spriteName}.png`, 134, 198, 1, 4, 4, 2, 2, false, 12);
            sheetData2.animations = {
                "down": [spriteName2 + "_0_0", spriteName2 + "_0_1", spriteName2 + "_0_2", spriteName2 + "_0_3"],
                "left": [spriteName2 + "_1_0", spriteName2 + "_1_1", spriteName2 + "_1_2", spriteName2 + "_1_3"],
                "right": [spriteName2 + "_2_0", spriteName2 + "_2_1", spriteName2 + "_2_2", spriteName2 + "_2_3"],
                "up": [spriteName2 + "_3_0", spriteName2 + "_3_1", spriteName2 + "_3_2", spriteName2 + "_3_3"]
            };
            this.#playerSprites[spriteName2] = new PIXI.Spritesheet(
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
            this.#playerSprites[spriteName3] = new PIXI.Spritesheet(
                PIXI.BaseTexture.from(sheetData3.meta.image),
                sheetData3
            );
            await Promise.all([this.#playerSprites[spriteName].parse(), this.#playerSprites[spriteName2].parse(), this.#playerSprites[spriteName3].parse()]);
        }
    }

    velocity = {
        x: 0,
        y: 0
    }
    #moving = false;
    #allowInput = true;
    #nameTagBackWidth;
    #nameTagBackOffset;
    #nameTagTextOffset;

    leftHitboxCollidingObject = null;
    rightHitboxCollidingObject = null;
    topHitboxCollidingObject = null;
    bottomHitboxCollidingObject = null;

    constructor(name, avatar, x, y, facing = "down", hasController = false) {
        players[name] = this; // create a reference in player.players
        this.name = name;
        this.avatar = avatar;
        this.facing = facing;
        this.hasController = hasController;
        this.createSprites();
        this.setPosition(x, y);
        this.renderName();
    }

    step(deltaTime) {
        // movement logic
        if (this.#moving) {
            this.decelerate(deltaTime);
            this.move(deltaTime);
            if (this.hasController) this.sendLocation();
        }

        // input and camera logic
        if (this.hasController) {
            if (this.#allowInput) {
                this.checkForInput();
                this.centerCameraOnSelf();
            }
        }

        this.nameTagStep(); // name tag frame update
        this.grassUpdate(); // grass update
        this.headSprite.zIndex = this.y; // update z-index
    }

    endFrame() {
        if (this.leftHitboxCollidingObject == null || this.rightHitboxCollidingObject == null || this.topHitboxCollidingObject == null || this.bottomHitboxCollidingObject == null) {
            //this.nameTagText.text = "not colliding";
            this.bodySprite.alpha = 1;
        } else {
            //this.nameTagText.text = "colliding";
            this.bodySprite.alpha = 0.25;
        }
    }

    nameTagStep() {
        // update name tag offsets
        this.#nameTagBackWidth = this.nameTagText.width + 10;
        this.#nameTagBackOffset = - this.#nameTagBackWidth / 2 + 16;
        this.#nameTagTextOffset = - this.nameTagText.width / 2 + 16;

        // redraw name tag bounding box
        this.nameTagBack.clear();
        this.nameTagBack.beginFill(0x303030);
        this.nameTagBack.drawRoundedRect(this.headSprite.x + this.#nameTagBackOffset, this.headSprite.y - 31, this.#nameTagBackWidth, 18, 4);
        this.nameTagBack.endFill(0x303030);

        // update name text position
        this.nameTagText.scale.x = 1 / ratio;
        this.nameTagText.scale.y = 1 / ratio;
        this.nameTagText.x = this.headSprite.x + this.#nameTagTextOffset + 1;
        this.nameTagText.y = this.headSprite.y - 27;

        this.nameTagBack.zIndex = this.nameTagText.zIndex = this.hasController ? 100000 : this.headSprite.y;
    }

    grassUpdate(removeSelf = false) {
        let leftTile = 32 * Math.floor(this.x / 32);
        let topTile = 32 * Math.floor(this.y / 32);
        for (let x = leftTile; x <= leftTile + 32; x += 32) {
            for (let y = topTile; y <= topTile + 64; y += 32) {
                if (grasses[[x, y]]) {
                    grasses[[x, y]].update(this);
                }
                if (colliders[[x, y]]) {
                    colliders[[x, y]].collide(this);
                }
            }
        }
    }

    createSprites() {
        this.sprites = player.#playerSprites[this.avatar + "_head"];
        this.bodySprites = player.#playerSprites[this.avatar + "_body"];
        this.headSprite = new PIXI.AnimatedSprite(this.sprites.animations[this.facing]);
        this.bodySprite = new PIXI.AnimatedSprite(this.bodySprites.animations[this.facing]);
        this.headSprite.texture = this.headSprite.textures[0];
        this.bodySprite.texture = this.bodySprite.textures[0];
        this.headSprite.anchor.set(0, 1 / 3);
        this.bodySprite.y = 24;
        this.headSprite.addChild(this.bodySprite);
        gameContainer.addChild(this.headSprite);
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
        if ((Input.RIGHT || Input.LEFT || Input.UP || Input.DOWN) && (Input.SHIFT)) {
            this.speed = player.walkSpeed;
        } else if (Input.RIGHT || Input.LEFT || Input.UP || Input.DOWN) {
            this.speed = player.runSpeed;
        }

        // check for keydown
        if (Input.RIGHT) {
            if (this.facing != "right") this.setFacing("right");
            this.animate();
            this.velocity.x = this.speed;
            this.#moving = true;
        } else if (Input.LEFT) {
            if (this.facing != "left") this.setFacing("left");
            this.animate();
            this.velocity.x = -this.speed;
            this.#moving = true;
        }

        if (Input.DOWN) {
            if (!Input.LEFT && !Input.RIGHT && this.facing != "down") this.setFacing("down");
            this.animate();
            this.velocity.y = this.speed;
            this.#moving = true;
        } else if (Input.UP) {
            if (!Input.LEFT && !Input.RIGHT && this.facing != "up") this.setFacing("up");
            this.animate();
            this.velocity.y = -this.speed;
            this.#moving = true;
        }
    }

    setFacing(direction, setWalkAnimation = false) {
        this.facing = direction;
        this.headSprite.textures = this.sprites.animations[this.facing];
        this.bodySprite.textures = this.bodySprites.animations[this.facing];
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

    decelerate(deltaTime) {
        // decelerate player
        if (!Input.RIGHT && !Input.LEFT) {
            if (!Input.UP && !Input.DOWN) {
                let speedX = Math.abs(this.velocity.x);
                let signX = Math.sign(this.velocity.x);
                let decelerationX = Math.max(player.#decelerationConstant * speedX / this.speed, player.#minDeceleration);
                let decelerationXAmount = speedX < decelerationX * deltaTime * 2 ? -this.velocity.x : -signX * decelerationX * deltaTime * 2;
                this.velocity.x += decelerationXAmount;
            }
            else this.velocity.x = 0;
        }
        if (!Input.UP && !Input.DOWN) {
            if (!Input.RIGHT && !Input.LEFT) {
                let speedY = Math.abs(this.velocity.y);
                let signY = Math.sign(this.velocity.y);
                let decelerationY = Math.max(player.#decelerationConstant * speedY / this.speed, player.#minDeceleration);
                let decelerationYAmount = speedY < decelerationY * deltaTime * 2 ? -this.velocity.y : -signY * decelerationY * deltaTime * 2;
                this.velocity.y += decelerationYAmount;
            }
            else this.velocity.y = 0;
        }
    }

    move(deltaTime) {
        // move player by velocity
        let totalVelocity = (this.velocity.x ** 2 + this.velocity.y ** 2) ** 0.5;
        let maxVelocity = this.speed;
        if (totalVelocity > maxVelocity) {
            let scaleFactor = maxVelocity / totalVelocity;
            this.velocity.x *= scaleFactor;
            this.velocity.y *= scaleFactor;
            totalVelocity = maxVelocity;
        }
        if (this.velocity.x == 0 && this.velocity.y == 0) {
            if (this.headSprite.currentFrame % 2 == 1) {
                this.headSprite.gotoAndStop((this.headSprite.currentFrame + 1) % 4);
                this.bodySprite.gotoAndStop((this.bodySprite.currentFrame + 1) % 4);
            } else {
                this.headSprite.stop();
                this.bodySprite.stop();
            }
            this.#moving = false;
        } else {
            this.setPosition(this.x + this.velocity.x * deltaTime, this.y + this.velocity.y * deltaTime)
            if (totalVelocity == this.speed || this.headSprite.currentFrame % 2 == 0) {
                this.headSprite.animationSpeed = this.bodySprite.animationSpeed = totalVelocity / 15;
            } else {
                this.headSprite.stop();
                this.bodySprite.stop();
            }
        }
    }

    setPosition(x, y) {
        this.x = this.headSprite.x = x;
        this.y = this.headSprite.y = y;
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

    playIdleAnimation(speed, duration) {
        this.headSprite.animationSpeed = speed;
        this.headSprite.play();
        this.disableInputFor(duration);
    }

    disableInputFor(ms) {
        this.#allowInput = false;
        setTimeout(() => this.#allowInput = true, ms);
    }

    // hitbox methods
    getTopHitbox() {
        return {
            x: this.x + 9,
            y: this.y + 18,
            width: 14,
            height: 2
        }
    }

    getBottomHitbox() {
        return {
            x: this.x + 9,
            y: this.y + 33,
            width: 14,
            height: 2
        }
    }


    getLeftHitbox() {
        return {
            x: this.x + 7,
            y: this.y + 18,
            width: 2,
            height: 17
        };
    }

    getRightHitbox() {
        return {
            x: this.x + 23,
            y: this.y + 18,
            width: 2,
            height: 17
        };
    }

    // emit methods
    sendLocation() {
        socket.emit("playerMovement", {
            x: this.x,
            y: this.y,
            facing: this.facing,
            currentFrame: this.headSprite.currentFrame
        });
    }
}
const players = player.players;
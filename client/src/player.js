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
            await this.#playerSprites[spriteName].parse();
        }
    }

    #velocity = {
        x: 0,
        y: 0
    }
    #moving = false;
    #allowInput = true;
    #nameTagBackWidth;
    #nameTagBackOffset;
    #nameTagTextOffset;

    constructor(name, avatar, x, y, facing = "down", hasController = false) {
        player.players[name] = this;
        this.name = name;
        this.avatar = avatar;
        this.facing = facing;
        this.hasController = hasController;
        this.sprites = player.#playerSprites[this.avatar + "_walk"];
        this.sprite = new PIXI.AnimatedSprite(this.sprites.animations[facing]);
        this.sprite.texture = this.sprite.textures[0];
        this.sprite.anchor.set(0, 1 / 3);
        this.sprite.x = x;
        this.sprite.y = y;
        gameContainer.addChild(this.sprite);
        this.nameTagText = new PIXI.Text(name, {
            fontFamily: 'Power Clear',
            fontSize: 16 * ratio,
            padding: ratio,
            fill: 0xffffff
        });
        this.nameTagBack = new PIXI.Graphics();
        this.nameTagBack.alpha = 0.8;
        this.#nameTagBackWidth = (this.nameTagText.width) / ratio + 10;
        this.#nameTagBackOffset = - (this.#nameTagBackWidth) / 2 + 16;
        this.#nameTagTextOffset = 16 * ratio - this.nameTagText.width / 2;
        textContainer.addChild(this.nameTagBack);
        textContainer.addChild(this.nameTagText);
    }

    step(deltaTime) {
        if (this.#moving) {
            this.decelerate(deltaTime);
            this.move(deltaTime);
            if (this.hasController) this.sendLocation();
        }

        // redraw name tag bounding box
        this.nameTagBack.clear();
        this.nameTagBack.beginFill(0x303030);
        this.nameTagBack.drawRoundedRect((this.sprite.x + this.#nameTagBackOffset) * ratio, (this.sprite.y - 29 - ratio) * ratio, this.#nameTagBackWidth * ratio, (16 + ratio) * ratio, 4 * ratio);
        this.nameTagBack.endFill(0x303030);
        // update name text position
        this.nameTagText.x = this.sprite.x * ratio + this.#nameTagTextOffset + 1;
        this.nameTagText.y = (this.sprite.y - 27) * ratio;
        // update z-indices
       this.sprite.y;

        if (this.hasController) {
            this.nameTagBack.zIndex = this.nameTagText.zIndex = 100000;
            if (this.#allowInput) {
                // check for next input
                //if (!this.#moving) {
                // set player speed
                if ((Input.RIGHT || Input.LEFT || Input.UP || Input.DOWN) && (Input.SHIFT)) {
                    this.speed = player.walkSpeed;
                } else if (Input.RIGHT || Input.LEFT || Input.UP || Input.DOWN) {
                    this.speed = player.runSpeed;
                }
                // if player not moving get input
                if (Input.RIGHT) {
                    if (this.facing != "right") this.setFacing("right");
                    if (!this.sprite.playing) {
                        this.sprite.play();
                        this.sprite.currentFrame = this.sprite.currentFrame % 2 == 0 ? this.sprite.currentFrame + 1 : this.sprite.currentFrame;
                        this.sprite.texture = this.sprites.animations[this.facing][this.sprite.currentFrame];
                    }
                    this.#velocity.x = this.speed;
                    this.#moving = true;
                } else if (Input.LEFT) {
                    if (this.facing != "left") this.setFacing("left");
                    if (!this.sprite.playing) {
                        this.sprite.play();
                        this.sprite.currentFrame = this.sprite.currentFrame % 2 == 0 ? this.sprite.currentFrame + 1 : this.sprite.currentFrame;
                        this.sprite.texture = this.sprites.animations[this.facing][this.sprite.currentFrame];
                    }
                    this.#velocity.x = -this.speed;
                    this.#moving = true;
                }

                if (Input.DOWN) {
                    if (!Input.LEFT && !Input.RIGHT && this.facing != "down") this.setFacing("down");
                    if (!this.sprite.playing) {
                        this.sprite.play();
                        this.sprite.currentFrame = this.sprite.currentFrame % 2 == 0 ? this.sprite.currentFrame + 1 : this.sprite.currentFrame;
                        this.sprite.texture = this.sprites.animations[this.facing][this.sprite.currentFrame];
                    }
                    this.#velocity.y = this.speed;
                    this.#moving = true;
                } else if (Input.UP) {
                    if (!Input.LEFT && !Input.RIGHT && this.facing != "up") this.setFacing("up");
                    if (!this.sprite.playing) {
                        this.sprite.play();
                        this.sprite.currentFrame = this.sprite.currentFrame % 2 == 0 ? this.sprite.currentFrame + 1 : this.sprite.currentFrame;
                        this.sprite.texture = this.sprites.animations[this.facing][this.sprite.currentFrame];
                    }
                    this.#velocity.y = -this.speed;
                    this.#moving = true;
                }
                this.centerCameraOnSelf();
            }
            this.sprite.zIndex = this.sprite.y + 0.01;
        } else {
            this.nameTagBack.zIndex = this.nameTagText.zIndex = this.sprite.zIndex = this.sprite.y;
        }
    }

    setFacing(direction, setWalkAnimation = false) {
        this.facing = direction;
        this.sprite.textures = this.sprites.animations[this.facing];
    }

    decelerate(deltaTime) {
        // decelerate player
        if (!Input.RIGHT && !Input.LEFT) {
            if (!Input.UP && !Input.DOWN) {
                let speedX = Math.abs(this.#velocity.x);
                let signX = Math.sign(this.#velocity.x);
                let decelerationX = Math.max(player.#decelerationConstant * speedX / this.speed, player.#minDeceleration);
                let decelerationXAmount = speedX < decelerationX * deltaTime * 2 ? -this.#velocity.x : -signX * decelerationX * deltaTime * 2;
                this.#velocity.x += decelerationXAmount;
            }
            else this.#velocity.x = 0;
        }
        if (!Input.UP && !Input.DOWN) {
            if (!Input.RIGHT && !Input.LEFT) {
                let speedY = Math.abs(this.#velocity.y);
                let signY = Math.sign(this.#velocity.y);
                let decelerationY = Math.max(player.#decelerationConstant * speedY / this.speed, player.#minDeceleration);
                let decelerationYAmount = speedY < decelerationY * deltaTime * 2 ? -this.#velocity.y : -signY * decelerationY * deltaTime * 2;
                this.#velocity.y += decelerationYAmount;
            }
            else this.#velocity.y = 0;
        }
    }

    move(deltaTime) {
        // move player by velocity
        let totalVelocity = (this.#velocity.x ** 2 + this.#velocity.y ** 2) ** 0.5;
        let maxVelocity = this.speed;
        if (totalVelocity > maxVelocity) {
            let scaleFactor = maxVelocity / totalVelocity;
            this.#velocity.x *= scaleFactor;
            this.#velocity.y *= scaleFactor;
            totalVelocity = maxVelocity;
        }
        if (this.#velocity.x == 0 && this.#velocity.y == 0) {
            if (this.sprite.currentFrame % 2 == 1) {
                this.sprite.gotoAndStop((this.sprite.currentFrame + 1) % 4);
            } else this.sprite.stop();
            this.#moving = false;
        } else {
            this.sprite.x += this.#velocity.x * deltaTime;
            this.sprite.y += this.#velocity.y * deltaTime;

            if (totalVelocity == this.speed || this.sprite.currentFrame % 2 == 0) {
                this.sprite.animationSpeed = totalVelocity / 15;
            } else this.sprite.stop();
        }
    }

    // moveTo(x, y) {
    //     this.#target.x = x;
    //     this.#target.y = y;
    //     this.#moving = true;
    // }
    centerCameraOnSelf() {
        let centerX = this.sprite.x + this.sprite.width / 2;
        let centerY = this.sprite.y + this.sprite.height / 3;
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
        this.sprite.animationSpeed = speed;
        this.sprite.play();
        this.disableInputFor(duration);
    }

    disableInputFor(ms) {
        this.#allowInput = false;
        setTimeout(() => this.#allowInput = true, ms);
    }

    sendLocation() {
        //console.log("sending packet '" + type + "'");
        socket.emit("playerMovement", {
            x: this.sprite.x,
            y: this.sprite.y,
            facing: this.facing,
            currentFrame: this.sprite.currentFrame
        });
    }
}
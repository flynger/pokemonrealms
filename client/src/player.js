class player {
    static walkSpeed = 32 / 15;
    static runSpeed = 48 / 15;
    static decelerationConstant = 0.4;
    static minDeceleration = 0.1;
    //static maxVelocity = 48 / 15;
    static avatars = ["red", "green", "blue", "brendan", "may", "oak"];
    static playerSprites = {};

    static async initializePlayerSpritesheets() {
        // let playerSheetData = {
        //     "frames": {
        //         "d1":
        //         {
        //             "frame": { "x": 0, "y": 0, "w": 32, "h": 48 },
        //             "spriteSourceSize": { "x": 0, "y": 0, "w": 32, "h": 48 },
        //             "sourceSize": { "w": 32, "h": 48 }
        //         },
        //         "d2":
        //         {
        //             "frame": { "x": 32, "y": 0, "w": 32, "h": 48 },
        //             "spriteSourceSize": { "x": 0, "y": 0, "w": 32, "h": 48 },
        //             "sourceSize": { "w": 32, "h": 48 }
        //         },
        //         "d3":
        //         {
        //             "frame": { "x": 64, "y": 0, "w": 32, "h": 48 },
        //             "spriteSourceSize": { "x": 0, "y": 0, "w": 32, "h": 48 },
        //             "sourceSize": { "w": 32, "h": 48 }
        //         },
        //         "d4":
        //         {
        //             "frame": { "x": 96, "y": 0, "w": 32, "h": 48 },
        //             "spriteSourceSize": { "x": 0, "y": 0, "w": 32, "h": 48 },
        //             "sourceSize": { "w": 32, "h": 48 }
        //         },
        //         "l1":
        //         {
        //             "frame": { "x": 0, "y": 48, "w": 32, "h": 48 },
        //             "spriteSourceSize": { "x": 0, "y": 0, "w": 32, "h": 48 },
        //             "sourceSize": { "w": 32, "h": 48 }
        //         },
        //         "l2":
        //         {
        //             "frame": { "x": 32, "y": 48, "w": 32, "h": 48 },
        //             "spriteSourceSize": { "x": 0, "y": 0, "w": 32, "h": 48 },
        //             "sourceSize": { "w": 32, "h": 48 }
        //         },
        //         "l3":
        //         {
        //             "frame": { "x": 64, "y": 48, "w": 32, "h": 48 },
        //             "spriteSourceSize": { "x": 0, "y": 0, "w": 32, "h": 48 },
        //             "sourceSize": { "w": 32, "h": 48 }
        //         },
        //         "l4":
        //         {
        //             "frame": { "x": 96, "y": 48, "w": 32, "h": 48 },
        //             "spriteSourceSize": { "x": 0, "y": 0, "w": 32, "h": 48 },
        //             "sourceSize": { "w": 32, "h": 48 }
        //         },
        //         "r1":
        //         {
        //             "frame": { "x": 0, "y": 96, "w": 32, "h": 48 },
        //             "spriteSourceSize": { "x": 0, "y": 0, "w": 32, "h": 48 },
        //             "sourceSize": { "w": 32, "h": 48 }
        //         },
        //         "r2":
        //         {
        //             "frame": { "x": 32, "y": 96, "w": 32, "h": 48 },
        //             "spriteSourceSize": { "x": 0, "y": 0, "w": 32, "h": 48 },
        //             "sourceSize": { "w": 32, "h": 48 }
        //         },
        //         "r3":
        //         {
        //             "frame": { "x": 64, "y": 96, "w": 32, "h": 48 },
        //             "spriteSourceSize": { "x": 0, "y": 0, "w": 32, "h": 48 },
        //             "sourceSize": { "w": 32, "h": 48 }
        //         },
        //         "r4":
        //         {
        //             "frame": { "x": 96, "y": 96, "w": 32, "h": 48 },
        //             "spriteSourceSize": { "x": 0, "y": 0, "w": 32, "h": 48 },
        //             "sourceSize": { "w": 32, "h": 48 }
        //         },
        //         "u1":
        //         {
        //             "frame": { "x": 0, "y": 144, "w": 32, "h": 48 },
        //             "spriteSourceSize": { "x": 0, "y": 0, "w": 32, "h": 48 },
        //             "sourceSize": { "w": 32, "h": 48 }
        //         },
        //         "u2":
        //         {
        //             "frame": { "x": 32, "y": 144, "w": 32, "h": 48 },
        //             "spriteSourceSize": { "x": 0, "y": 0, "w": 32, "h": 48 },
        //             "sourceSize": { "w": 32, "h": 48 }
        //         },
        //         "u3":
        //         {
        //             "frame": { "x": 64, "y": 144, "w": 32, "h": 48 },
        //             "spriteSourceSize": { "x": 0, "y": 0, "w": 32, "h": 48 },
        //             "sourceSize": { "w": 32, "h": 48 }
        //         },
        //         "u4":
        //         {
        //             "frame": { "x": 96, "y": 144, "w": 32, "h": 48 },
        //             "spriteSourceSize": { "x": 0, "y": 0, "w": 32, "h": 48 },
        //             "sourceSize": { "w": 32, "h": 48 }
        //         }
        //     },

        //     "animations": {
        //         "down1": ["d2", "d1"],
        //         "down2": ["d4", "d1"],
        //         "left1": ["l2", "l1"],
        //         "left2": ["l4", "l1"],
        //         "right1": ["r2", "r1"],
        //         "right2": ["r4", "r1"],
        //         "up1": ["u2", "u1"],
        //         "up2": ["u4", "u1"]
        //     },

        //     "meta": {
        //         "image": "res/characters/red_walk.png",
        //         "format": "RGBA8888",
        //         "size": { "w": 128, "h": 192 },
        //         "scale": "1"
        //     }
        // }

        let sprites = [];
        for (let avatar of this.avatars) {
            sprites.push(avatar + "_walk");
            sprites.push(avatar + "_run");
        }
        for (let avatar of sprites) {
            let sheetData = makeHorizontalSheet(avatar, `res/characters/${avatar}.png`, 134, 198, 1, 4, 4, 2, 2, false);
            sheetData.animations = {
                "down": [avatar + "_0_0", avatar + "_0_1", avatar + "_0_2", avatar + "_0_3"],
                "left": [avatar + "_1_0", avatar + "_1_1", avatar + "_1_2", avatar + "_1_3"],
                "right": [avatar + "_2_0", avatar + "_2_1", avatar + "_2_2", avatar + "_2_3"],
                "up": [avatar + "_3_0", avatar + "_3_1", avatar + "_3_2", avatar + "_3_3"]
            };
            this.playerSprites[avatar] = new PIXI.Spritesheet(
                PIXI.BaseTexture.from(sheetData.meta.image),
                sheetData
            );
            await this.playerSprites[avatar].parse();
        }
    }

    #velocity = {
        x: 0,
        y: 0
    }
    #moving = false;
    #allowInput = true;
    #animSheet = 2;
    #nameTagBackWidth;
    #nameTagBackOffset;
    #nameTagTextOffset;

    constructor(name, avatar, x, y, facing = "down", hasController = false) {
        this.name = name;
        this.avatar = avatar;
        this.facing = facing;
        this.hasController = hasController;
        this.sprites = player.playerSprites[this.avatar + "_walk"];
        this.sprite = new PIXI.AnimatedSprite(this.sprites.animations[facing]);
        this.sprite.texture = this.sprite.textures[0];
        this.sprite.anchor.set(0, 1 / 3);
        this.sprite.x = x;
        this.sprite.y = y;
        app.stage.addChild(this.sprite);
        this.nameTagText = new PIXI.Text(name, {
            fontFamily: 'Power Clear',
            fontSize: 16,
            fill: 0xffffff
        });
        this.#nameTagBackWidth = this.nameTagText.width + 10;
        this.#nameTagBackOffset = - (this.#nameTagBackWidth) / 2 + 16;
        this.#nameTagTextOffset = 16 - this.nameTagText.width / 2;
        app.stage.addChild(this.nameTagText);
        //obj.drawRect(0, 0, 200, 100);

    }

    step(deltaTime, app) {
        if (this.hasController) {
            if (this.#allowInput) {
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
                // check for next input
                //if (!this.#moving) {
                // set player speed
                if ((Input.RIGHT || Input.LEFT || Input.UP || Input.DOWN) && (Input.SHIFT)) {
                    this.speed = player.walkSpeed;
                    //this.sprites = player.playerSprites[this.avatar + "_run"];
                } else if (Input.RIGHT || Input.LEFT || Input.UP || Input.DOWN) {
                    this.speed = player.runSpeed;
                    //this.sprites = player.playerSprites[this.avatar + "_walk"];
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
                //}
            }
            this.sprite.zIndex = this.sprite.y + 0.01;
        } else {
            this.sprite.zIndex = this.sprite.y;
        }
        if (this.#moving) {
            // move player by velocity
            if (!Input.RIGHT && !Input.LEFT) {
                let speedX = Math.abs(this.#velocity.x);
                let signX = Math.sign(this.#velocity.x);
                let decelerationX = Math.max(player.decelerationConstant * speedX / this.speed, player.minDeceleration);
                let decelerationXAmount = speedX < decelerationX ? -this.#velocity.x : -signX * decelerationX;
                this.#velocity.x += decelerationXAmount;
            }
            if (!Input.UP && !Input.DOWN) {
                let speedY = Math.abs(this.#velocity.y);
                let signY = Math.sign(this.#velocity.y);
                let decelerationY = Math.max(player.decelerationConstant * speedY / this.speed, player.minDeceleration);
                let decelerationYAmount = speedY < decelerationY ? -this.#velocity.y : -signY * decelerationY;
                this.#velocity.y += decelerationYAmount;
            }
            let totalVelocity = (this.#velocity.x ** 2 + this.#velocity.y ** 2) ** 0.5;
            let maxVelocity = this.speed;
            if (totalVelocity > maxVelocity) {
                let scaleFactor = maxVelocity / totalVelocity;
                this.#velocity.x *= scaleFactor;
                this.#velocity.y *= scaleFactor;
                totalVelocity = maxVelocity;
            }
            if (this.#velocity.x == 0 && this.#velocity.y == 0) {
                //if (this.sprite.playing) {
                this.sprite.texture = this.sprites.animations[this.facing][this.sprite.currentFrame % 2 == 1 ? (this.sprite.currentFrame + 1) % 4 : this.sprite.currentFrame];
                //}
                this.#moving = false;
            } else {
                this.sprite.x += this.#velocity.x * deltaTime;
                this.sprite.y += this.#velocity.y * deltaTime;
                
                if (totalVelocity == this.speed || this.sprite.currentFrame % 2 == 0) {
                    this.sprite.animationSpeed = totalVelocity / 15;
                } else this.sprite.stop();
            }
        }
        graphics.alpha = 0.5;
        graphics.beginFill(0x202020);
        graphics.drawRoundedRect(this.sprite.x + this.#nameTagBackOffset, this.sprite.y - 29, this.#nameTagBackWidth, 16, 4);
        graphics.endFill(0x202020);
        this.nameTagText.zIndex = 100000; //this.sprite.y + 1;
        this.nameTagText.x = this.sprite.x + this.#nameTagTextOffset;
        this.nameTagText.y = this.sprite.y - 27;
    }

    setFacing(direction, setWalkAnimation = false) {
        this.facing = direction;
        // this.#animSheet = this.#animSheet % 2 + 1;
        // if (setWalkAnimation && this.sprites != player.playerSprites[this.avatar + "_walk"]) {
        //     this.sprites = player.playerSprites[this.avatar + "_walk"];
        // }
        this.sprite.textures = this.sprites.animations[this.facing];
    }

    // moveTo(x, y) {
    //     this.#target.x = x;
    //     this.#target.y = y;
    //     this.#moving = true;
    // }

    playIdleAnimation(speed, duration) {
        this.sprite.animationSpeed = speed;
        this.sprite.play();
        this.disableInputFor(duration);
    }

    disableInputFor(ms) {
        this.#allowInput = false;
        setTimeout(() => this.#allowInput = true, ms);
    }
}
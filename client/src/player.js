class player {
    static walkSpeed = 32 / 15;
    static runSpeed = 64 / 15;
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
                "down1": [avatar + "_0_1", avatar + "_0_0"],
                "down2": [avatar + "_0_3", avatar + "_0_0"],
                "left1": [avatar + "_1_1", avatar + "_1_0"],
                "left2": [avatar + "_1_3", avatar + "_1_0"],
                "right1": [avatar + "_2_1", avatar + "_2_0"],
                "right2": [avatar + "_2_3", avatar + "_2_0"],
                "up1": [avatar + "_3_1", avatar + "_3_0"],
                "up2": [avatar + "_3_3", avatar + "_3_0"]
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
    #target;
    #nextInput = false;
    #nextShiftInput = false;
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
        this.sprite = new PIXI.AnimatedSprite(this.sprites.animations[facing + this.#animSheet]);
        this.sprite.texture = this.sprite.textures[1];
        this.sprite.animationSpeed = 0.1;
        this.sprite.loop = false;
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
        if (this.#moving) {
            // else move player toward target tile
            this.sprite.x += this.#velocity.x * deltaTime;
            this.sprite.y += this.#velocity.y * deltaTime;
            this.#velocity.x = this.#velocity.y = 0;
            this.#moving = false;
            // let distX = this.#target.x - this.sprite.x;
            // let distY = this.#target.y - this.sprite.y;
            // let dx = Math.sign(distX) * this.speed;
            // let dy = Math.sign(distY) * this.speed;
            // if ((Math.abs(distX) <= this.speed && Math.abs(distY) == 0) || (Math.abs(distY) <= this.speed && Math.abs(distX) == 0)) { // <= or == which one?
            //     this.sprite.x = this.#target.x;
            //     this.sprite.y = this.#target.y;
            //     this.#moving = false;
            // } else {
            //     this.sprite.x += dx;
            //     this.sprite.y += dy;
            // }
        }
        if (this.hasController && this.#allowInput) {
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
            }
            else {
                if (centerY <= HEIGHT / 2) {
                    app.stage.pivot.y = 0;
                } else if (centerY >= mapHeight - HEIGHT / 2) {
                    app.stage.pivot.y = mapHeight - HEIGHT;
                } else {
                    app.stage.pivot.y = centerY - HEIGHT / 2;
                }
            }
            if (!this.#moving) {
                // set player speed
                if ((Input.RIGHT || Input.LEFT || Input.UP || Input.DOWN) && (Input.SHIFT/* || this.#nextShiftInput*/)) {
                    this.sprite.animationSpeed = 0.175;
                    this.speed = player.runSpeed;
                    this.sprites = player.playerSprites[this.avatar + "_run"];
                } else {
                    this.sprite.animationSpeed = 0.1;
                    this.speed = player.walkSpeed;
                    this.sprites = player.playerSprites[this.avatar + "_walk"];
                }
                // if player not moving get input
                if (Input.RIGHT) {
                    this.#nextInput = false;
                    this.#nextShiftInput = false;
                    this.setFacing("right");
                    this.sprite.play();
                    this.#velocity.x = this.speed;
                    this.#moving = true;
                }
                // else if (this.facing != "right" && !this.#nextInput && Input.RIGHT) {
                //     this.setFacing("right", true);
                //     this.playIdleAnimation(0.2, 150);
                // }
                else if (Input.LEFT) {
                    this.#nextInput = false;
                    this.#nextShiftInput = false;
                    this.setFacing("left");
                    this.sprite.play();
                    this.#velocity.x = -this.speed;
                    this.#moving = true;
                }
                // else if (this.facing != "left" && !this.#nextInput && Input.LEFT) {
                //     this.setFacing("left", true);
                //     this.playIdleAnimation(0.2, 150);
                // }
                if (Input.DOWN) {
                    this.#nextInput = false;
                    this.#nextShiftInput = false;
                    this.setFacing("down");
                    this.sprite.play();
                    this.#velocity.y = this.speed;
                    this.#moving = true;
                }
                // else if (this.facing != "down" && !this.#nextInput && Input.DOWN) {
                //     this.setFacing("down", true);
                //     this.playIdleAnimation(0.2, 150);
                // }
                else if (Input.UP) {
                    this.#nextInput = false;
                    this.#nextShiftInput = false;
                    this.setFacing("up");
                    this.sprite.play();
                    this.#velocity.y = -this.speed;
                    this.#moving = true;
                }
                // else if (this.facing != "up" && !this.#nextInput && Input.UP) {
                //     this.setFacing("up", true);
                //     this.playIdleAnimation(0.2, 150);
                // }
                else {
                    this.#nextShiftInput = false;
                    this.sprite.texture = player.playerSprites[this.avatar + "_walk"].animations[this.facing + this.#animSheet][1];
                }
            }
        }
        if (this.hasController) {
            this.sprite.zIndex = this.sprite.y + 0.1;
        } else this.sprite.zIndex = this.sprite.y;
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
        this.#animSheet = this.#animSheet % 2 + 1;
        if (setWalkAnimation && this.sprites != player.playerSprites[this.avatar + "_walk"]) {
            this.sprites = player.playerSprites[this.avatar + "_walk"];
        }
        this.sprite.textures = this.sprites.animations[this.facing + this.#animSheet];
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
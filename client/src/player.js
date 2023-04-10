class player {
    static walkSpeed = 2;
    static runSpeed = 3.5;
    static playerSprites = {};
    static async initializePlayerSpritesheets() {
        let playerSheetData = {
            "frames": {
                "d1":
                {
                    "frame": { "x": 0, "y": 0, "w": 32, "h": 48 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 32, "h": 48 },
                    "sourceSize": { "w": 32, "h": 48 }
                },
                "d2":
                {
                    "frame": { "x": 32, "y": 0, "w": 32, "h": 48 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 32, "h": 48 },
                    "sourceSize": { "w": 32, "h": 48 }
                },
                "d3":
                {
                    "frame": { "x": 64, "y": 0, "w": 32, "h": 48 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 32, "h": 48 },
                    "sourceSize": { "w": 32, "h": 48 }
                },
                "d4":
                {
                    "frame": { "x": 96, "y": 0, "w": 32, "h": 48 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 32, "h": 48 },
                    "sourceSize": { "w": 32, "h": 48 }
                },
                "l1":
                {
                    "frame": { "x": 0, "y": 48, "w": 32, "h": 48 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 32, "h": 48 },
                    "sourceSize": { "w": 32, "h": 48 }
                },
                "l2":
                {
                    "frame": { "x": 32, "y": 48, "w": 32, "h": 48 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 32, "h": 48 },
                    "sourceSize": { "w": 32, "h": 48 }
                },
                "l3":
                {
                    "frame": { "x": 64, "y": 48, "w": 32, "h": 48 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 32, "h": 48 },
                    "sourceSize": { "w": 32, "h": 48 }
                },
                "l4":
                {
                    "frame": { "x": 96, "y": 48, "w": 32, "h": 48 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 32, "h": 48 },
                    "sourceSize": { "w": 32, "h": 48 }
                },
                "r1":
                {
                    "frame": { "x": 0, "y": 96, "w": 32, "h": 48 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 32, "h": 48 },
                    "sourceSize": { "w": 32, "h": 48 }
                },
                "r2":
                {
                    "frame": { "x": 32, "y": 96, "w": 32, "h": 48 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 32, "h": 48 },
                    "sourceSize": { "w": 32, "h": 48 }
                },
                "r3":
                {
                    "frame": { "x": 64, "y": 96, "w": 32, "h": 48 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 32, "h": 48 },
                    "sourceSize": { "w": 32, "h": 48 }
                },
                "r4":
                {
                    "frame": { "x": 96, "y": 96, "w": 32, "h": 48 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 32, "h": 48 },
                    "sourceSize": { "w": 32, "h": 48 }
                },
                "u1":
                {
                    "frame": { "x": 0, "y": 144, "w": 32, "h": 48 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 32, "h": 48 },
                    "sourceSize": { "w": 32, "h": 48 }
                },
                "u2":
                {
                    "frame": { "x": 32, "y": 144, "w": 32, "h": 48 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 32, "h": 48 },
                    "sourceSize": { "w": 32, "h": 48 }
                },
                "u3":
                {
                    "frame": { "x": 64, "y": 144, "w": 32, "h": 48 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 32, "h": 48 },
                    "sourceSize": { "w": 32, "h": 48 }
                },
                "u4":
                {
                    "frame": { "x": 96, "y": 144, "w": 32, "h": 48 },
                    "spriteSourceSize": { "x": 0, "y": 0, "w": 32, "h": 48 },
                    "sourceSize": { "w": 32, "h": 48 }
                }
            },

            "animations": {
                "down1": ["d2", "d3"],
                "down2": ["d4", "d1"],
                "left1": ["l2", "l3"],
                "left2": ["l4", "l1"],
                "right1": ["r2", "r3"],
                "right2": ["r4", "r1"],
                "up1": ["u2", "u3"],
                "up2": ["u4", "u1"]
            },

            "meta": {
                "image": "res/characters/red_walk.png",
                "format": "RGBA8888",
                "size": { "w": 128, "h": 192 },
                "scale": "1"
            }
        }

        let avatars = ["red", "blue"];
        for (let avatar of avatars) {
            //playerSheetData.meta.image = 
            this.playerSprites[avatar] = new PIXI.Spritesheet(
                PIXI.BaseTexture.from(`res/characters/${avatar}_walk.png`),
                playerSheetData
            );
            await this.playerSprites[avatar].parse();
        }
    }
    #speed;
    #moving = false;
    #hasController;
    #target;
    #animSheet = 2;
    constructor(name, avatar, x, y, facing = "down", hasController = false) {
        this.name = name;
        this.avatar = avatar;
        this.#hasController = hasController;
        this.sprite = new PIXI.AnimatedSprite(player.playerSprites[avatar].animations[facing + this.#animSheet]);
        this.sprite.texture = this.sprite.textures[1];
        this.sprite.animationSpeed = 0.1;
        this.sprite.loop = false;
        this.sprite.x = x;
        this.sprite.y = y;
        this.#target = { x, y };
    }
    step(delta) {
        if (this.#hasController && !this.#moving) {
            // set player speed
            if (Input.SHIFT) {
                this.speed = player.runSpeed * delta;
            } else {
                this.speed = player.walkSpeed * delta;
            }
            // if player not moving get input
            if (Input.RIGHT) {
                if (this.#animSheet == 1) {
                    this.#animSheet = 2;
                    this.sprite.textures = player.playerSprites[this.avatar].animations.right2;
                } else {
                    this.#animSheet = 1;
                    console.log(player.playerSprites[this.avatar]);
                    this.sprite.textures = player.playerSprites[this.avatar].animations.right1;
                }
                this.sprite.play();
                this.#moving = true;
                this.#target.x = this.sprite.x + 32;
                this.#target.y = this.sprite.y;
            } else if (Input.LEFT) {
                if (this.#animSheet == 1) {
                    this.#animSheet = 2;
                    this.sprite.textures = player.playerSprites[this.avatar].animations.left2;
                } else {
                    this.#animSheet = 1;
                    this.sprite.textures = player.playerSprites[this.avatar].animations.left1;
                }
                this.sprite.play();
                this.#moving = true;
                this.#target.x = this.sprite.x - 32;
                this.#target.y = this.sprite.y;
            } else if (Input.DOWN) {
                if (this.#animSheet == 1) {
                    this.#animSheet = 2;
                    this.sprite.textures = player.playerSprites[this.avatar].animations.down2;
                } else {
                    this.#animSheet = 1;
                    this.sprite.textures = player.playerSprites[this.avatar].animations.down1;
                }
                this.sprite.play();
                this.#moving = true;
                this.#target.x = this.sprite.x;
                this.#target.y = this.sprite.y + 32;
            } else if (Input.UP) {
                if (this.#animSheet == 1) {
                    this.#animSheet = 2;
                    this.sprite.textures = player.playerSprites[this.avatar].animations.up2;
                } else {
                    this.#animSheet = 1;
                    this.sprite.textures = player.playerSprites[this.avatar].animations.up1;
                }
                this.sprite.play();
                this.#moving = true;
                this.#target.x = this.sprite.x;
                this.#target.y = this.sprite.y - 32;
            }
        } else {
            // else move player toward target tile
            let distX = this.#target.x - this.sprite.x;
            let distY = this.#target.y - this.sprite.y;
            let dx = Math.sign(distX) * this.speed;
            let dy = Math.sign(distY) * this.speed;
            if ((Math.abs(distX) <= this.speed && Math.abs(distY) == 0) || (Math.abs(distY) <= this.speed && Math.abs(distX) == 0)) { // <= or == which one?
                this.sprite.x = this.#target.x;
                this.sprite.y = this.#target.y;
                this.#moving = false;
            } else {
                this.sprite.x += dx;
                this.sprite.y += dy;
            }
        }
    }
}
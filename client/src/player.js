class player {
    static walkSpeed = 2;
    static runSpeed = 3.5;
    static {

    }
    #moving = false;
    constructor(name, avatar, x, y, facing = "down", hasController = false) {
        this.name = name;
        this.avatar = avatar;
        this.hasController = hasController;
        this.sprite = new PIXI.AnimatedSprite(playerSprites[avatar].animations[facing + "1"]);
        this.sprite.texture = this.sprite.textures[1];
        this.sprite.animationSpeed = 0.1;
        this.sprite.loop = false;
        this.sprite.x = x;
        this.sprite.y = y;
        app.stage.addChild(player.sprite);
    }

}
var playerSprites;
var player = {
    avatar: "red",
    sprite: null,
    // sprite: PIXI.Sprite.from('res/characters/blue.gif'),
    target: {
        x: 0,
        y: 0
    },
    speed: walkSpeed,
    moving: false,
    sheet: {},
    animSheet: 2
}

let genericSheetData = {
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
        "image": "res/characters/" + player.avatar + "_walk.png",
        "format": "RGBA8888",
        "size": { "w": 128, "h": 192 },
        "scale": "1"
    }
}
function createSheet(avatar) {
    { frames, genericSheetData
}
async function createPlayer() {
    let w = 32;
    let h = 48;
    playerSprites = new PIXI.Spritesheet(
        PIXI.BaseTexture.from(playerSheetData.meta.image),
        playerSheetData
    );
    await playerSprites.parse();

    player.sprite = new PIXI.AnimatedSprite(playerSprites.animations.walkDown1);
    player.sprite.texture = player.sprite.textures[1];
    player.sprite.animationSpeed = 0.1;
    player.sprite.loop = false;
    app.stage.addChild(player.sprite);
}

function playerMovement() {
    if (!player.moving) {
        if (Input.SHIFT) {
            player.speed = runSpeed;
        } else {
            player.speed = walkSpeed;
        }
        // if player not moving get input
        if (Input.RIGHT) {
            if (player.animSheet == 1) {
                player.animSheet = 2;
                player.sprite.textures = playerSprites.animations.walkRight2;
            } else {
                player.animSheet = 1;
                player.sprite.textures = playerSprites.animations.walkRight1;
            }
            player.sprite.play();
            player.moving = true;
            player.target.x = player.sprite.x + 32;
            player.target.y = player.sprite.y;
        } else if (Input.LEFT) {
            if (player.animSheet == 1) {
                player.animSheet = 2;
                player.sprite.textures = playerSprites.animations.walkLeft2;
            } else {
                player.animSheet = 1;
                player.sprite.textures = playerSprites.animations.walkLeft1;
            }
            player.sprite.play();
            player.moving = true;
            player.target.x = player.sprite.x - 32;
            player.target.y = player.sprite.y;
        } else if (Input.DOWN) {
            if (player.animSheet == 1) {
                player.animSheet = 2;
                player.sprite.textures = playerSprites.animations.walkDown2;
            } else {
                player.animSheet = 1;
                player.sprite.textures = playerSprites.animations.walkDown1;
            }
            player.sprite.play();
            player.moving = true;
            player.target.x = player.sprite.x;
            player.target.y = player.sprite.y + 32;
        } else if (Input.UP) {
            if (player.animSheet == 1) {
                player.animSheet = 2;
                player.sprite.textures = playerSprites.animations.walkUp2;
            } else {
                player.animSheet = 1;
                player.sprite.textures = playerSprites.animations.walkUp1;
            }
            player.sprite.play();
            player.moving = true;
            player.target.x = player.sprite.x;
            player.target.y = player.sprite.y - 32;
        }
    } else {
        // else move player toward target tile
        var distX = player.target.x - player.sprite.x;
        var distY = player.target.y - player.sprite.y;
        var dx = Math.sign(distX) * player.speed;
        var dy = Math.sign(distY) * player.speed;
        if ((!player.idle && (Math.abs(distX) <= player.speed && Math.abs(distY) == 0) || (Math.abs(distY) <= player.speed && Math.abs(distX) == 0)) || player.idleCounter == 0) { // <= or == which one?
            // if (this.parent.idleCounter == 0) {
            //     this.target.x = this.parent.idleX;
            //     this.target.y = this.parent.idleY;
            //     this.pos.x = this.parent.idleX;
            //     this.pos.y = this.parent.idleY;
            //     this.speed = 120 / playerData.FPS;
            //     this.parent.idle = false;
            //     this.parent.idleCounter = 8 * playerData.FPS / 30;
            // } else {
            player.sprite.x = player.target.x;
            player.sprite.y = player.target.y;
            // }
            // if (this.img.cellX % 2 == 1) this.img.shiftX(1);
            player.moving = false;
            // this.canMove = !warpCheck(this.pos.x, this.pos.y);
        } else {
            if (!player.idle) {
                player.sprite.x += dx;
                player.sprite.y += dy;
            } else {
                // if (this.parent.idleCounter == 8 * playerData.FPS / 30) {
                //     playerData.sounds.bump.setVolume(0.1);
                //     playerData.sounds.bump.play();
                // }
                //console.log(this.parent.idle);
                //player.idleCounter--;
            }
        }
    }
}
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
// PIXI.settings.ROUND_PIXELS = true;
var app;
const smoothingFrames = 10; // The number of frames to use for smoothing
let smoothedFrameDuration = 0; // The smoothed frame duration
var graphics = new PIXI.Graphics();
graphics.zIndex = 99999;
var WIDTH = 960, HEIGHT = 540, TILE_SIZE = 32;
var ratio = 1.5; //Math.min(window.innerWidth / WIDTH, (window.innerHeight - 56) / HEIGHT);
var map = {
    width: 60,
    height: 45
};
window.onload = async () => {
    let font = new FontFaceObserver('FireRedRegular', {});
    font.load(null, 30000)
        .then(() => {
            setupGame().then(setupSocket);
        })
        .catch(() => {
            setupGame().then(setupSocket);
        });
}

async function setupGame() {
    // app.resize(Math.ceil(WIDTH * ratio), Math.ceil(HEIGHT * ratio));
    let gameDiv = document.getElementById("game");
    // gameDiv.style.width = WIDTH * ratio + "px";
    // gameDiv.style.height = HEIGHT * ratio + "px";
    app = new PIXI.Application(
        {
            resizeTo: gameDiv,
            powerPreference: "high-performance",
            antialias: true,
            // width: WIDTH * ratio,
            // height: HEIGHT * ratio,
            backgroundColor: 0x000000
        }
    );
    //app.stage.scale.x = app.stage.scale.y = ratio;
    document.body.appendChild(app.view);
    app.stage.sortableChildren = true;
    PIXI.Assets.add('Outside', 'res/data/Outside.json');
    PIXI.Assets.add('wildgrass', 'res/tilesets/wildgrass.png');
    PIXI.Assets.load(['Outside']).then(() => {
        map.tilemap = new PIXI.tilemap.CompositeTilemap();
        map.tilemap.zIndex = -1;
        for (let i = 0; i < map.width; i++) {
            for (let j = 0; j < map.height; j++) {
                map.tilemap.tile('grass' + randomNumber(1, 6), i * 32, j * 32);
            }
        }
        // tilemap.zIndex = 0;
        app.stage.addChild(map.tilemap);
        app.stage.addChild(graphics);
        // player.initializePlayerSpritesheets().then(() => {
        //     new player("player", "may", 0, 0, "right", true);
        //     for (let i = 0; i < map.width; i++) {
        //         for (let j = 0; j < map.height; j++) {
        //             if (randomNumber(1, 150) == 1) {
        //                 let directions = ["left", "down", "right", "up"];
        //                 let avatarName = player.avatars[randomNumber(0, player.avatars.length - 1)];
        //                 let num = randomNumber(1, 3);
        //                 switch (num) {
        //                     case 1:
        //                         avatarName = avatarName.toUpperCase();
        //                         break;
        //                     case 2:
        //                         avatarName = avatarName[0].toUpperCase() + avatarName.substring(1);
        //                         break;
        //                     default:
        //                 }
        //                 new player(avatarName + randomNumber(1, 9999), avatarName.toLowerCase(), i * 32, j * 32, directions[randomNumber(0, 3)]);
        //             }
        //         }
        //     }
        //     app.ticker.add(draw);
        // });
    });
}

function draw(deltaTime) {
    smoothedFrameDuration = (smoothedFrameDuration * (smoothingFrames - 1) + deltaTime) / smoothingFrames;
    graphics.clear();
    for (let name in player.players) {
        player.players[name].step(smoothedFrameDuration, app);
        //Screen.canvas.drawingContext.font = "16px Power Clear";
        //Screen.canvas.drawingContext.textAlign = "center";
        //Screen.canvas.drawingContext.roundRect(plyr.sprite.x - 0.5 * (Screen.canvas.drawingContext.measureText(plyr.name).width + 10) + 16, plyr.sprite.y - 13, Screen.canvas.drawingContext.measureText(plyr.name).width + 10, 16, 4).fill();
        // Screen.canvas.drawingContext.fillStyle = "#FFFFFF";
        // Screen.canvas.drawingContext.fillText(Player.name, Player.pos.x + 16, Player.pos.y);

    }
}

function makeHorizontalSheet(name, source, width, height, scale, horizontal_tiles, vertical_tiles, h_padding = 0, v_padding = 0, createAnimations = true) {
    let sheet_data = {
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

        "animations": {},

        "meta": {
            "image": source,
            "format": "RGBA8888",
            "size": { "w": width, "h": height },
            "scale": scale
        }
    }
    let tile_width = (width - h_padding * (horizontal_tiles - 1)) / horizontal_tiles;
    let tile_height = (height - v_padding * (vertical_tiles - 1)) / vertical_tiles;
    for (let r = 0; r < vertical_tiles; r++) {
        if (createAnimations) {
            sheet_data.animations[name + "_" + r] = [];
        }
        for (let c = 0; c < horizontal_tiles; c++) {
            sheet_data.frames[name + "_" + r + "_" + c] = {
                "frame": { "x": c * (tile_width + h_padding), "y": r * (tile_height + v_padding), "w": tile_width, "h": tile_height },
                "spriteSourceSize": { "x": 0, "y": 0, "w": tile_width, "h": tile_height },
                "sourceSize": { "w": tile_width, "h": tile_height }
            }
            if (createAnimations) {
                sheet_data.animations[name + "_" + r].push(name + "_" + r + "_" + c);
            }
        }

    }
    return sheet_data;
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createNameTag() {
    let obj = new PIXI.Graphics();
    obj.beginFill(0x323232, 0.5);
    drawRoundedRect(x, y, width, height, radius)
}
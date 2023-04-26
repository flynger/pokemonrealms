PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
PIXI.settings.ROUND_PIXELS = true;
//PIXI.settings.RESOLUTION = 1;
PIXI.Container.defaultSortableChildren = true;
var app;
let graphics = new PIXI.Graphics();
graphics.zIndex = 1000;
const gameContainer = new PIXI.Container();
const textContainer = new PIXI.Container();
const smoothingFrames = 15; // The number of frames to use for smoothing
let smoothedFrameDuration = 0; // The smoothed frame duration
var WIDTH = 1184, HEIGHT = 540, TILE_SIZE = 32;
var ratio = Math.min(window.innerWidth / WIDTH, (window.innerHeight - 56) / HEIGHT);
var map = {
    width: 60,
    height: 45
};

var gen5exteriorSheet;

window.onload = async () => {
    // setup promises
    let promises = [];
    let font = new FontFaceObserver('Power Clear', {});
    promises.push(font.load(null, 30000));
    PIXI.Assets.add('gen5exterior', '../res/data/gen5exterior.json');
    PIXI.Assets.add('gen4hgss', '../res/data/gen4hgss.json');
    promises.push(PIXI.Assets.load(['gen4hgss']));
    await Promise.all(promises);
    gen5exteriorSheet = await PIXI.Assets.load('gen5exterior');
    await setupSpritesheets();
    await setupGame();
    setupSocket();
}

window.onresize = () => {
    let gameDiv = document.getElementById("game");
    ratio = Math.min(window.innerWidth / WIDTH, (window.innerHeight - 56) / HEIGHT);
    gameDiv.style.width = WIDTH * ratio + "px";
    gameContainer.scale.x = gameContainer.scale.y = textContainer.scale.x = textContainer.scale.y = ratio;
    for (let name in player.players) {
        player.players[name].renderName();
    }
}

async function setupSpritesheets() {
    await player.initializePlayerSpritesheets();
    // await grass.initializeGrassSpritesheet();
}

async function setupGame() {
    // app.resize(Math.ceil(WIDTH * ratio), Math.ceil(HEIGHT * ratio));
    let gameDiv = document.getElementById("game");
    gameDiv.style.width = WIDTH * ratio + "px";
    app = new PIXI.Application(
        {
            resizeTo: gameDiv,
            autoResize: true,
            powerPreference: "high-performance",
            hello: true,
            antialias: true,
            // resolution: window.devicePixelRatio || 1,
            // width: WIDTH * ratio,
            // height: HEIGHT * ratio,
            backgroundColor: 0x000000
        }
    );
    gameContainer.scale.x = gameContainer.scale.y = textContainer.scale.x = textContainer.scale.y = ratio;
    let colorMatrix = new PIXI.filters.ColorMatrixFilter();
    gameContainer.filters = [colorMatrix];
    colorMatrix.brightness(1);
    // WIDTH = gameDiv.style.width, HEIGHT = gameDiv.style.height, TILE_SIZE = 32;
    // ratio = Math.min(+gameDiv.style.width / WIDTH, +gameDiv.style.height / HEIGHT);
    // app.stage.sortableChildren = true;

    map.tilemap = new PIXI.tilemap.CompositeTilemap();
    map.tilemap.zIndex = -1000;
    for (let i = 0; i < map.width; i++) {
        for (let j = 0; j < map.height; j++) {
            let possibleTiles = ["grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass1", "grass1", "grass1", "grass1", "flowerwhite", "flowerred"];
            map.tilemap.tile(possibleTiles[randomNumber(0, possibleTiles.length - 1)], i * 32, j * 32);

            if ((i + j + 1) % randomNumber(4,10) == 0 || (i >= 2 && i < 16 || i >= 20 && i < 24) && (j >= 2 && j < 12 || j >= 15 && j < 20)) {
                new grass(i * 32, j * 32);
            }
        }
    }

    //map.tilemap.tile('wildgrass', 0, 0, { tileWidth: 16, tileHeight: 16, animX: 1, animY: 0, animCountX: 6, animCountY: 1, animDivisor: 1 });
    gameContainer.addChild(map.tilemap);
    gameContainer.addChild(graphics);
    app.stage.addChild(gameContainer);
    app.stage.addChild(textContainer);
    document.body.appendChild(app.view);
}

function draw(deltaTime) {
    graphics.clear();
    smoothedFrameDuration = (smoothedFrameDuration * (smoothingFrames - 1) + deltaTime) / smoothingFrames;
    for (let name in players) {
        players[name].step(smoothedFrameDuration, app);
    }
    // for (let grss of grass.grasses) {
    //     grss.step();
    // }
    for (let name in player.players) {
        players[name].endFrame();
    }
}

function makeHorizontalSheet(name, source, width, height, scale, horizontal_tiles, vertical_tiles, h_padding = 0, v_padding = 0, createAnimations = true, v_cutoff_bottom = 0, v_cutoff_top = 0) {
    let sheet_data = {
        "frames": {

        },
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
                "frame": { "x": c * (tile_width + h_padding), "y": r * (tile_height + v_padding) + v_cutoff_top, "w": tile_width, "h": tile_height - v_cutoff_top - v_cutoff_bottom },
                // "spriteSourceSize": { "x": 0, "y": 0, "w": tile_width, "h": tile_height - v_cutoff_top - v_cutoff_bottom },
                // "sourceSize": { "w": tile_width, "h": tile_height - v_cutoff_top - v_cutoff_bottom }
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

function collide(ab, bb) {
    // graphics.beginFill(0xFF0000);
    // graphics.drawRect(ab.x, ab.y, ab.width, ab.height);
    // //graphics.drawRect(bb.x, bb.y, bb.width, bb.height);
    // graphics.endFill(0xFF0000);
    return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
}

function collideAbove(ab, bb) {
    graphics.beginFill(0xFF0000);
    graphics.drawRect(ab.x, ab.y, ab.width, ab.height);
    graphics.drawRect(bb.x, bb.y, bb.width, bb.height);
    graphics.endFill(0xFF0000);
    return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y + ab.height <= bb.y + bb.height;
}
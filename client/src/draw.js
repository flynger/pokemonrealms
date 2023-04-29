PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
PIXI.settings.ROUND_PIXELS = true;
//PIXI.settings.RESOLUTION = 1;
PIXI.Container.defaultSortableChildren = true;

var app;
var graphics = new PIXI.Graphics();

graphics.zIndex = 1000;
const gameContainer = new PIXI.Container();
const textContainer = new PIXI.Container();
const smoothingFrames = 15; // The number of frames to use for smoothing
var smoothedFrameDuration = 0; // The smoothed frame duration
const WIDTH = 1184, HEIGHT = 540, TILE_SIZE = 32;
const BATTLE_WIDTH = 631.5;
var ratio = Math.min(window.innerWidth / WIDTH, (window.innerHeight - 56) / HEIGHT);
var map = {
    width: 60,
    height: 45
};
var gen4hgssSheet;
var gen5exteriorSheet;
var kyledoveSheet;

var gameDiv, battleUI;

$(window).on('load', function () {
    $('#message').modal({ backdrop: 'static', keyboard: false });
    $('#message').modal('show');
    $('#message-title').text("Loading...");
    $('#blueModalBtn').hide();
    $('#grayModalBtn').hide();
    // $('#battle-UI').hide();
    setup();
});

// sets the game and UI size
function setGameSize() {
    gameDiv.style.width = WIDTH * ratio + "px";
    battleUI.style.width = BATTLE_WIDTH * ratio + "px";
}

async function setup() {
    // setup promises
    let font = new FontFaceObserver('Power Clear', {});
    $('#message-body').text("Loading fonts...");
    await font.load(null, 30000);
    $('#message-body').text("Loading spritesheets...");
    await setupSpritesheets();
    $('#message-body').text("Setting up game...");
    await setupGame();
    $('#message-body').text("Establishing connection to server...");
    setupSocket();
}

window.onresize = () => {
    ratio = Math.min(window.innerWidth / WIDTH, (window.innerHeight - 56) / HEIGHT);
    setGameSize();
    gameContainer.scale.x = gameContainer.scale.y = textContainer.scale.x = textContainer.scale.y = ratio;
    for (let name in players) {
        players[name].renderName();
    }
}

async function setupSpritesheets() {
    PIXI.Assets.add('particle', '../res/particle.png');
    PIXI.Assets.add('gen4hgss', '../res/data/gen4hgss.json');
    PIXI.Assets.add('gen5exterior', '../res/data/gen5exterior.json');
    PIXI.Assets.add('kyledove', '../res/data/kyledove.json');
    gen4hgssSheet = await PIXI.Assets.load(['gen4hgss']);
    gen5exteriorSheet = await PIXI.Assets.load('gen5exterior');
    kyledoveSheet = await PIXI.Assets.load('kyledove');
    await player.initializePlayerSpritesheets();
    // await grass.initializeGrassSpritesheet();
}

async function setupGame() {
    gameDiv = document.getElementById("game");
    battleUI = document.getElementById("battle-UI");
    setGameSize();
    app = new PIXI.Application(
        {
            resizeTo: gameDiv,
            autoResize: true,
            powerPreference: "high-performance",
            hello: true,
            antialias: true,
            backgroundColor: 0x000000
        }
    );
    gameContainer.scale.x = gameContainer.scale.y = textContainer.scale.x = textContainer.scale.y = ratio;

    let colorMatrix = new PIXI.filters.ColorMatrixFilter();
    gameContainer.filters = [colorMatrix];
    colorMatrix.brightness(1);
    map.tilemap = new PIXI.tilemap.CompositeTilemap();
    map.tilemap.zIndex = -1000;
    for (let i = 0; i < map.width; i++) {
        for (let j = 0; j < map.height; j++) {
            let possibleTiles = ["grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass1", "grass1", "grass1", "grass1", "flowerwhite", "flowerred"];
            map.tilemap.tile(possibleTiles[randomNumber(0, possibleTiles.length - 1)], i * 32, j * 32);

            if ((i + j + 1) % randomNumber(4, 10) == 0 || (i >= 2 && i < 16 || i >= 20 && i < 24) && (j >= 2 && j < 12 || j >= 15 && j < 20)) {
                new grass(i * 32, j * 32);
            } else if (randomNumber(1, 90) == 1) {
                new log(i * 32, j * 32);
            }
        }
    }
    gameContainer.addChild(map.tilemap);
    gameContainer.addChild(graphics);
    app.stage.addChild(gameContainer);
    app.stage.addChild(textContainer);
    // const emitter = new PIXI.particles.Emitter(PIXI.Assets.particle, {
    //     "alpha": {
    //         "start": 0.8,
    //         "end": 0.1
    //     },
    //     "scale": {
    //         "start": 0.5,
    //         "end": 0.1,
    //         "minimumScaleMultiplier": 1
    //     },
    //     "color": {
    //         "start": "#ffffff",
    //         "end": "#ffffff"
    //     },
    //     "speed": {
    //         "start": 200,
    //         "end": 200,
    //         "minimumSpeedMultiplier": 1
    //     },
    //     "acceleration": {
    //         "x": 0,
    //         "y": 0
    //     },
    //     "maxSpeed": 0,
    //     "startRotation": {
    //         "min": 0,
    //         "max": 360
    //     },
    //     "noRotation": false,
    //     "rotationSpeed": {
    //         "min": 0,
    //         "max": 0
    //     },
    //     "lifetime": {
    //         "min": 0.1,
    //         "max": 0.75
    //     },
    //     "blendMode": "normal",
    //     "frequency": 0.005,
    //     "emitterLifetime": -1,
    //     "maxParticles": 1000,
    //     "pos": {
    //         "x": 0,
    //         "y": 0
    //     },
    //     "addAtBack": false,
    //     "spawnType": "circle",
    //     "spawnCircle": {
    //         "x": 0,
    //         "y": 0,
    //         "r": 10
    //     }
    // });

    // // Start emitting particles
    // emitter.emit = true;
}

function draw(deltaTime) {
    graphics.clear();
    smoothedFrameDuration = (smoothedFrameDuration * (smoothingFrames - 1) + deltaTime) / smoothingFrames;
    for (let name in players) {
        players[name].step(smoothedFrameDuration, app);
    }
    for (let name in players) {
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

function collide(ab, bb) {
    graphics.beginFill(0xFF0000);
    graphics.drawRect(ab.x, ab.y, ab.width, ab.height);
    //graphics.drawRect(bb.x, bb.y, bb.width, bb.height);
    graphics.endFill(0xFF0000);
    return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
}

function collideAbove(ab, bb) {
    // graphics.beginFill(0xFF0000);
    // graphics.drawRect(ab.x, ab.y, ab.width, ab.height);
    // graphics.drawRect(bb.x, bb.y, bb.width, bb.height);
    // graphics.endFill(0xFF0000);
    return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y + ab.height <= bb.y + bb.height;
}


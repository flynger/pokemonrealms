PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
PIXI.settings.ROUND_PIXELS = true;
//PIXI.settings.RESOLUTION = 1;
PIXI.Container.defaultSortableChildren = true;

// physics engine
var engine = Matter.Engine.create({
    gravity: {
        scale: 0
    }
    // velocityIterations: 8,
    // positionIterations: 12
});
// var runner = Matter.Runner.create();
// Matter.Runner.run(runner, engine);

// PIXI drawing engine
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

function draw(deltaTime) {
    graphics.clear();
    smoothedFrameDuration = (smoothedFrameDuration * (smoothingFrames - 1) + deltaTime) / smoothingFrames;
    //console.log( { deltaTime, smoothedFrameDuration });
    for (let name in players) {
        players[name].step();
    }
    for (let grss in grasses) {
        grasses[grss].step();
    }
    Matter.Engine.update(engine, 100 / 3 * smoothedFrameDuration);
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
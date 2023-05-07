const WIDTH = 1184, HEIGHT = 540, TILE_SIZE = 32;
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
    $('#pokemon-summary').hide();
    $('#game').hide();
    setup();
});

// sets the game and UI size
function setGameSize() {
    gameDiv.style.width = WIDTH * ratio + "px";
    gameDiv.style.height = HEIGHT * ratio + "px";
    var r = document.querySelector(':root');
    r.style.setProperty('--scale', ratio);
    //$('.battle-button').css({ "--scale": ratio})
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
}

async function setupGame() {
    gameDiv = document.getElementById("game");
    battleUI = document.getElementById("battle-UI");
    setGameSize();
    initializeSummaryUI();
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

    // physics debugging code
    // let render = Matter.Render.create({
    //     element: gameDiv,
    //     engine: engine,
    //     options: {
    //       width: WIDTH,
    //       height: HEIGHT,
    //       wireframes: false,
    //       background: "#fff",
    //       showAngleIndicator: true,
    //     }
    // });
    // Matter.Render.run(render);

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

function loadPlayersAndGame(playersArray) {
    for (let plyr of playersArray) {
        if (plyr.name == username) {
            new player(plyr.displayName, "red", plyr.x, plyr.y, plyr.facing, true).sendLocation();
        }
        else new player(plyr.displayName, "red", plyr.x, plyr.y, plyr.facing);
    }
    app.ticker.add(draw);
    gameDiv.prepend(app.view);
    $('#game').show();
    $('#battle-UI').show();
}
const WIDTH = 1184, HEIGHT = 540, TILE_SIZE = 32;
var ratio;
var vminRatio;
calculateRatios();
var map = {
    name: "",
    submapName: ""
};
var gen4hgssSheet;
var gen5exteriorSheet;
var kyledoveSheet;

var gameDiv, battleUI;
var colorMatrix;

var playerClicked = true;

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
    r.style.setProperty('--vmin-scale', vminRatio);
    //$('.battle-button').css({ "--scale": ratio})
}

async function setup() {
    // setup promises
    let font = new FontFaceObserver('Power Clear', {});
    $('#message-body').text("Loading fonts...");
    await font.load(null, 30000);
    $('#message-body').text("Loading spritesheets and data...");
    await setupSpritesheets();
    await fetch('../res/data/moves.json').then((response) => response.json()).then((json) => Moves = json);
    $('#message-body').text("Setting up game...");
    await setupGame();
    $('#message-body').text("Establishing connection to server...");
    setupSocket();
}

window.onresize = () => {
    calculateRatios();
    setGameSize();
    gameContainer.scale.x = gameContainer.scale.y = textContainer.scale.x = textContainer.scale.y = ratio;
    for (let name in players) {
        players[name].renderName();
    }
    for (let name in npcs) {
        npcs[name].renderName();
    }
}

function calculateRatios() {
    ratio = Math.min(window.innerWidth / WIDTH, (window.innerHeight - 56) / HEIGHT);
    vminRatio = Math.min(window.innerWidth, window.innerHeight) / 937;
}

async function setupSpritesheets() {
    PIXI.Assets.add('particle', '../res/particle.png');
    // PIXI.Assets.add('gen4hgss', '../res/data/gen4hgss.json');
    // PIXI.Assets.add('gen5exterior', '../res/data/gen5exterior.json');
    // PIXI.Assets.add('kyledove', new tileset('../res/data/kyledove.json'));
    // gen4hgssSheet = await PIXI.Assets.load(['gen4hgss']);
    // gen5exteriorSheet = await PIXI.Assets.load('gen5exterior');
    // kyledoveSheet = await PIXI.Assets.load('kyledove');
    await player.initializePlayerSpritesheets();
    await initializeTileSpritesheets();
}

async function setupGame() {
    gameDiv = document.getElementById("game");
    battleUI = document.getElementById("battle-UI");
    setGameSize();
    initSummaryUI();
    initInventoryUI();
    initPartyUI();
    app = new PIXI.Application(
        {
            resizeTo: gameDiv,
            powerPreference: "high-performance",
            hello: true,
            antialias: true,
            backgroundColor: 0x000000
        }
    );
    // console.log(app.renderer);
    // const renderer = app.renderer;

    // const interactionManager = renderer.plugins.interaction;
    // interactionManager.on("click", onClick);
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

    colorMatrix = new PIXI.filters.ColorMatrixFilter();
    gameContainer.filters = [colorMatrix];
    // colorMatrix.brightness(1.4, true);
    // colorMatrix.tint(0xFFBB66, true);
    // let interactionManager = new PIXI.interaction.InteractionManager(app.renderer);

    // renderer.plugins.interaction.on("mousedown", checkForClick);
    // renderer.plugins.interaction.on("mousedown", checkForClick);
    app.stage.interactive = true;
    app.stage.on("pointerdown", () => {
        if (!playerClicked) $('#player-context-menu').hide();
    });
    app.stage.on("pointerup", () => {
        playerClicked = false;
    });
    PIXI.sound.add('Route 1', '../res/audio/maps/Route 1.mp3');
    PIXI.sound.add('Pallet Town', '../res/audio/maps/Pallet Town.mp3');
    app.ticker.add(draw);
    $('#game').show();
}

async function loadMap(mapName, submapName, collideables, grasses) {
    // load map
    map.name = mapName;
    map.submapName = submapName;
    $("#mapName").html(map.name);
    $("#submapName").html(map.submapName);
    await fetch(`../res/maps/${mapName}/${submapName}.json`).then((response) => response.json()).then((json) =>  {
        map.width = json.width / 32;
        map.height = json.height / 32;
        for (let layerIndex in json.layers) {
            let layer = json.layers[layerIndex];
            for (let data of layer) {
                new tile(data.x, data.y, data.img.tileset, data.img.x, data.img.y, layerIndex, data.offset);
            }
        }
        // PIXI.sound.play(json.music);
    });
    for (let collideable of collideables) {
        new collider(collideable.x, collideable.y, 32, 32);
    }
    for (let grss of grasses) {
        new grass(grss.x, grss.y);
    }
    gameContainer.addChild(graphics);
    app.stage.addChild(gameContainer);
    app.stage.addChild(textContainer);
}

function destroyMap() {
    Matter.Composite.clear(engine.world);
    for (let tle of tiles) {
        tle.destroy();
    }
    tiles = [];
    colliders = {};
    grasses = {};
}

function loadPlayers(playersArray) {
    for (let plyr of playersArray) {
        if (plyr.displayName == username) {
            new player(plyr.displayName, "red", plyr.x, plyr.y, plyr.facing, true);
        }
        else new player(plyr.displayName, "red", plyr.x, plyr.y, plyr.facing);
    }
}

function onClick(event) {
    console.log("CLICKED");
    if (event.type === "mousedown") {
        // Get the mouse position relative to the renderer
        const mousePosition = event.data.getLocalPosition(renderer.view);

        // Loop through all the players
        for (const playerName in players) {
            const currentPlayer = players[playerName];
            const playerSprite = currentPlayer.headSprite;

            // Check if the mouse position is within the bounds of the player sprite
            if (
                mousePosition.x >= playerSprite.x &&
                mousePosition.x <= playerSprite.x + playerSprite.width &&
                mousePosition.y >= playerSprite.y &&
                mousePosition.y <= playerSprite.y + playerSprite.height
            ) {
                // Perform the desired action when the player is clicked
                console.log(`Clicked on player: ${currentPlayer.name}`);
                // Add your code here to handle the click event
            }
        }
    }
}

const WIDTH = 1184, HEIGHT = 540, TILE_SIZE = 32;
var ratio;
var vminRatio;
calculateRatios();
var map = {
    name: "Route 1",
    submapName: "Area 1",
    width: 60,
    height: 45
};
var gen4hgssSheet;
var gen5exteriorSheet;
var kyledoveSheet;

var gameDiv, battleUI;
var colorMatrix;

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
    initSummaryUI();
    initInventoryUI();
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

    // map initialization
    $("#mapName").html(map.name);
    $("#submapName").html(map.submapName);
    map.tilemap = new PIXI.tilemap.CompositeTilemap();
    map.tilemap.zIndex = -1000;
    for (let i = 0; i < map.width; i++) {
        for (let j = 0; j < map.height; j++) {
            let possibleTiles = ["grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass1", "grass1", "grass1", "grass1", "flowerwhite", "flowerred"];
            map.tilemap.tile(possibleTiles[randomNumber(0, possibleTiles.length - 1)], i * 32, j * 32);

            if (/*(i + j + 1) % randomNumber(4, 10) == 0 || */(i >= 2 && i < 16 || i >= 20 && i < 24) && (j >= 2 && j < 12 || j >= 15 && j < 20)) {
                new grass(i * 32, j * 32);
            } else if (randomNumber(1, 900) == 1) {
                new npc("Professor Oak" + randomNumber(1, 9999), "oak", i * 32, j * 32 - 2)
            }
        }
    }
    gameContainer.addChild(map.tilemap);
    gameContainer.addChild(graphics);
    app.stage.addChild(gameContainer);
    app.stage.addChild(textContainer);
    // let interactionManager = new PIXI.interaction.InteractionManager(app.renderer);

    // // renderer.plugins.interaction.on("mousedown", checkForClick);
    // // renderer.plugins.interaction.on("mousedown", checkForClick);
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

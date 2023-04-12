PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
window.onload = async () => {
    //app.resizeTo = window;
    // PIXI.Assets.add("red", "res/characters/red_walk.png");
    //const textures = await PIXI.Assets.load([]).then((e) => {
    player.initializePlayerSpritesheets().then(() => {
        let WIDTH = 960;
        let HEIGHT = 540;
        let ratio = 1.5; // Math.min(window.innerWidth / WIDTH, (window.innerHeight - 56) / HEIGHT);
        // PIXI.settings.ROUND_PIXELS = true;
        app = new PIXI.Application(
            {
                powerPreference: "high-performance",
                width: WIDTH * ratio,
                height: HEIGHT * ratio,
                backgroundColor: 0x55BB55
            }
        );
        app.stage.scale.x = app.stage.scale.y = ratio;
        // app.resize(Math.ceil(WIDTH * ratio), Math.ceil(HEIGHT * ratio));
        app.stage.sortableChildren = true;
        thisPlayer = new player("player", "red", 256, 150, "right", true, app);
        otherGuy = new player("otherplayer", "red", 356, 150);
        app.stage.addChild(thisPlayer.sprite);
        app.stage.addChild(otherGuy.sprite);
        app.ticker.add((delta) => {
            thisPlayer.step(delta, app);
            otherGuy.step(delta, app);
        });
        document.body.appendChild(app.view);
    });
    //});

    function draw(delta) {

    }
}

function makeHorizontalSheet(name, source, width, height, scale, horizontal_tiles, vertical_tiles, h_padding = 0, v_padding = 0, createAnimations=true) {
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
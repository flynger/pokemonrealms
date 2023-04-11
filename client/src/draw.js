window.onload = async () => {
    const app = new PIXI.Application(
        {
            width: 1920,
            height: 800,
            backgroundColor: 0x008800
        }
    );
    //app.resizeTo = window;
    // PIXI.Assets.add("red", "res/characters/red_walk.png");
    // PIXI.Assets.add("red_run", "res/characters/red_run.png");
    // PIXI.Assets.add("blue", "res/characters/blue_walk.png");
    // PIXI.Assets.add("blue", "res/characters/blue_run.png");
    // PIXI.Assets.add("red", "res/characters/red_walk.png");
    // PIXI.Assets.add("blue", "res/characters/blue_walk.png");
    //const textures = await PIXI.Assets.load([]).then((e) => {
    player.initializePlayerSpritesheets().then(() => {
        app.stage.sortableChildren = true;
        thisPlayer = new player("player", "red", 200, 150, "right", true);
        otherGuy = new player("otherplayer", "blue", 600, 150);
        thisPlayer.sprite.zIndex = 1;
        app.stage.addChild(otherGuy.sprite);
        app.stage.addChild(thisPlayer.sprite);            
        app.ticker.add((delta) => {
            thisPlayer.step(delta);
            otherGuy.step(delta);
        });
        document.body.appendChild(app.view);
    });
    //});

    function draw(delta) {

    }
}

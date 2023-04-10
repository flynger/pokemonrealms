window.onload = async () => {
    const app = new PIXI.Application(
        {
            width: 640,
            height: 360,
            backgroundColor: 0x333333
        }
    );
    PIXI.Assets.add("red", "res/characters/red_walk.png");
    PIXI.Assets.add("red_run", "res/characters/red_run.png");
    PIXI.Assets.add("blue", "res/characters/blue_walk.png");
    // PIXI.Assets.add("red", "res/characters/red_walk.png");
    // PIXI.Assets.add("blue", "res/characters/blue_walk.png");
    const textures = await PIXI.Assets.load(['red', 'blue']).then((e) => {
        player.initializePlayerSpritesheets().then(() => {
            thisPlayer = new player("player", "red", 200, 150, "right", true);
            app.stage.addChild(thisPlayer.sprite);
            app.ticker.add((delta) => {
                thisPlayer.step(delta);
            });
            document.body.appendChild(app.view);
        })
    });

    function draw(delta) {

    }
}

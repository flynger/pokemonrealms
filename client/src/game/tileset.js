/*
Alex G, flynger, Richard W, Harry

This file implements tileset functionality 
*/
let tilesetList = ["kyledove", "gen4hgss_1", "gen4hgss_2", "wilsonscarloxy_outdoor", "wilsonscarloxy_indoor"];
var tilesets = {};
async function initializeTileSpritesheets() {
    for (let tilesetName of tilesetList) {
        await fetch(`../res/data/${tilesetName}.json`).then((response) => response.json()).then(async (json) => {
            for (let i = 0; i < json.meta.size.w / 32; i++) {
                for (let j = 0; j < json.meta.size.h / 32; j++) {
                    json.frames[tilesetName + [i, j]] = {
                        frame: {
                            x: i * 32,
                            y: j * 32,
                            w: 32,
                            h: 32
                        }
                    }
                    // json.animations[[i, j]] = [[i, j]];
                }
            }
            this.tilesets[tilesetName] = new PIXI.Spritesheet(
                PIXI.BaseTexture.from(json.meta.image),
                json
            );
            await this.tilesets[tilesetName].parse();
        });
    }
}
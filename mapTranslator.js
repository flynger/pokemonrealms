/*
Alex Ge, Arnav Singh, Richard Wei, Will Gannon, Harry Liu

This file converts raw tiled map to .json game maps.
*/
import jsonfile from "jsonfile";
var mainMap = "Ballet Town";
var submap = "Town";
var rawMap = jsonfile.readFileSync('./data/rawMaps/cities/' + mainMap + ' ' + submap + '.json');
var map = {
    width: rawMap.width,
    height: rawMap.height,
    collideables: [],
    grass: [],
    ledges: [],
    warpTiles: [],
    entities: [],
    water: []
};
var clientMap = {
    music: "Route 1",
    width: rawMap.width * 32,
    height: rawMap.height * 32,
    layers: []
};
var tilesets = {};
var tiles = [];
for (let tileset of rawMap.tilesets) {
    tileset.source = tileset.source.replace("..\/..\/tilesets\/", "").replace(".json", "");
    tilesets[tileset.source] = jsonfile.readFileSync('./data/tilesets/' + tileset.source + '.json');
    tilesets[tileset.source].firstgid = tileset.firstgid;
    for (let tile of tilesets[tileset.source].tiles) {
        for (let i in tile.properties) {
            let property = tile.properties[i];
            if (!tiles[tile.id + tileset.firstgid]) tiles[tile.id + tileset.firstgid] = {};
            tiles[tile.id + tileset.firstgid][property.name] = property.value;
        }
    }
}
for (let layer of rawMap.layers) {
    if (!clientMap.layers[layer.id - 1]) clientMap.layers[layer.id - 1] = [];
    for (let i in layer.data) {
        var thisLayer = clientMap.layers[layer.id - 1];
        var tile = layer.data[i];
        if (tile === 0)
            continue;
        var tileData = {
            x: 32 * (i % layer.width),
            y: 32 * Math.floor(i / layer.width)
        }
        //console.log("Tile " + tile + " at x " + tileData.x + ", y " + tileData.y);
        if (tiles[tile]) {
            console.log("Tile " + tile + " at x " + tileData.x + ", y " + tileData.y);
            if (tiles[tile].isCollideable) {
                map.collideables.push(tileData);
            } if (tiles[tile].isGrass) {
                map.grass.push(tileData);
            } if (tiles[tile].isWater) {
                map.water.push(tileData);
            } if (tiles[tile].isWarpTile) {
                tileData.destination = { 
                    map: "",
                    submap: "",
                    x: 0,
                    y: 0,
                    facing: ""
                };
                map.warpTiles.push(tileData);
            }
            // if (tiles[tile].ledge) {
            //     tileData.direction = tiles[tile].ledge;
            //     map.ledges.push(tileData);
            // } if (tiles[tile].item) {
            //     tileData.item = "random";
            //     map.entities.push(tileData);
            // }
        }
        var clientData = {
            x: i % layer.width * 32,
            y: Math.floor(i / layer.width) * 32,
            img: {
                tileset: getTileset(tile),
            }
        }
        if (tiles[tile] && tiles[tile].offset) clientData.offset = tiles[tile].offset;
        clientData.img.x = (tile - tilesets[clientData.img.tileset].firstgid) % tilesets[clientData.img.tileset].columns;
        clientData.img.y = Math.floor((tile - tilesets[clientData.img.tileset].firstgid) / tilesets[clientData.img.tileset].columns)
        if (tiles[tile] && 'layer' in tiles[tile]) {
            if (!clientMap.layers[tiles[tile].layer]) clientMap.layers[tiles[tile].layer] = [];
            thisLayer = clientMap.layers[tiles[tile].layer];
        }
        thisLayer.push(clientData);
    }
}
jsonfile.writeFileSync('./data/maps/' + mainMap + '/' + submap + '.json', map);
jsonfile.writeFileSync('./client/res/maps/' + mainMap + '/' + submap + '.json', clientMap);
//console.log(tiles);

function getTileset(tile) {
    var previousTileset;
    for (var tileset in tilesets) {
        if (tile >= tilesets[tileset].firstgid) {
            previousTileset = tilesets[tileset].name;
            continue;
        }
        break;
    }
    return previousTileset;
}
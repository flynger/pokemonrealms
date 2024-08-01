/*
Alex G, flynger, Richard W, Harry

This file converts raw tiled map to .json game maps.
*/
import jsonfile from "jsonfile";
const mainMap = "Ranch";
const submap = "Ranch";
const tiledMap = jsonfile.readFileSync(`../tiled/maps/${mainMap}/${submap}.json`);

const tilesets = {};
const tiles = [];
for (const tileset of tiledMap.tilesets) {
    const tilesetName = tileset.source.replace("..\/..\/tilesets\/", "").replace(".json", "");

    const tiledTileset = jsonfile.readFileSync(`../tiled/tilesets/${tilesetName}.json`);
    tilesets[tilesetName] = {
        tiles: {},
        firstgid: tileset.firstgid
    }

    for (const tile of tiledTileset.tiles) {
        if (!tile.properties && !tile.objectgroup) continue;

        tilesets[tilesetName].tiles[tile.id] = {};
        if (tile.properties)
            for (const property of tile.properties) {
                tilesets[tilesetName].tiles[tile.id][property.name] = property.value;
            }
        if (tile.objectgroup)
            for (const object of tile.objectgroup.objects) {
                const { x, y, width, height } = object;
                tilesets[tilesetName].tiles[tile.id][object.name] = { x, y, width, height };
            }
    }

    jsonfile.writeFileSync(`../client/public/maps/tilesets/${tilesetName}.json`, tilesets[tilesetName].tiles);
}

const clientMap = {
    width: tiledMap.width * 32,
    height: tiledMap.height * 32,
    layers: tiledMap.layers.map(
        layer => layer.data.map(tileId => {
            if (tileId) {
                const tileset = getTileset(tileId);
                const id = tileId - tilesets[tileset].firstgid;
                return { [tileset]: id };
            } else return null;
        })
    )
}
jsonfile.writeFileSync('../client/public/maps/' + mainMap + '/' + submap + '.json', clientMap);
// jsonfile.writeFileSync('./server/maps/' + mainMap + '/' + submap + '.json', map);

function getTileset(tile) {
    let previousTileset;
    for (const tileset in tilesets) {
        const tilesetData = tilesets[tileset];
        if (tile < tilesetData.firstgid) return previousTileset;
        previousTileset = tileset;
    }
    return previousTileset;
}
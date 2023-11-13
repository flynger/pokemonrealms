/*
Alex G, flynger, Richard W, Harry

This file implements map functionality 
*/
import jsonfile from "jsonfile";
import Pokemon from "./pokemon.js";
import Pokedex from "./pokedex.js";
import { existsSync } from 'fs';

class WarpTile {
    constructor(x, y, destination, width = 32, height = 32) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.destination = destination;
    }
    isPlayerInside(player) {
        const { x, y } = player.getLocation();
        return x + 8 >= this.x && x + 24 <= this.x + this.width && y + 16 + 6 >= this.y && y + 36 - 6 <= this.y + this.height;
    }
}

export default class Map {
    static maps = {
        "Route 1": ["Area 1", "Area 2"],
        "Ballet Town": ["Town", "Player House 1F", "Player House 2F", "Lab", "Outskirts"]
    };
    static {
        for (let mapName in this.maps) {
            let submapList = this.maps[mapName];
            this.maps[mapName] = {};
            for (let submapName of submapList) {
                let mapData = jsonfile.readFileSync(`./data/maps/${mapName}/${submapName}.json`);
                let encounterData = { grass: { morning: [], day: [], night: [], frequency: [] } };
                if (existsSync(`./data/encounters/${mapName}/${submapName}.json`))
                    encounterData = jsonfile.readFileSync(`./data/encounters/${mapName}/${submapName}.json`);
                this.maps[mapName][submapName] = new Map(mapName, submapName, mapData, encounterData);
            }
        }
        // console.log(this.maps);
    }
    static getMap(mapName, submapName) {
        return this.maps[mapName][submapName];
    }
    static times = ["morning", "day", "night"];
    static time = "day";

    static updateTime(time) {
        if (time >= 600 && time < 1200) {
            this.time = "morning";
        } else if (time >= 1200 && time < 1800) {
            this.time = "day";
        } else {
            this.time = "night";
        }
    }

    constructor(mapName, submapName, data, encounterData) {
        this.mapName = mapName;
        this.submapName = submapName;
        this.room = mapName + ": " + submapName;
        this.data = data;
        this.collideables = data.collideables;
        this.grass = data.grass;
        this.water = data.water;
        this.encounters = encounterData;
        this.warpTiles = [];
        this.players = [];
        for (const warpTile of data.warpTiles) {
            this.warpTiles.push(new WarpTile(warpTile.x, warpTile.y, warpTile.destination, warpTile.width, warpTile.height));
        }
    }

    removePlayer(player) {
        this.players.splice(this.players.indexOf(player), 1);
        player.socket.leave(this.room);
        player.socket.to(this.room).emit("playerDisconnect", player.displayName);
    }

    addPlayer(player, { x, y, facing }) {
        this.players.push(player);
        player.socket.join(this.room);
        player.setLocation({ x, y, facing, map: this.mapName, submap: this.submapName });
        player.socket.emit("mapData", player.displayName, this.players.map(player => player.getMapData()), { map: this.mapName, submap: this.submapName }, this.collideables, this.grass, this.water);
        player.socket.to(this.room).emit("playerMovement", { name: player.displayName, x, y, facing, currentFrame: 0 });
    }

    updatePlayerLocation(player, { x, y, facing }) {
        player.setLocation({ x, y, facing });
        let warpDestination = this.warpCheck(player);
        if (warpDestination) {
            this.removePlayer(player);
            if (!warpDestination.map) warpDestination.map = player.location.map;
            Map.getMap(warpDestination.map, warpDestination.submap).addPlayer(player, warpDestination);
        } else {
            player.socket.to(this.room).emit("playerMovement", { name: player.displayName, x, y, facing });
        }
    }

    grassCheck() {
        return randomNumber(1, this.encounters.grass.frequency) == 1;
    }

    warpCheck(player) {
        for (let warpTile of this.warpTiles) {
            if (warpTile.isPlayerInside(player)) {
                return warpTile.destination;
            }
        }
        return false;
    }

    // getTotalWeight(encounters) {
    //     let weight = 0;
    //     for (let encounter of encounters) {
    //         weight += encounter.weight;
    //     }
    //     return weight;
    // }

    createEncounter() {
        let encounterPool = this.encounters.grass[Map.time];
        // let encounterWeight = this.getTotalWeight(encounterPool);
        let rng = Math.random(); // Math.floor(Math.random() * encounterWeight) + 1;
        let counter = 0;
        for (let encounter of encounterPool) {
            counter += encounter.chance;
            if (counter >= rng) {
                let species = "RATTATA";
                let rng2 = randomNumber(1, 649);
                for (let mon in Pokedex) {
                    if (rng2 == Pokedex[mon].id) {
                        species = mon;
                        break;
                    }
                }
                let level = randomNumber(40, 50); // randomNumber(encounter.minLevel || this.encounters.grass.minLevel, encounter.maxLevel || this.encounters.grass.maxLevel);
                let randomEncounter = new Pokemon(species, level, { moves: ["TAUNT"] });
                // console.log(randomEncounter);
                return randomEncounter;
            }
        }
    }
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
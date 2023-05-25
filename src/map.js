import jsonfile from "jsonfile";
import Pokemon from "./pokemon.js";

export default class Map {
    static maps = {
        "Route 1": ["Area 1"]
    };
    static {
        for (let mapName in this.maps) {
            let submapList = this.maps[mapName];
            this.maps[mapName] = {};
            for (let submapName of submapList) {
                let mapData = jsonfile.readFileSync(`./data/maps/${mapName}/${submapName}.json`);
                this.maps[mapName][submapName] = new Map(mapData);
                
                console.log(this.maps)
            }
        }
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

    constructor(data) {
        this.data = data;
        this.collideables = data.collideables;
        this.grass = data.grass;
        this.water = data.water;
        this.encounters = data.encounters;
    }

    grassCheck() {
        return randomNumber(1, this.encounters.grass.frequency) == 1;
    }

    getTotalWeight(encounters) {
        let weight = 0;
        for (let encounter of encounters) {
            weight += encounter.weight;
        }
        return weight;
    }

    createEncounter() {
        let encounterPool = this.encounters.grass[Map.time];
        let encounterWeight = this.getTotalWeight(encounterPool);
        let rng = Math.floor(Math.random() * encounterWeight) + 1;
        let counter = 0;
        for (let encounter of encounterPool) {
            counter += encounter.weight;
            if (counter >= rng) {
                let randomEncounter = new Pokemon(encounter.species, randomNumber(encounter.minLevel, encounter.maxLevel), {});
                console.log(randomEncounter);
                return randomEncounter;
            }
        }
    }
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
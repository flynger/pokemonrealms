import Pokemon from "./pokemon";

export default class Map {
    constructor(encounters, encounterRate =  1 / 8) {
        this.encounters;
        this.encounterRate = encounterRate;
    }

    grassCheck() {
        var num = randomNumber(1, this.encounters.grass.frequency);
        return num == 1;
    }

    getTotalWeight() {
        let weight = 0;
        for (encounter of this.encounters) {
            weight += encounter.weight;
        }
        return weight;
    }

    createEncounter() {
        let encounterWeight = this.getTotalWeight(this.encounters);
        let rng = Math.floor(Math.random() * encounterWeight) + 1;
        let counter = 0;
        for (encounter of this.encounters) {
            counter += encounter.weight;
            if (counter >= rng) {
                let randomEncounter = new Pokemon(encounter.species, "", "?", "?", randomNumber(encounter.minLevel, encounter.maxLevel), "", "Serious", abilitySlot, ivs, evs, moves);
                console.log(randomEncounter);
                return randomEncounter;
            }
        }
    }
}
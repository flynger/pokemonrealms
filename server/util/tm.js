import jsonfile from "jsonfile";

class TM {
    static id = 0;

    constructor(move, rarity) {
        TM.id++;

        let idString = TM.id + "";
        while (idString.length < 3) {
            idString = "0" + idString;
        }

        this.category = "TMs";
        this.num = TM.id;
        this.name = "TM" + idString;
        this.id = "tm" + idString;
        this.rarity = rarity;
        this.canBeHeld = true;
        this.isUsable = true;
        this.isUsableOnPokemon = true;
        this.containsMove = move;
    }
}

const TMs = [];
export const TMsByRarity = {};
const TMData = jsonfile.readFileSync("tms.json");

for (const type in TMData) {
    const data = TMData[type];
    for (const rarity in data) {
        if (!(rarity in TMsByRarity)) TMsByRarity[rarity] = [];
        const moves = data[rarity];
        for (const i in moves) {
            const move = moves[i];
            const tm = new TM(move, rarity);
            TMs.push(tm);
            TMsByRarity[rarity].push(tm);
        }
    }
}

export default TMs;
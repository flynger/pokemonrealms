import Pokemon from "pokemon";
import Battle, { BattleConfig } from "./battle";

export default class SingleBattle extends Battle {
    constructor(side1: Pokemon[], side2: Pokemon[], config?: BattleConfig) {
        super([[side1], [side2]], config);
    }
}
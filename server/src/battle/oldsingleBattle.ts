import Pokemon from "pokemon";
import Battle, { BattleConfig } from "./oldBattle";
import BattleParty from "./battleParty";

export default class SingleBattle extends Battle {
    constructor(side1: BattleParty, side2: BattleParty, config?: BattleConfig) {
        super([[side1], [side2]], config);
    }
}
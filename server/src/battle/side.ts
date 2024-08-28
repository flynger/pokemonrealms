import Pokemon from "pokemon";
import Battle from "./battle";
import BattleParty, { InputKind } from "./battleParty";
import BattleSpot from "./battleSpot";

/* Every side of parties is represent as a Side */
export default class Side {
    parties: BattleParty[];
    battle: Battle;

    constructor(battle: Battle, parties: Pokemon[][], spotsPerParty: number) {
        this.battle = battle;
        this.parties = parties.map(party => new BattleParty(battle, party, spotsPerParty));
    }

    askForInput(input: Set<InputKind>) {
        for (const party of this.parties) {
            party.askForInput(input);
        }
    }

    isAlive(): boolean {
        return this.parties.some(party => party.spots.some(spot => spot.mon));
    }

    getAliveSpots(): BattleSpot[] {
        return this.parties.map(party => party.spots.filter(spot => spot.mon)).flat()   ;
    }
}
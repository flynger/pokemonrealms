import Pokemon from "pokemon";
import Battle from "./battle";
import BattleParty, { InputKind } from "./battleParty";
import BattleSpot from "./battleSpot";

/* Every side of parties is represent as a Side */
export default class Side {
    battle: Battle;
    parties: BattleParty[];

    get active(): Pokemon[] {
        return this.parties.map(p => p.active).flat();
    }

    constructor(battle: Battle, parties: BattleParty[], monsPerParty: number) {
        this.battle = battle;
        this.parties = parties;

        for (const party of parties) {
            party.joinBattle(this.battle, monsPerParty);
        }
    }

    isAlive(): boolean {
        return this.active.some(mon => mon);
    }

    getAliveMons(): Pokemon[] {
        return this.active.filter(mon => mon);
    }
}
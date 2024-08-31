import Pokemon from "pokemon";
import Battle from "./battle";
import BattleParty, { InputKind } from "./battleParty";
import BattleSpot from "./battleSpot";

/* Every side of parties is represent as a Side */
export default class Side {
    parties: BattleParty[];
    spots: BattleSpot[] = [];
    battle: Battle;

    constructor(battle: Battle, parties: BattleParty[], spotsPerParty: number) {
        this.battle = battle;
        this.parties = parties;
        for (const party of parties) {
            const partySpots = new Array(spotsPerParty).fill(0).map((_, i) => new BattleSpot(battle, party, party.members[i]));
            party.setBattle(this.battle, partySpots);
            this.spots.push(...partySpots);
        }
        // this.parties = parties.map(party => new BattleParty(battle, party, spotsPerParty));
    }

    isAlive(): boolean {
        return this.spots.some(spot => spot.mon);
    }

    getAliveSpots(): BattleSpot[] {
        return this.spots.filter(spot => spot.mon);
    }
}
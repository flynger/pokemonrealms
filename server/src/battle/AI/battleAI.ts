import BattleParty from "battle/battleParty";

export default class BattleAI {
    party: BattleParty;
    name: string;

    constructor(party: BattleParty, name: string = "") {
        this.party = party;
        this.name = name;
    }

    getTurnInput() {
        const spotsRequiringInput = this.party.active.filter(mon => !spot.turnInput);
        if (spotsRequiringInput.length === 0) return;

        for (const spot of spotsRequiringInput) {
            const moves = spot.mon!.moves;
            spot.takeInput({ kind: "move", id: 0 });
        }
    }
}
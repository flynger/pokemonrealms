import BattleParty from "battle/battleParty";

export default class BattleAI {
    constructor(public party: BattleParty, public name: string = "") {}

    getTurnInput() {
        const spotsRequiringInput = this.party.spots!.filter(spot => !spot.turnInput);
        if (spotsRequiringInput.length === 0) return;

        for (const spot of spotsRequiringInput) {
            const moves = spot.mon!.moves;
            spot.takeInput({ kind: "move", id: 0 });
        }
    }
}
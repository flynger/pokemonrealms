export default class BattleAI {
    constructor(party) {
        this.party = party;
        this.battle = null;
        this.options = null;
    }
    setBattle(battle) {
        this.battle = battle;
    }
    setOptions(options) {
        this.options = options;
    }
    chooseAction() {
        if (this.options.wait) return;
        let validMoves = this.options.active[0].moves.filter(move => !move.disabled);
        this.party.useMove(validMoves.random().id);
    }
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
import SingleBattle from "./singleBattle.js";
import Party from "./party.js";

export default class WildEncounter extends SingleBattle {
    text = {
        fullName: "[NICKNAME]",
        opposingPokemon: "the wild [NICKNAME]",
        switchIn: "A wild [NICKNAME] appeared!",
        turn: " ",
        startBattle: " ",
        endBattle: "Successfully ran away from the battle!"
    }
    
    constructor(player, encounter) {
        super(new Party("Wild Pokemon", [encounter], false), new Party(player.displayName, player.party), true);
        this.player = player;
        this.encounter = encounter;
    }

    useMove(partyName, moveNumber) {
        super.useMove(partyName, moveNumber)
        this.stream.write(`>p1 move 1`);
    }

    run() {
        this.endBattle();
    }
}
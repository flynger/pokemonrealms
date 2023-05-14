import SingleBattle from "./singleBattle.js";
import Party from "./party.js";

export default class WildEncounter extends SingleBattle {
    text = {
        fullName: "[NICKNAME]",
        opposingPokemon: "the wild [NICKNAME]",
        switchIn: "A wild [NICKNAME] appeared!",
        turn: " ",
        startBattle: " ",
        winBattle: "[TRAINER] defeated the wild Pokémon and gained exp!",
        loseBattle: "[TRAINER] is out of usable Pokémon! [TRAINER] whited out.",
        tieBattle: "[TRAINER] is out of usable Pokémon! [TRAINER] whited out.",
        endBattle: "[TRAINER] escaped the battle!"
    }
    
    constructor(player, encounter) {
        super(new Party("Wild Pokémon", [encounter], false), new Party(player.displayName, player.party), true);
        this.player = player;
        this.encounter = encounter;
    }

    useMove(partyName, moveNumber) {
        super.useMove(partyName, moveNumber)
        this.stream.write(`>p1 move 1`);
    }

    run() {
        this.destroy();
    }
}
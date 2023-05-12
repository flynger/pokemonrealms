import SingleBattle from "./singleBattle.js";
import Party from "./party.js";

export default class WildEncounter extends SingleBattle {
    text = {
        opposingPokemon: "the wild [NICKNAME]",
        switchIn: "A wild [NICKNAME] appeared!",
        endBattle: "Successfully ran away from the battle!"
    }
    
    constructor(player, encounter) {
        super(new Party("Wild Pokemon", [encounter], false), new Party(player.displayName, player.party), true);
        this.player = player;
        this.encounter = encounter;
    }

    run() {
        this.endBattle();
    }
}
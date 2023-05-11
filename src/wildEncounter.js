import SingleBattle from "./singleBattle.js";
import Party from "./party.js";

export default class WildEncounter extends SingleBattle {
    text = {
        opposingPokemon: "the wild [NICKNAME]"
    }
    constructor(player, encounter) {
        super(new Party(player.displayName, player.party), new Party("Wild Pokemon", [encounter], false), true);
        this.player = player;
        this.encounter = encounter;
    }

    getBattle() {
        return this.battle;
    }
}
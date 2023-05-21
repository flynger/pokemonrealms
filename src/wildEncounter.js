import SingleBattle from "./singleBattle.js";
import Party from "./party.js";

export default class WildEncounter extends SingleBattle {
    text = {
        fullName: "[NICKNAME]",
        opposingPokemon: "the wild [NICKNAME]",
        switchIn: "A wild [NICKNAME] appeared!",
        turn: " ",
        startBattle: " ",
        winBattle: "[TRAINER] defeated the wild Pokémon!",
        loseBattle: "[TRAINER] is out of usable Pokémon! [TRAINER] whited out.",
        tieBattle: "[TRAINER] is out of usable Pokémon! [TRAINER] whited out.",
        endBattle: "[TRAINER] escaped the battle!"
    }
    
    constructor(player, encounter) {
        super(new Party(1, "Wild Pokémon", [encounter], false), new Party(2, player.displayName, player.party), true);
        this.player = player;
        this.encounter = encounter;
        this.playerParty = this.player2;
        this.encounterParty = this.player1;
        this.encounterParty.AI.setBattle(this);
    }

    useMove(partyName, moveInput) {
        this.playerParty.useMove(moveInput);
        this.encounterParty.AI.chooseAction();
    }

    switchTo(partyName, switchInput) {
        this.playerParty.switchTo(switchInput);
        this.encounterParty.AI.chooseAction();
    }

    useItem(partyName, itemInput) {
        this.playerParty.useItem();
        this.encounterParty.AI.chooseAction();
    }

    run() {
        this.destroy();
    }
}
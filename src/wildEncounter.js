import SingleBattle from "./singleBattle.js";
import Party from "./party.js";
import { ItemData } from "./pokedex.js";

export default class WildEncounter extends SingleBattle {
    static globalDropPool = [
        {
            "id": "pokeball",
            "quantity": 10,
            "chance": 0.5
        }
    ];
    text = {
        fullName: "[NICKNAME]",
        opposingPokemon: "the wild [NICKNAME]",
        switchIn: "A wild [NICKNAME] appeared!",
        turn: " ",
        damagePercentage: " ",
        startBattle: " ",
        winBattle: "[TRAINER] defeated the wild Pokémon!",
        loseBattle: "[TRAINER] is out of usable Pokémon! [TRAINER] whited out.",
        tieBattle: "[TRAINER] is out of usable Pokémon! [TRAINER] whited out.",
        endBattle: "[TRAINER] escaped the battle!"
    }
    isWildBattle = true;
    
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

    onBattleWin() {
        let drops = [...ItemData[this.encounter.species].drops, ...WildEncounter.globalDropPool];
        for (let drop of drops) {
            let rng = Math.random();
            if (rng < drop.chance) {
                this.player.inventory.addItem(drop.id, drop.quantity);
                console.log(`Item drop: ${drop.id} x${drop.quantity}`);
            }
        }
    }

    onBattleLose() {
        console.log("player lost")
        // teleport player to pokemon center
    }
}
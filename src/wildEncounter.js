import SingleBattle from "./singleBattle.js";
import Party from "./party.js";
import { ItemData } from "./pokedex.js";

export default class WildEncounter extends SingleBattle {
    static globalDropPool = [
        {
            "id": "pokeball",
            "quantity": 1,
            "chance": 0.30
        },
        {
            "id": "pokeball",
            "quantity": 1,
            "chance": 0.30
        },
        {
            "id": "pokeball",
            "quantity": 1,
            "chance": 0.30
        },
        {
            "id": "potion",
            "quantity": 1,
            "chance": 0.25
        },
        {
            "id": "aguavberry",
            "quantity": 3,
            "chance": 0.15
        },
        {
            "id": "greatball",
            "quantity": 1,
            "chance": 0.1
        },
        {
            "id": "ultraball",
            "quantity": 1,
            "chance": 0.05
        },
        {
            "id": "firestone",
            "quantity": 1,
            "chance": 0.025
        },
        {
            "id": "waterstone",
            "quantity": 1,
            "chance": 0.025
        },
        {
            "id": "thunderstone",
            "quantity": 1,
            "chance": 0.025
        },
        {
            "id": "masterball",
            "quantity": 1,
            "chance": 0.005
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
    };
    isWildBattle = true;

    constructor(player, encounter) {
        super(
            new Party(1, "Wild Pokémon", [encounter], false, this.run.bind(this)),
            new Party(2, player.displayName, player.party),
            true
        );

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

    useItem(partyName, item) {
        this.playerParty.useItem(item);
        this.encounterParty.AI.chooseAction();
    }

    run() {
        console.log("RUNNING AWAY");
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
        console.log("player lost");
        // teleport player to pokemon center
    }
}
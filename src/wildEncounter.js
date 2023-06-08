/*
Alex Ge, Arnav Singh, Richard Wei, Will Gannon, Harry Liu

This file implements encounter functionality 
*/
import SingleBattle from "./singleBattle.js";
import Party from "./party.js";
import Pokedex, { ItemData } from "./pokedex.js";
import Items from "./items.js";

export default class WildEncounter extends SingleBattle {
    static globalDropPool = [
        {
            "id": "pokeball",
            "quantity": 1,
            "chance": 0.15
        },
        {
            "id": "pokeball",
            "quantity": 1,
            "chance": 0.15
        },
        {
            "id": "pokeball",
            "quantity": 3,
            "chance": 0.10
        },
        {
            "id": "greatball",
            "quantity": 1,
            "chance": 0.03
        },
        {
            "id": "greatball",
            "quantity": 1,
            "chance": 0.03
        },
        {
            "id": "ultraball",
            "quantity": 1,
            "chance": 0.02
        },
        {
            "id": "ultraball",
            "quantity": 1,
            "chance": 0.02
        },
        {
            "id": "potion",
            "quantity": 1,
            "chance": 0.25
        },
        {
            "id": "potion",
            "quantity": 1,
            "chance": 0.25
        },
        {
            "id": "superpotion",
            "quantity": 1,
            "chance": 0.15
        },
        {
            "id": "hyperpotion",
            "quantity": 1,
            "chance": 0.10
        },
        {
            "id": "maxpotion",
            "quantity": 1,
            "chance": 0.05
        },
        {
            "id": "masterball",
            "quantity": 1,
            "chance": 0.01
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
            new Party(1, "Wild Pokémon", [encounter], false),
            new Party(2, player.displayName, player.party),
            true
        );

        this.player = player;
        this.encounter = encounter;
        this.playerParty = this.party2;
        this.encounterParty = this.party1;
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
        if (this.playerParty.useItem(item))
            this.encounterParty.AI.chooseAction();
    }

    run() {
        this.endBattle(true);
    }

    onBattleWin() {
        let drops = [...ItemData[this.encounter.species].drops, ...WildEncounter.globalDropPool];
        for (let drop of drops) {
            let rng = Math.random();
            if (rng < drop.chance) {
                this.player.inventory.addItem(drop.id, drop.quantity);
                this.postTurnData.push({ message: `Wild ${Pokedex[this.encounter.species].name} dropped ${drop.quantity}x ${Items[drop.id].name}!`, battleOver: true });
                // console.log(`Item drop: ${drop.id} x${drop.quantity}`);
            }
        }
    }

    onBattleLose() {
        console.log("player lost");
        // teleport player to pokemon center
    }
}
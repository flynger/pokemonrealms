import Pokemon from "pokemon";
import Battle from "./battle";
import Side from "./side";
import { Action } from "./BattleQueue";
import Move, { Moves } from "../pokedex/move";

export default class BattleAction {
    readonly battle: Battle;

    constructor(battle: Battle) {
        this.battle = battle;
    }

    useMove = (move: Move, pokemon: Pokemon, targets: Pokemon[]) => {
        const moveEntry = Moves.get(move);
        // console.log(`${this.getName()} used ${moveEntry.name}!`);
        for (const target of targets) {
            if (moveEntry.category === "Status") {
                console.log(`But nothing happened...`);
            } else {
                //calculate damage
                this.dealDamage(pokemon, target, moveEntry.power!);
            }
        }
    }

    dealDamage = (pokemon: Pokemon, target: Pokemon, power: number) => {
        const dmg = calculateDamage(pokemon.level, pokemon.atk, target.def, power);

        target.currenthp -= dmg;
        if (target.currenthp < 0) pokemon.currenthp = 0;

        console.log(`${target.getName()} lost ${dmg}/${target.hp}% of its health!`);

        // this.data.push({
        //     msg: `${target.getName()} lost ${dmg}/${target.hp}% of its health!`,
        //     effect: {type: "health", healthPercent: target.getHpPercent(), index: target.activeInd }
        // });

        //fainted
        if (target.currenthp <= 0) {
            console.log(`${target.getName()} fainted!`);
            // this.data.push({
            //     msg: `${target.getName()} lost ${dmg}/${target.hp}% of its health!`,
            //     effect: {type: "faint", index: target.activeInd }
            // });
            this.faint(target);
        }
    }

    faint = (pokemon: Pokemon) => {
        this.battle.activePokemon[pokemon.activeInd] = null!;
    }
}

const calculateDamage = (level: number, atk: number, def: number, power: number): number => {
    const dmg = Math.floor((2 * level / 5 + 2) * power * atk / def / 50 + 2);
    return Math.max(dmg, 1);
}
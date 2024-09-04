import Pokemon from "pokemon";
import Battle from "../battle";
import Move, { Moves } from "pokedex/move";

export default class ActionHandler {
    readonly battle: Battle;

    constructor(battle: Battle) {
		this.battle = battle;
	}

    switchIn(pokemon: Pokemon, pos: number) {
        const party = pokemon.party;
        if(!party || pos >= party.active.length) return;

        const oldActive = party.active[pos];
        if (oldActive) {
            // this.battle.output.push({
            //     side: 0,
            //     pos: 0,
            //     switchIn: pokemon.serializeForBattle()
            // });
        }
    }

    useMove(move: Move, pokemon: Pokemon, targets: Pokemon[]) {
        const moveEntry = Moves.get(move);
        // console.log(`${this.getName()} used ${moveEntry.name}!`);
        // this.spot?.battle.messages.push(`${pokemon.name} used ${moveEntry.name}!`);
        if (targets.length === 0) {
            console.log(`But it failed!`);
        } else {
            for (const target of targets) {
                // if (!target.mon) continue;
                if (moveEntry.category === "Status") {
                    console.log(`But nothing happened...`);
                } else {
                    //calculate damage            
                    this.dealDamage(pokemon, target, moveEntry.power!);
                }
            }
        }
    }

    dealDamage(pokemon: Pokemon, target: Pokemon, power: number) {
        const dmg = this.getDamage(pokemon.level, pokemon.atk, target.def, power);
        this.takeDamage(target, dmg);
    }

    getDamage(level: number, atk: number, def: number, power: number): number {
        const dmg = Math.floor((2 * level / 5 + 2) * power * atk / def / 50 + 2);
        return Math.max(dmg, 1);
    }

    takeDamage(target: Pokemon, dmg: number) {
        target.currenthp -= dmg;
        if (target.currenthp < 0) target.currenthp = 0;

        // this.battle.output.push({
        //     damage: target.serializeForBattle()
        // });

        //fainted
        if (target.currenthp <= 0) {
            // console.log(`${this.getName()} fainted!`);
            // this.battle.output.push({
            //     faint: true
            // });
        }
    }
}
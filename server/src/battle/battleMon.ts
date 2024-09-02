import { Ability } from "../pokedex/ability";
import Move, { Moves } from "../pokedex/move";
import Pokedex from "../pokedex/pokedex";
import Pokemon from "../pokemon";
import BattleSpot from "./battleSpot";

export default class BattleMon extends Pokemon {
    ability: Ability;
    spot?: BattleSpot;
    
    constructor(mon: Pokemon) {
        super(mon.species, mon.level, mon);
        const dexEntry = Pokedex.getEntry(mon.species);
        this.ability = dexEntry.abilities[mon.abilitySlot]!;
    }

    useMove = (move: Move, targets: BattleSpot[]) => {
        const moveEntry = Moves.get(move);
        // console.log(`${this.getName()} used ${moveEntry.name}!`);
        this.spot?.battle.messages.push(`${this.getName()} used ${moveEntry.name}!`);
        if (targets.length === 0) {
            console.log(`But it failed!`);
        } else {
            for (const target of targets) {
                if (!target.mon) continue;
                if (moveEntry.category === "Status") {
                    console.log(`But nothing happened...`);
                } else {
                    //calculate damage            
                    this.dealDamage(target.mon, moveEntry.power!);
                }
            }
        }
    }

    dealDamage = (rec: BattleMon, power: number) => {
        const dmg = calculateDamage(this.level, this.atk, rec.def, power);
        rec.takeDamage(dmg);
    }

    takeDamage(dmg: number) {
        this.currenthp -= dmg;
        if (this.currenthp < 0) this.currenthp = 0;

        // console.log(`${this.getName()} HP${this.currenthp}/${this.hp}, took ${dmg} damage`);
        this.spot?.battle.messages.push({
            damageHPTo: this.getHpPercent()
        });

        //fainted
        if (this.currenthp <= 0) {
            // console.log(`${this.getName()} fainted!`);
            this.spot?.battle.messages.push(`${this.getName()} fainted!`);
            delete this.spot?.mon;
        }
    }

    getHpPercent(): number {
        return Math.floor(100 * this.currenthp / this.hp);
    }
}

const calculateDamage = (level: number, atk: number, def: number, power: number): number => {
    const dmg = Math.floor((2 * level / 5 + 2) * power * atk / def / 50 + 2);
    return Math.max(dmg, 1);
}
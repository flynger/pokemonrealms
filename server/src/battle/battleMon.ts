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

    
}


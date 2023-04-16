import { DefaultText } from 'pokemon-showdown/data/text/default';
import { Pokemon, Ability, AbilitySlot, Gender, Move, Species, Stats, Type } from './pokemon';
import { Party, PlayerOptions } from './party';
import { translatePokemon } from './pokemonTranslator';

class SingleBattle {
    Sim = require('pokemon-showdown');
    stream = new this.Sim.BattleStream();
    playerOptions1: PlayerOptions;
    playerOptions2: PlayerOptions;

    constructor(party1: Party, party2: Party) {
        this.playerOptions1.team = party1.exportTeam();
        this.playerOptions2.team = party2.exportTeam();

        this.playerOptions1.name = party1.name;
        this.playerOptions2.name = party2.name;
    }

    StartBattle() {
        let battleOptions = {
            p1: {
                name: this.playerOptions1.name,
                team: this.playerOptions1.team
            },
            p2: {
                name: this.playerOptions2.name,
                team: this.playerOptions2.team
            }
        }
        this.stream.write(`>start {"formatid":"gen7ou"}`);

        this.stream.write(`>player p1 ${JSON.stringify(battleOptions.p1)}`);
        this.stream.write(`>player p2 ${JSON.stringify(battleOptions.p2)}`);
        this.stream.write('>start')
    }
}
const articuno: Pokemon = {
    species: "Articuno",
    name: "",
    gender: "N",
    shiny: false,
    level: 100,
    item: "Leftovers",
    nature: "Modest",
    ability: "0",
    ivs: { hp: undefined, atk: undefined, def: 30, spa: 30, spd: undefined, spe: undefined },
    evs: { hp: undefined, atk: undefined, def: undefined, spa: 252, spd: undefined, spe: 4 },
    stats: { hp: undefined, atk: undefined, def: undefined, spa: undefined, spd: undefined, spe: undefined },
    moves: ["Ice Beam", "Hurricane", "Substitute", "Roost"]
};

const ludicolo: Pokemon = {
    species: "Ludicolo",
    name: "",
    gender: "N",
    shiny: false,
    level: 100,
    item: "Life Orb",
    nature: "Modest",
    ability: "1",
    ivs: { hp: undefined, atk: undefined, def: undefined, spa: 252, spd: undefined, spe: 252 },
    evs: { hp: undefined, atk: undefined, def: undefined, spa: 4, spd: undefined, spe: 252 },
    stats: { hp: undefined, atk: undefined, def: undefined, spa: undefined, spd: undefined, spe: undefined },
    moves: ["Surf", "Giga Drain", "Ice Beam", "Rain Dance"]
};

const volbeat: Pokemon = {
    species: "Volbeat",
    name: "",
    gender: "M",
    shiny: false,
    level: 100,
    item: "Damp Rock",
    nature: "Bold",
    ability: "1",
    ivs: { hp: undefined, atk: undefined, def: undefined, spa: undefined, spd: undefined, spe: undefined },
    evs: { hp: 248, atk: undefined, def: 252, spa: undefined, spd: 8, spe: undefined },
    stats: { hp: undefined, atk: undefined, def: undefined, spa: undefined, spd: undefined, spe: undefined },
    moves: ["Tail Glow", "Baton Pass", "Encore", "Rain Dance"]
};

const seismitoad: Pokemon = {
    species: "Seismitoad",
    name: "",
    gender: "N",
    shiny: false,
    level: 100,
    item: "Life Orb",
    nature: "Modest",
    ability: "1",
    ivs: { hp: undefined, atk: undefined, def: undefined, spa: undefined, spd: 4, spe: 252 },
    evs: { hp: undefined, atk: undefined, def: undefined, spa: 252, spd: undefined, spe: 252 },
    stats: { hp: undefined, atk: undefined, def: undefined, spa: undefined, spd: undefined, spe: undefined },
    moves: ["Hydro Pump", "Earth Power", "Stealth Rock", "Rain Dance"]
};

const party1 = new Party('Flynger', [
    articuno,
    ludicolo,
]);

const party2 = new Party('Eichardo', [
    volbeat,
    seismitoad,
]);

const battle = new SingleBattle(party1, party2);
battle.StartBattle();

import { Pokemon, Ability, AbilitySlot, Gender, Move, Species, Stats, Type } from './pokemon'

export function translatePokemon(pokemon: Pokemon): string {
    const species = pokemon.species;
    const item = pokemon.item || "";
    const ability = pokemon.ability || "";
    const moves = pokemon.moves.join(",");
    const nature = pokemon.nature;
    const evs = [
      pokemon.evs.hp || "",
      pokemon.evs.atk || "",
      pokemon.evs.def || "",
      pokemon.evs.spa || "",
      pokemon.evs.spd || "",
      pokemon.evs.spe || "",
    ].join(",");
    const ivs = [
      pokemon.ivs.hp || "",
      pokemon.ivs.atk || "",
      pokemon.ivs.def || "",
      pokemon.ivs.spa || "",
      pokemon.ivs.spd || "",
      pokemon.ivs.spe || "",
    ].join(",");
    const level = pokemon.level || "";
    const shiny = pokemon.shiny ? "S" : "";
    const gender = pokemon.gender;
    return `${species}||${item}|${ability}|${moves}|${nature}|${evs}|${gender}|${ivs}|${shiny}|${level}]`;
  }

  const froslass: Pokemon = {
    species: 'Froslass',
    item: 'Focus Sash',
    nature: 'Timid',
    name: '',
    gender: 'F',
    shiny: false,
    level: 100,
    ability: '0',
    ivs: {},
    evs: {
        hp: 0,
        atk: 0,
        def: 0,
        spa: 252,
        spd: 4,
        spe: 252,
    },
    stats: {},
    statStages: {
      atk: 0,
      def: 0,
      spa: 0,
      spd: 0,
      spe: 0,
      accuracy: 0,
      crit: 0,
      evasion: 0,
    },
    moves: ['Spikes', 'Taunt', 'Destiny Bond', 'Ice Beam'],
  };

  console.log(translatePokemon(froslass));
import { Pokemon, Ability, AbilitySlot, Gender, Move, Species, Stats, Type } from './pokemon'

export function translatePokemon(pokemon: Pokemon): string {
    // const ability = `${pokemon.ability}`;
    const ivs = Object.values(pokemon.ivs).join(",");
    const evs = Object.values(pokemon.evs).join(",");
    const statStages = Object.values(pokemon.statStages).join(",");
    const moves = pokemon.moves.map((move) => move).join(", ");
  
    return `${pokemon.species}||${pokemon.item}|${moves}|${pokemon.nature}|${ivs},${evs},${statStages}`;
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
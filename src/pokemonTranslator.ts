import { Pokemon, Ability, AbilitySlot, Gender, Move, Species, Stats, Type } from './pokemon'
import { Pokedex } from "./pokedex";
import { Item } from './pokemon';
import { Items } from './items';


export function translateTeam(packedStrings: string[]): string {
  return packedStrings.join(']');
}

export function translatePokemon(pokemon: Pokemon): string {
  const species: string = Pokedex[pokemon.species].name;
  const name: string = pokemon.name;
  const item: string = pokemon.item ? Items[pokemon.item].name : "";
  const ability: Ability = pokemon.ability || "0";
  const moves: string = pokemon.moves.join(",");
  const nature: string = pokemon.nature;
  const evs: string = [
    pokemon.evs.hp || "",
    pokemon.evs.atk || "",
    pokemon.evs.def || "",
    pokemon.evs.spa || "",
    pokemon.evs.spd || "",
    pokemon.evs.spe || "",
  ].join(",");
  const ivs: string = [
    pokemon.ivs.hp || "",
    pokemon.ivs.atk || "",
    pokemon.ivs.def || "",
    pokemon.ivs.spa || "",
    pokemon.ivs.spd || "",
    pokemon.ivs.spe || "",
  ].join(",");
  const level: string = pokemon.level + "" || "";
  const shiny: string = pokemon.shiny ? "S" : "";
  const gender: Gender = pokemon.gender;
  return `${species}|${name}|${item}|${ability}|${moves}|${nature}|${evs}|${gender}|${ivs}|${shiny}|${level}]`;
}

const froslass: Pokemon = {
  species: 'FROSLASS',
  name: 'Froslass',
  item: 'focussash',
  nature: 'Timid',
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
  moves: ['Spikes', 'Taunt', 'Destiny Bond', 'Ice Beam'],
};

console.log(translatePokemon(froslass));
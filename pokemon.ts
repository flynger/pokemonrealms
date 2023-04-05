import { Pokedex } from "./pokedex";
const pokemon = [
    { species: 'pikachu', name: 'Pikachu' },
    { species: 'bulbasaur', name: 'Bulbasaur' },
    { species: 'charmander', name: 'Charmander' }
] as const;

export type Species = typeof Pokedex[string]['species'];

// module.exports = (): Pokemon =>{
//     return "charmander"
// }

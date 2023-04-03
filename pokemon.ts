const pokemon = [
    { species: 'pikachu', name: 'Pikachu' },
    { species: 'bulbasaur', name: 'Bulbasaur' },
    { species: 'charmander', name: 'Charmander' }
] as const;

type Pokemon = typeof pokemon[number]['species'];

module.exports = (): Pokemon =>{
    return "charmander"
}
export function translatePokemon(pokemon) {
    const species = pokemon.species;
    const name = pokemon.name;
    const heldItem = pokemon.heldItem;
    const abilitySlot = pokemon.abilitySlot;
    const moves = pokemon.moves.join(",");
    const nature = pokemon.nature;
    const evs = pokemon.evs.toArray().join(",");
    const ivs = pokemon.ivs.toArray().join(",");
    const level = pokemon.level || "";
    const shiny = pokemon.shiny ? "S" : "";
    const gender = pokemon.gender;
    return `${name}|${species}|${heldItem}|${abilitySlot}|${moves}|${nature}|${evs}|${gender}|${ivs}|${shiny}|${level}|`;
}
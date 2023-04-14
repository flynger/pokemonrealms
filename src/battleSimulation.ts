const Sim = require('pokemon-showdown');
const stream = new Sim.BattleStream();

(async () => {
    for await (const output of stream) {
        console.log(output);
    }
})();

stream.write(`>start {"formatid":"gen7ou"}`);
stream.write(`>player p1 {"name":"Flynger","team":"${Sim.packTeam([
    {species: "Articuno", moves: ["roost", "freezedry", "hurricane"]},
    {species: "Ludicolo", moves: ["raindance", "scald", "gigadrain"]},
    {species: "Volbeat", moves: ["encore", "thunderwave", "tailglow"]}
])}"}`);
stream.write(`>player p2 {"name":"Eichardo","team":"${Sim.packTeam([
    {species: "Seismitoad", moves: ["stealthrock", "earthquake", "scald"]},
    {species: "Alomomola", moves: ["wish", "protect", "toxic"]},
    {species: "Armaldo", moves: ["rapidspin", "knockoff", "stoneedge"]}
])}"}`);

// Make choices for the players
stream.write(`>p1 move 1`);
stream.write(`>p2 switch 3`);
stream.write(`>p1 move 3`);
stream.write(`>p2 move 2`);
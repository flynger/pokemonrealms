// const Sim = require('pokemon-showdown');
// const stream = new Sim.BattleStream();

// // Listen for messages from the stream
// (async () => {
//   for await (const output of stream) {
//     console.log(output);
//   }
// })();

// // Start the battle and set player information
// stream.write(`>start {"formatid":"gen7randombattle"}`);
// stream.write(`>player p1 {"name":"Flynger"}`);
// stream.write(`>player p2 {"name":"Eichardo"}`);

// // Make choices for the players
// stream.write(`>p1 pass`);
// stream.write(`>p2 switch 3`);
// stream.write(`>p1 move 3`);
// stream.write(`>p2 move 2`);
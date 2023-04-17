const Sim = require('pokemon-showdown');
const stream = new Sim.BattleStream();

// Listen for messages from the stream
(async () => {
  for await (const output of stream) {
    console.log(output);
  }
})();

// function that takes in multiple pokemon


// Start the battle and set player information
stream.write(`>start {"formatid":"gen7ou"}`);

stream.write(`>player p1 {"name":"Flynger","team":"Articuno||leftovers|pressure|icebeam,hurricane,substitute,roost|Modest|252,,,252,4,||,,,30,30,|||]"}`);
stream.write(`>player p2 {"name":"Eichardo","team":"Ludicolo||lifeorb|swiftswim|surf,gigadrain,icebeam,raindance|Modest|4,,,252,,252|||||]"}`);

// Make choices for the players
stream.write(`>p1 pass`);
stream.write(`>p2 switch 3`);
stream.write(`>p1 move 3`);
stream.write(`>p2 move 2`);
import Text from 'pokemon-showdown/.data-dist/text/default.js';
import Pokemon from './pokemon.js';
import Party from './party.js';
import Showdown from 'pokemon-showdown';

class SingleBattle {
    constructor(party1, party2) {
        this.stream = new Showdown.BattleStream();
        (async () => {
            let counter = 0;
            for await (const output of this.stream) {
                let outputArray = output.split("\n");
                let previousHpPercentage = 100;
                switch (outputArray.shift()) {
                    case "update":
                        let split = 0; // split counter
                        let splitPlayer; // first line of split, which player to send to
                        for (const line of outputArray) {
                            let lineArray = line.slice(1).split("|");
                            // if msg is split
                            if (split > 0) {
                                if (split === 2) {
                                    // console.log(`Send msg to ${splitPlayer}: ${lineArray.join(" => ")}`);

                                    switch (lineArray.shift()) {
                                        case "-damage":
                                            console.log("Damage");
                                            let damageArgs = {};
                                            let damageMessageIndex = 0;
                                            for (let val of lineArray) {
                                                console.log(`damageMessageIndex: ${damageMessageIndex}, Value: ${val}, length: ${lineArray.length}`);
                                                if (damageMessageIndex === 0) {
                                                    damageArgs.pokemon = val;
                                                    console.log(`damageArgs.pokemon: ${damageArgs.pokemon}`)
                                                }
                                                else if (damageMessageIndex === 1) {
                                                    let [numerator, denominator] = val.split("/");
                                                    console.log(`Numerator: ${numerator}, Denominator: ${denominator}`);
                                                    console.log(`percentage: ${numerator / denominator}`);

                                                    let percentageTaken = previousHpPercentage - (numerator / denominator) * 100;
                                                    console.log(`${damageArgs.pokemon} lost ${percentageTaken} percent of its health!`);
                                                    previousHpPercentage = (numerator / denominator) * 100;
                                                    // console.log(previousHpPercentage);
                                                }
                                                damageMessageIndex++;
                                            }
                                    }
                                } else {
                                    //split == 1
                                    console.log(`Send public: ${line}`);
                                }
                                split--;
                            } else {
                                let denoter = lineArray.shift();
                                let args = {}; //args to replace their respective fields in default.ts
                                let messageText = Text.DefaultText.default[denoter] || "!ERRORWTF!";
                                let useArgs = true; // whether to replace args or not
                                switch (denoter) {
                                    case "split":
                                        split = 2;
                                        splitPlayer = lineArray[0];
                                        continue;
                                    case "move":
                                        args.NICKNAME = lineArray[0].slice(5);
                                        args.MOVE = lineArray[1];
                                        break;
                                    case "turn":
                                        args.NUMBER = lineArray[0];
                                        break;
                                    case "start":
                                        messageText = Text.DefaultText.default.startBattle.replace("[TRAINER]", party1.name).replace("[TRAINER]", party2.name);
                                        useArgs = false;
                                        break;
                                    default:
                                        continue;
                                    //console.log(line);
                                }
                                if (useArgs) {
                                    if (messageText.includes("[POKEMON]")) {
                                        let ownPokemon = lineArray[0].slice(0, 2) == "p1";
                                        messageText = messageText.replace("[POKEMON]", ownPokemon ? Text.DefaultText.default.pokemon : Text.DefaultText.default.opposingPokemon);
                                    }
                                    for (let arg in args) {
                                        messageText = messageText.replace(`[${arg}]`, args[arg]);
                                    }
                                }
                                // console.log(messageText);
                            }
                        }
                        break;
                    case "sideupdate":
                    //console.log(outputArray)
                }
                // console.log(output);
            }
        })();

        this.playerOptions1 = {
            name: party1.name,
            team: party1.exportTeam()
        };
        this.playerOptions2 = {
            name: party2.name,
            team: party2.exportTeam()
        };
    }

    startBattle() {
        this.stream.write(`>start {"formatid":"gen7custom"}`);
        this.stream.write(`>player p1 ${JSON.stringify(this.playerOptions1)}`);
        this.stream.write(`>player p2 ${JSON.stringify(this.playerOptions2)}`);
        // this.stream.write(`>p1 team 123456`);
        // this.stream.write(`>p2 team 123456`);
    }



    useMove(playerNumber, moveNumber) {
        if (playerNumber == 1) {
            this.stream.write(`>p1 move ${moveNumber}`);
        }
        else {
            this.stream.write(`>p2 move ${moveNumber}`)
        }
    }

    switch(playerNumber, switchNumber) {
        if (playerNumber == 1) {
            this.stream.write(`>p1 switch ${switchNumber}`);
        }
        else {
            this.stream.write(`>p2 switch ${switchNumber}`);
        }
    }
}
const articuno = {
    species: "ARTICUNO",
    name: "",
    gender: "N",
    shiny: false,
    level: 100,
    item: "Leftovers",
    nature: "Modest",
    ability: "0",
    ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
    evs: { hp: 0, atk: 0, def: 0, spa: 252, spd: 0, spe: 4 },
    stats: { hp: undefined, atk: undefined, def: undefined, spa: undefined, spd: undefined, spe: undefined },
    moves: ["Ice Beam", "Hurricane", "Substitute", "Roost"]
};

const ludicolo = {
    species: "LUDICOLO",
    name: "",
    gender: "M",
    shiny: false,
    level: 100,
    item: "Life Orb",
    nature: "Modest",
    ability: "1",
    ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
    evs: { hp: 0, atk: 0, def: 0, spa: 4, spd: 0, spe: 252 },
    stats: { hp: undefined, atk: undefined, def: undefined, spa: undefined, spd: undefined, spe: undefined },
    moves: ["Surf", "Giga Drain", "Ice Beam", "Rain Dance"]
};

const volbeat = {
    species: "VOLBEAT",
    name: "",
    gender: "M",
    shiny: false,
    level: 100,
    item: "Damp Rock",
    nature: "Bold",
    ability: "1",
    ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
    evs: { hp: 248, atk: 0, def: 252, spa: 0, spd: 8, spe: 0 },
    stats: { hp: undefined, atk: undefined, def: undefined, spa: undefined, spd: undefined, spe: undefined },
    moves: ["Tail Glow", "Baton Pass", "Encore", "Rain Dance"]
};

const seismitoad = {
    species: "SEISMITOAD",
    name: "",
    gender: "F",
    shiny: false,
    level: 100,
    item: "Life Orb",
    nature: "Modest",
    ability: "1",
    ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
    evs: { hp: 0, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 },
    stats: { hp: undefined, atk: undefined, def: undefined, spa: undefined, spd: undefined, spe: undefined },
    moves: ["Hydro Pump", "Earth Power", "Stealth Rock", "Rain Dance"]
};

const party1 = new Party('Flynger', [
    new Pokemon("bulbasaur", "bulby", "M", undefined, 7, undefined, undefined, "0", undefined, undefined, ["leechseed"]),
    new Pokemon("articuno", "uno", "N", undefined, 10, undefined, undefined, undefined, undefined, undefined, ["powdersnow"])
]);

const party2 = new Party('Eichardo', [
    new Pokemon("pidgey", "Bird", "M", undefined, 10, undefined, undefined, undefined, undefined, undefined, ["gust"]),
    new Pokemon("butterfree", "sad", "M", undefined, 15, undefined, undefined, undefined, undefined, undefined, ["confusion"])
]);

const battle = new SingleBattle(party1, party2);

battle.startBattle();
battle.useMove(1, 1);
battle.switch(2, 2);
battle.switch(1, 2);
battle.useMove(2, 1);
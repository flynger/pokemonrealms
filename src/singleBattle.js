import { DefaultText } from 'pokemon-showdown/.data-dist/text/default.js';
import { MovesText } from 'pokemon-showdown/.data-dist/text/moves.js';
import Pokemon from './pokemon.js';
import Party from './party.js';
import Showdown from 'pokemon-showdown';
const { BattleStream, Dex } = Showdown;

class SingleBattle {
    constructor(party1, party2) {
        this.stream = new BattleStream();
        (async () => {
            let counter = 0;
            for await (const output of this.stream) {
                let outputArray = output.split("\n");
                let ownActivePokemon = null;
                let enemyActivePokemon = null;
                let previousOwnHpPercentage = 100;
                let previousEnemyHpPercentage = 100;
                switch (outputArray.shift()) {
                    case "update":
                        let splitCounter = 0; // split counter
                        let splitPlayer; // first line of split, which player to send to
                        for (const line of outputArray) {
                            let lineArray = line.slice(1).split("|");
                            let args = {}; //args to replace their respective fields in default.ts
                            let useArgs = true; // whether to replace args or not

                            let isOwnPokemon = lineArray.length > 1 && (lineArray[1].includes("p1") || lineArray[1].includes("p2")) ? lineArray[1].slice(0, 2) == "p1" : null; // whether the message is about your pokemon or the opponent's
                            // if msg is split
                            let denoter = lineArray.shift();
                            let messageText = DefaultText.default[denoter[0] == "-" ? denoter.substring(1) : denoter] || " ";
                            if (splitCounter > 0) {
                                // private information
                                if (splitCounter == 1) {
                                    //console.log(`Send msg to ${splitPlayer}: ${lineArray.join(" => ")}`);
                                    switch (denoter) {
                                        case "switch":
                                            if (isOwnPokemon && ownActivePokemon != null) {
                                                messageText = DefaultText.default.switchOutOwn;
                                            } else if (!isOwnPokemon && enemyActivePokemon != null) {
                                                messageText = DefaultText.default.switchOut;
                                                args.TRAINER = party2.name;
                                            } else {
                                                // add logic to send private data to player
                                                messageText = " ";
                                            }
                                            args.NICKNAME = lineArray[0].slice(5);
                                            break;
                                        case "-damage":
                                            messageText = DefaultText.default.damagePercentage;
                                            args.NICKNAME = lineArray[0].slice(5);
                                            var newPercentage = lineArray[1] == "0 fnt" ? 0 : +lineArray[1].split("/")[0];
                                            if (isOwnPokemon) {
                                                args.PERCENTAGE = previousOwnHpPercentage - newPercentage + "%";
                                                previousOwnHpPercentage = newPercentage;
                                            } else {
                                                args.PERCENTAGE = previousEnemyHpPercentage - newPercentage + "%";
                                                previousEnemyHpPercentage = newPercentage;
                                            }
                                            break;
                                        case "-heal":
                                            args.NICKNAME = lineArray[0].slice(5);
                                            var newPercentage = +lineArray[1].split("/")[0];
                                            if (isOwnPokemon) {
                                                previousOwnHpPercentage = newPercentage;
                                            } else {
                                                previousEnemyHpPercentage = newPercentage;
                                            }
                                    }
                                    // console.log(`Send private: ${line}`);
                                }
                                // public information
                                else {
                                    switch (denoter) {
                                        case "switch":
                                            if (isOwnPokemon) {
                                                messageText = DefaultText.default.switchInOwn;
                                            } else if (!isOwnPokemon) {
                                                messageText = DefaultText.default.switchIn;
                                                args.TRAINER = party2.name;
                                            }
                                            args.NICKNAME = lineArray[0].slice(5);
                                            args.SPECIES = lineArray[1].split(", ")[0];
                                            // add logic to send public data to player
                                            break;
                                        default:
                                            messageText = " ";
                                    }
                                    //splitCounter == 1
                                    //console.log(`Send public: ${line}`);

                                }
                                splitCounter--;
                            } else {
                                switch (denoter) {
                                    case "faint":
                                        args.NICKNAME = lineArray[0].slice(5);
                                    case "move":
                                        args.NICKNAME = lineArray[0].slice(5);
                                        args.MOVE = lineArray[1];
                                        break;
                                    case "split":
                                        splitCounter = 2;
                                        splitPlayer = lineArray[0];
                                        continue;
                                    case "start":
                                        messageText = DefaultText.default.startBattle.replace("[TRAINER]", party1.name).replace("[TRAINER]", party2.name);
                                        useArgs = false;
                                        break;
                                    case "turn":
                                        args.NUMBER = lineArray[0];
                                        break;
                                    case "-miss":
                                        isOwnPokemon = !isOwnPokemon;
                                        args.NICKNAME = lineArray[1].slice(5);
                                        break;
                                    case "-start":
                                        let effectDetails = lineArray[1].split(": ");
                                        let effectSourceType = effectDetails[0];
                                        let effectSource = effectDetails[1];
                                        if (effectSourceType == "move") {
                                            messageText = MovesText[Dex.moves.get(effectSource).id].start;
                                        }
                                        else messageText = DefaultText.default.start;
                                        args.NICKNAME = lineArray[0].slice(5);
                                        break;
                                    case "-supereffective":
                                        messageText = DefaultText.default.superEffective;
                                        useArgs = false;
                                        break;
                                    default:
                                        messageText = " ";
                                }
                            }
                            if (useArgs) {
                                if (messageText.includes("[POKEMON]")) {
                                    messageText = messageText.replace("[POKEMON]", isOwnPokemon ? DefaultText.default.pokemon : DefaultText.default.opposingPokemon);
                                } else if (messageText.includes("[FULLNAME]")) {
                                    messageText = messageText.replace("[FULLNAME]", "[NICKNAME] (**[SPECIES]**)");
                                }
                                for (let arg in args) {
                                    messageText = messageText.replace(`[${arg}]`, args[arg]);
                                }
                            }
                            let firstLetter = messageText.search(/[a-zA-Z]/);
                            if (firstLetter != messageText.search(/[A-Z]/)) {
                                messageText = messageText.substring(0, firstLetter) + messageText[firstLetter].toUpperCase() + messageText.substring(firstLetter + 1);
                            }
                            console.log(line + " ".repeat(80 - line.length) + " ===>      " + messageText); // formatting to compare old output to our new, processed output
                        }
                        break;
                    case "sideupdate":
                    //console.log(outputArray)
                }
                //console.log(output);
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
        this.stream.write(`>start {"formatid":"N/A"}`);
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

    switchTo(playerNumber, switchNumber) {
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
    new Pokemon("articuno", "uno", "N", undefined, 10, undefined, undefined, "0", undefined, undefined, ["powdersnow"])
]);

const party2 = new Party('Eichardo', [
    new Pokemon("pidgey", "Bird", "M", undefined, 1, undefined, undefined, undefined, undefined, undefined, ["gust"]),
    new Pokemon("butterfree", "sad", "M", undefined, 15, undefined, undefined, "0", undefined, undefined, ["confusion"])
]);

const battle = new SingleBattle(party1, party2);

battle.startBattle();
battle.useMove(1, 1);
// battle.switchTo(2, 2);
// battle.switchTo(1, 2);
battle.useMove(2, 1);
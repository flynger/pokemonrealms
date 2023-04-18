import { DefaultText } from 'pokemon-showdown/.data-dist/text/default.js';
import { MovesText } from 'pokemon-showdown/.data-dist/text/moves.js';
import Pokemon from './pokemon.js';
import Party from './party.js';
import Showdown from 'pokemon-showdown';
const { BattleStream, Dex } = Showdown;
import * as readline from 'node:readline';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class SingleBattle {
    constructor(party1, party2) {
        this.stream = new BattleStream();
        (async () => {
            let ownActivePokemon = null;
            let enemyActivePokemon = null;
            let previousOwnHpPercentage = 100;
            let previousEnemyHpPercentage = 100;
            for await (const output of this.stream) {
                let outputArray = output.split("\n");
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
                                // private information and switch out check
                                if (splitCounter == 2) {
                                    switch (denoter) {
                                        case "switch":
                                            if (isOwnPokemon && ownActivePokemon != null) {
                                                messageText = DefaultText.default.switchOutOwn;
                                                args.NICKNAME = ownActivePokemon;
                                            } else if (!isOwnPokemon && enemyActivePokemon != null) {
                                                messageText = DefaultText.default.switchOut;
                                                args.NICKNAME = enemyActivePokemon;
                                                args.TRAINER = party2.name;
                                            } else {
                                                // add logic to send private data to player
                                                messageText = " ";
                                            }
                                            break;
                                        default:
                                            messageText = " ";
                                    }
                                }
                                // public information
                                else {
                                    switch (denoter) {
                                        case "switch":
                                            args.NICKNAME = lineArray[0].split(": ")[1];
                                            args.SPECIES = lineArray[1].split(", ")[0];
                                            if (isOwnPokemon) {
                                                messageText = DefaultText.default.switchInOwn;
                                                ownActivePokemon = args.NICKNAME;
                                            } else if (!isOwnPokemon) {
                                                messageText = DefaultText.default.switchIn;
                                                enemyActivePokemon = args.NICKNAME;
                                                args.TRAINER = party2.name;
                                            }
                                            // add logic to send public data to player
                                            break;
                                        case "-damage":
                                            messageText = DefaultText.default.damagePercentage;
                                            args.NICKNAME = lineArray[0].split(": ")[1];
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
                                            args.NICKNAME = lineArray[0].split(": ")[1];
                                            var newPercentage = +lineArray[1].split("/")[0];
                                            if (isOwnPokemon) {
                                                previousOwnHpPercentage = newPercentage;
                                            } else {
                                                previousEnemyHpPercentage = newPercentage;
                                            }
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
                                        args.NICKNAME = lineArray[0].split(": ")[1];
                                        if (isOwnPokemon) {
                                            ownActivePokemon = null;
                                        } else if (isOwnPokemon) {
                                            ownActivePokemon = null;
                                        }
                                        break;
                                    case "move":
                                        args.NICKNAME = lineArray[0].split(": ")[1];
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
                                    case "-ability":
                                        messageText = DefaultText.default.abilityActivation;
                                        args.NICKNAME = lineArray[0].split(": ")[1];
                                        args.ABILITY = lineArray[1];
                                        break;
                                    case "-boost":
                                        var amount = lineArray[2];
                                        if (amount != "1") {
                                            messageText = DefaultText.default["boost" + amount];
                                        }
                                        args.NICKNAME = lineArray[0].split(": ")[1];
                                        args.STAT = DefaultText[lineArray[1]].statName;
                                        break;
                                    case "-miss":
                                        isOwnPokemon = !isOwnPokemon;
                                        args.NICKNAME = lineArray[1].split(": ")[1];
                                        break;
                                    case "-prepare":
                                        messageText = MovesText[Dex.moves.get(lineArray[1]).id].prepare;
                                        args.NICKNAME = lineArray[0].split(": ")[1];
                                        break;
                                    case "-singleturn":
                                        var effectDetails = lineArray[1].split(": ");
                                        var effectSourceType = effectDetails[0];
                                        var effectSource = effectDetails[1];
                                        if (effectSourceType == "move") {
                                            messageText = MovesText[Dex.moves.get(effectSource).id].start;
                                        }
                                        else {
                                            messageText = DefaultText[effectSourceType].start;
                                        }
                                        args.NICKNAME = lineArray[0].split(": ")[1];
                                        break;
                                    case "-start":
                                        // note: fix Substitute unrelated but also Volt Switch
                                        var effectDetails = lineArray[1].split(": ");
                                        var effectSourceType = effectDetails[0];
                                        var effectSource = effectDetails[1];
                                        if (effectSourceType == "move") {
                                            messageText = MovesText[Dex.moves.get(effectSource).id].start;
                                        } else {
                                            messageText = DefaultText[effectSourceType].start;
                                        }
                                        args.NICKNAME = lineArray[0].split(": ")[1];
                                        break;
                                    case "-supereffective":
                                        messageText = DefaultText.default.superEffective;
                                        useArgs = false;
                                        break;
                                    case "-unboost":
                                        var amount = lineArray[2];
                                        if (amount != "1") {
                                            messageText = DefaultText.default["unboost" + amount];
                                        }
                                        args.NICKNAME = lineArray[0].split(": ")[1];
                                        args.STAT = DefaultText[lineArray[1]].statName;
                                        break;
                                    default:
                                        //messageText = " ";
                                }
                            }
                            let firstWordIsName = false;
                            if (useArgs) {
                                if (messageText.includes("[POKEMON]")) {
                                    messageText = messageText.replace("[POKEMON]", isOwnPokemon ? DefaultText.default.pokemon : DefaultText.default.opposingPokemon);
                                } else if (messageText.includes("[FULLNAME]")) {
                                    messageText = messageText.replace("[FULLNAME]", "[NICKNAME] (**[SPECIES]**)");
                                }

                                let firstLetter = messageText.search(/[a-zA-Z]/); // find first letter of string
                                if (firstLetter == messageText.search("[NICKNAME]") || firstLetter == messageText.search("[TRAINER]")) {
                                    firstWordIsName = true; // protect nicknames & trainer names from capitalization
                                }
                                for (let arg in args) {
                                    messageText = messageText.replace(`[${arg}]`, args[arg]);
                                }
                            }
                            let firstLetter = messageText.search(/[a-zA-Z]/); // find first letter of string
                            if (!firstWordIsName && firstLetter != messageText.search(/[A-Z]/)) {
                                messageText = messageText.substring(0, firstLetter) + messageText[firstLetter].toUpperCase() + messageText.substring(firstLetter + 1);
                            }
                            console.log(line + " ".repeat(70 >= line.length ? 70 - line.length : 0) + " ===>      " + messageText); // formatting to compare old output to our new, processed output
                        }
                        break;
                    case "sideupdate":
                        let player = outputArray[0];
                        let lineArray = outputArray[1].slice(1).split("|");
                        let denoter = lineArray.shift();
                        switch (denoter) {
                            case "request":
                                let request = JSON.parse(lineArray[0]);
                                console.log(request);
                                break;
                            case "error":
                                console.log("Bad input for " + player)
                        }
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
        this.stream.write(`>start {"formatid":"gen7ubers"}`);
        this.stream.write(`>player p1 ${JSON.stringify(this.playerOptions1)}`);
        this.stream.write(`>player p2 ${JSON.stringify(this.playerOptions2)}`);
        // this.stream.write(`>p1 team 123456`);
        // this.stream.write(`>p2 team 123456`);
    }

    startRandomBattle() {
        this.stream.write(`>start {"formatid":"gen7randombattle"}`);
        this.stream.write(`>player p1 ${JSON.stringify({ name: this.playerOptions1.name })}`);
        this.stream.write(`>player p2 ${JSON.stringify({ name: this.playerOptions2.name })}`);
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

const party1 = new Party('flynger', [
    new Pokemon("bulbasaur", "bulby", "M", undefined, 7, undefined, undefined, "0", undefined, undefined, ["solarbeam", "fly"]),
    new Pokemon("articuno", "uno", "N", undefined, 10, undefined, undefined, "0", undefined, undefined, ["powdersnow"])
]);

const party2 = new Party('eichardo', [
    new Pokemon("pidgey", "Bird", "M", undefined, 11, undefined, undefined, undefined, undefined, undefined, ["gust"]),
    new Pokemon("butterfree", "sad", "M", undefined, 15, undefined, undefined, "0", undefined, undefined, ["confusion"])
]);

const battle = new SingleBattle(party1, party2);

battle.startRandomBattle();
askInput();

function askInput() {
    setTimeout(() => {
        rl.question('Enter p1 input:', input => {
            battle.stream.write(`>p1 ${input}`);
            rl.question('Enter p2 input:', input => {
                battle.stream.write(`>p2 ${input}`);
                askInput();
            });
        });
    }, 2000);
}


// battle.useMove(1, 1);
// battle.switchTo(2, 2);
// battle.switchTo(1, 2);
// battle.useMove(2, 1);
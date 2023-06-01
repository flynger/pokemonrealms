import { DefaultText } from 'pokemon-showdown/.data-dist/text/default.js';
import { MovesText } from 'pokemon-showdown/.data-dist/text/moves.js';
import { ItemsText } from 'pokemon-showdown/.data-dist/text/items.js';
import { AbilitiesText } from 'pokemon-showdown/.data-dist/text/abilities.js';
import { players } from './loginHandler.js';
import Showdown from 'pokemon-showdown';
const { BattleStream, getPlayerStreams, Dex } = Showdown;
// import * as readline from 'node:readline';
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

export default class SingleBattle {
    text = {
        fullName: "[NICKNAME] (**[SPECIES]**)",
        opposingPokemon: DefaultText.default.opposingPokemon,
        switchIn: DefaultText.default.switchIn,
        turn: DefaultText.default.turn,
        damagePercentage: " ", //DefaultText.default.damagePercentage,
        startBattle: DefaultText.default.startBattle,
        winBattle: DefaultText.default.winBattle,
        loseBattle: "You lost to **[TRAINER]**!",
        tieBattle: DefaultText.default.tieBattle,
        endBattle: "Battle ended"
    }

    constructor(party1, party2, canRun = false) {
        console.log("Making a battle...");
        this.canRun = canRun;
        this.party1 = party1;
        this.party2 = party2;

        this.party1.battle = this.party2.battle = this;
        this.stream = this.party1.stream = this.party2.stream = new BattleStream();

        this.preTurnData = [];
        (async () => {
            for await (const output of this.stream) {
                let outputArray = output.split("\n");
                switch (outputArray.shift()) {
                    case "update":
                        if (this.party1.isPlayer) this.createBattlePerspective(outputArray, "1");
                        if (this.party2.isPlayer) this.createBattlePerspective(outputArray, "2");
                        this.party1.data = this.party1.nextData;
                        this.party2.data = this.party2.nextData;
                        this.preTurnData = [];
                        break;
                    case "sideupdate":
                        let playerId = outputArray[0][1];
                        let lineArray = outputArray[1].slice(1).split("|");
                        let denoter = lineArray.shift();
                        switch (denoter) {
                            case "request":
                                let party = this["party" + playerId];
                                let options = JSON.parse(lineArray[0]);
                                if (party.isPlayer) {
                                    if (party.trainer.connected) {
                                        party.trainer.socket.emit("battleOptions", options);
                                    } else {
                                        // TODO: handle this   
                                    }
                                } else if (party.hasAI) {
                                    party.AI.setOptions(options);
                                } else {
                                    throw Error("Party wasn't recognized as Player or AI.");
                                }
                                party.nextData = options;
                                // console.log(options);
                                break;
                            case "error":
                                console.log(output);
                                console.log("Bad input for " + this["party" + playerId].name)
                        }
                    //console.log(outputArray)
                }
                //console.log(this.stream.battle.sides[0]); // Player battle and side data !!!
            }
        })();
    }

    createBattlePerspective(showdownOutputArray, thisPlayer = "1") {
        let battleData = [...this.preTurnData];
        // console.log("\n" + this["party" + thisPlayer].name + "'s perspective: \n");
        let splitCounter = 0; // split counter
        for (const line of showdownOutputArray) {
            // console.log(line);
            let lineArray = line.slice(1).split("|");
            let args = {}; //args to replace their respective fields in default.ts
            let battleDataProperties = {};
            let useArgs = true; // whether to replace args or not

            let isOwnPokemon = lineArray.length > 1 && (lineArray[1].includes("p1") || lineArray[1].includes("p2")) ? lineArray[1].slice(0, 2) == "p" + thisPlayer : null; // whether the message is about your pokemon or the opponent's
            let denoter = lineArray.shift();
            let message = DefaultText.default[denoter[0] == "-" ? denoter.substring(1) : denoter] || " ";
            if (splitCounter > 0) {
                // private information and switch out check
                if (splitCounter == 2) {
                    switch (denoter) {
                        case "switch":
                            var pokemonArgs = lineArray[0].split(": ");
                            var side = pokemonArgs[0][1];
                            var thisParty = this["party" + side];
                            if (thisParty.data && !thisParty.data.teamPreview && !thisParty.nextData.forcedSwitch) {
                                if (isOwnPokemon) {
                                    message = DefaultText.default.switchOutOwn;
                                } else {
                                    message = DefaultText.default.switchOut;
                                    args.TRAINER = thisParty.name;
                                }
                                battleDataProperties = {
                                    side: side == thisPlayer ? "you" : "foe",
                                    switchOut: true
                                };
                                args.NICKNAME = thisParty.data.side.pokemon.find((mon) => mon.active).ident.split(": ")[1];
                            } else {
                                // add logic to send private data to player
                                message = " ";
                            }

                            if (isOwnPokemon) {
                                if (!thisParty.data) thisParty.data = {};
                                thisParty.data.switchInCondition = lineArray[2];
                            }
                            break;
                        default:
                            message = " ";
                    }
                }
                // public information
                else {
                    switch (denoter) {
                        case "switch":
                            var pokemonArgs = lineArray[0].split(": ");
                            var side = pokemonArgs[0][1];
                            var thisParty = this["party" + side];
                            args.NICKNAME = pokemonArgs[1];
                            args.SPECIES = lineArray[1].split(", ")[0];
                            if (isOwnPokemon) {
                                message = DefaultText.default.switchInOwn;
                            } else if (!isOwnPokemon) {
                                message = this.text.switchIn;
                                args.TRAINER = thisParty.name;
                            }
                            battleDataProperties = {
                                side: side == thisPlayer ? "you" : "foe",
                                nickname: pokemonArgs[1],
                                switchIn: lineArray[1],
                                switchInCondition: isOwnPokemon ? thisParty.data.switchInCondition : lineArray[2]
                            };
                            // add logic to send public data to player
                            break;
                        case "-damage":
                            message = this.text.damagePercentage;
                            var pokemonArgs = lineArray[0].split(": ");
                            var pokemonIdentity = pokemonArgs[0].slice(0, -1) + ": " + pokemonArgs[1];
                            var side = pokemonArgs[0][1];
                            args.NICKNAME = pokemonArgs[1];

                            if (lineArray[2] && lineArray[2].startsWith("[from] ")) {
                                let effectDetails = lineArray[2].slice(7).split(": ");
                                let effectSourceType = effectDetails[0];
                                let effectSource = effectDetails[1] || effectDetails[0];
                                if (effectSourceType == "item" && ItemsText[Dex.items.get(effectSource).id].damage) {
                                    message = ItemsText[Dex.items.get(effectSource).id].damage;
                                } else if (effectSourceType == effectSource) {
                                    if (MovesText[Dex.moves.get(effectSource).id] && MovesText[Dex.moves.get(effectSource).id].damage) {
                                        message = MovesText[Dex.moves.get(effectSource).id].damage;
                                    }
                                    else message = DefaultText[effectSource.toLowerCase()].damage;
                                } else {
                                    //message = MovesText[Dex.moves.get(effectSource).id].damage;
                                }
                            }
                            var thisPartyData = this["party" + side].data;
                            var oldMonHP = thisPartyData.side.pokemon.find((mon) => mon.ident == pokemonIdentity).condition.split("/");
                            var oldPercentage = Math.ceil(+oldMonHP[0] / +oldMonHP[1].split(" ")[0] * 100);
                            var newPercentage = lineArray[1] == "0 fnt" ? 0 : +lineArray[1].split("/")[0];
                            oldMonHP[0] = +lineArray[1].split("/")[0];
                            args.PERCENTAGE = oldPercentage - newPercentage + "%";
                            battleDataProperties = {
                                side: side == thisPlayer ? "you" : "foe",
                                damageHPTo: newPercentage
                            };
                            break;
                        case "-heal":
                            var pokemonArgs = lineArray[0].split(": ");
                            var side = pokemonArgs[0][1];
                            args.NICKNAME = pokemonArgs[1];
                            var newPercentage = +lineArray[1].split("/")[0];
                            if (lineArray[2] && lineArray[2].startsWith("[from] ")) {
                                let effectDetails = lineArray[2].slice(7).split(": ");
                                let effectSourceType = effectDetails[0];
                                let effectSource = effectDetails[1];
                                if (effectSourceType == "item" && ItemsText[Dex.items.get(effectSource).id].heal) {
                                    message = ItemsText[Dex.items.get(effectSource).id].heal;
                                } else if (effectSourceType == "move" && MovesText[Dex.moves.get(effectSource).id].heal) {
                                    message = MovesText[Dex.moves.get(effectSource).id].heal;
                                } else if (effectSourceType == "drain") {
                                    message = DefaultText.drain.heal;
                                }
                            }
                            battleDataProperties = {
                                side: side == thisPlayer ? "you" : "foe",
                                damageHPTo: newPercentage
                            };
                            break;
                        default:
                            message = " ";
                    }
                }
                splitCounter--;
            } else {
                switch (denoter) {
                    case "cant":
                        args.NICKNAME = lineArray[0].split(": ")[1];
                        let reason = lineArray[1];
                        if (lineArray[2]) args.MOVE = lineArray[2];
                        if (DefaultText[reason]) message = DefaultText[reason].cant;
                        else message = DefaultText.default.cant;
                        break;
                    case "faint":
                        var pokemonArgs = lineArray[0].split(": ");
                        var side = pokemonArgs[0][1];
                        args.NICKNAME = pokemonArgs[1];
                        break;
                    case "move":
                        args.NICKNAME = lineArray[0].split(": ")[1];
                        args.MOVE = lineArray[1];
                        break;
                    case "split":
                        splitCounter = 2;
                        continue;
                    case "start":
                        message = this.text.startBattle.replace("[TRAINER]", this.party1.name).replace("[TRAINER]", this.party2.name);
                        useArgs = false;
                        break;
                    case "turn":
                        message = this.text.turn;
                        args.NUMBER = lineArray[0];
                        break;
                    case "win":
                        var thisParty = this["party" + thisPlayer];
                        var winner = lineArray[0];
                        if (winner == thisParty.name) {
                            message = this.text.winBattle;
                            args.TRAINER = winner;
                            if (thisParty.isPlayer && this.isWildBattle) {
                                this.onBattleWin();
                            }
                        } else {
                            message = this.text.loseBattle;
                            if (this.isWildBattle) {
                                message = message.replaceAll("[TRAINER]", "[TRAINER" + thisPlayer + "]");
                                args["TRAINER" + thisPlayer] = thisParty.name;
                                if (thisParty.isPlayer) {
                                    this.onBattleLose();
                                }
                            } else {
                                args.TRAINER = winner;
                            }
                        }
                        battleDataProperties = {
                            battleOver: true
                        };
                        this.endBattle();
                        break;
                    case "tie":
                        var thisParty = this["party" + thisPlayer];
                        if (thisParty.isPlayer && this.isWildBattle) {
                            this.onBattleLose();
                        }
                        message = this.text.tieBattle.replace("[TRAINER]", this.party1.isPlayer ? this.party1.name : this.party2.name).replace("[TRAINER]", this.party2.name);
                        battleDataProperties = {
                            battleOver: true
                        };
                        this.endBattle();
                        break;
                    case "-ability":
                        message = DefaultText.default.abilityActivation;
                        args.NICKNAME = lineArray[0].split(": ")[1];
                        args.ABILITY = lineArray[1];
                        if (lineArray[2] && lineArray[2].startsWith("[from] ")) {
                            let effectDetails = lineArray[2].slice(7).split(": ");
                            let effectSourceType = effectDetails[0];
                            let effectSource = effectDetails[1] || effectDetails[0];
                            if (effectSourceType == "ability") {
                                if (AbilitiesText[Dex.abilities.get(effectSource).id].changeAbility) {
                                    message = AbilitiesText[Dex.abilities.get(effectSource).id].changeAbility;
                                }
                            }
                        }
                        if (lineArray[3] && lineArray[3].startsWith("[of] ")) {
                            args.SOURCE = lineArray[3].slice(5).split(": ")[1];
                        }
                        break;
                    case "-activate":
                        args.NICKNAME = lineArray[0].split(": ")[1];
                        let activateDetails = lineArray[1].split(": ");
                        let activateSourceType = activateDetails[0];
                        let activateSource = activateDetails[1] || activateDetails[0];
                        if (activateSourceType == "move") {
                            if (MovesText[Dex.moves.get(activateSource).id].start) {
                                message = MovesText[Dex.moves.get(activateSource).id].start;
                            }
                        } else if (activateSourceType == "ability") {
                            if (AbilitiesText[Dex.abilities.get(activateSource).id].start) {
                                message = AbilitiesText[Dex.abilities.get(activateSource).id].start;
                            } else {
                                args.ABILITY = activateSource;
                                message = DefaultText.default.abilityActivation;
                            }
                        }
                        if (lineArray[2] && lineArray[2].startsWith("[of] ")) {
                            args.SOURCE = lineArray[2].slice(5).split(": ")[1];
                        }
                        break;
                    case "-boost":
                        var amount = lineArray[2];
                        if (amount != "1") {
                            message = DefaultText.default["boost" + amount];
                        }
                        args.NICKNAME = lineArray[0].split(": ")[1];
                        args.STAT = DefaultText[lineArray[1]].statName;
                        break;
                    case "-curestatus":
                        args.NICKNAME = lineArray[0].split(": ")[1];
                        let status = lineArray[1];
                        message = DefaultText[status] ? DefaultText[status].end : "Debug: " + status + " start on [NICKNAME]";
                    case "-miss":
                        isOwnPokemon = !isOwnPokemon;
                        args.NICKNAME = lineArray[1].split(": ")[1];
                        break;
                    case "-prepare":
                        message = MovesText[Dex.moves.get(lineArray[1]).id].prepare;
                        args.NICKNAME = lineArray[0].split(": ")[1];
                        break;
                    case "-singleturn":
                        var effectDetails = lineArray[1].split(": ");
                        var effectSourceType = effectDetails[0];
                        var effectSource = effectDetails[1];
                        if (effectSourceType == "move" || MovesText[Dex.moves.get(effectSource).id]) {
                            message = MovesText[Dex.moves.get(effectSource).id].start;
                        } else {
                            message = DefaultText[effectSourceType] ? DefaultText[effectSourceType].start : " ";
                        }
                        args.NICKNAME = lineArray[0].split(": ")[1];
                        break;
                    case "-start":
                        // note: fix Substitute unrelated but also Volt Switch
                        console.log(line);
                        var effectDetails = lineArray[1].split(": ");
                        var effectSourceType = effectDetails[0];
                        var effectSource = effectDetails[1] || effectSourceType;
                        if (!DefaultText[effectSourceType] && MovesText[Dex.moves.get(effectSource).id]) {
                            message = MovesText[Dex.moves.get(effectSource).id].start;
                        } else {
                            message = DefaultText[effectSourceType] ? DefaultText[effectSourceType].start : "Debug: " + effectSource + " start on [NICKNAME]";
                        }
                        args.NICKNAME = lineArray[0].split(": ")[1];
                        break;
                    case "-status":
                        var statusEffect = lineArray[1];
                        message = DefaultText[statusEffect].start;
                        args.NICKNAME = lineArray[0].split(": ")[1];
                        break;
                    case "-supereffective":
                        message = DefaultText.default.superEffective;
                        useArgs = false;
                        break;
                    case "-unboost":
                        var amount = lineArray[2];
                        if (amount != "1") {
                            message = DefaultText.default["unboost" + amount];
                        }
                        args.NICKNAME = lineArray[0].split(": ")[1];
                        args.STAT = DefaultText[lineArray[1]].statName;
                        break;
                    default:
                    //message = " ";
                }
            }
            let firstWordIsName = false;
            if (useArgs) {
                if (message.includes("[POKEMON]")) {
                    message = message.replace("[POKEMON]", isOwnPokemon ? DefaultText.default.pokemon : this.text.opposingPokemon);
                } else if (message.includes("[FULLNAME]")) {
                    message = message.replace("[FULLNAME]", this.text.fullName);
                }

                let firstLetter = message.search(/[a-zA-Z]/); // find first letter of string
                if (firstLetter == message.search("[NICKNAME]") || firstLetter == message.search("[TRAINER]") || firstLetter == message.search("[TRAINER1]") || firstLetter == message.search("[TRAINER2]")) {
                    firstWordIsName = true; // protect nicknames & trainer names from capitalization
                }
                for (let arg in args) {
                    message = message.replaceAll(`[${arg}]`, args[arg]);
                }
            }
            let firstLetter = message.search(/[a-zA-Z]/); // find first letter of string
            if (!firstWordIsName && firstLetter != message.search(/[A-Z]/)) {
                message = message.substring(0, firstLetter) + message[firstLetter].toUpperCase() + message.substring(firstLetter + 1);
            }

            // add battle message packet
            if (message != " " || Object.keys(battleDataProperties).length > 0) {
                battleData.push({
                    message,
                    ...battleDataProperties
                });
            }
            //console.log(line + " ".repeat(70 >= line.length ? 70 - line.length : 0) + " ===>      " + message); // formatting to compare old output to our new, processed output
        }
        if (battleData.length > 0 && this["party" + thisPlayer].isPlayer) {
            // TODO: make a room for battle emits later
            let player = players[this["party" + thisPlayer].name.toLowerCase()];
            if (player && player.connected) {
                console.log(battleData);
                player.socket.emit("battleData", battleData);
            }
            // console.log(this.stream.battle.sides[1].active[0].happiness = 0);
        }
    }

    getPlayerId(player) {
        return this.party1.name == player ? 1 : this.party2.name == player ? 2 : -1;
    }

    startBattle() {
        let player1 = {
            name: this.party1.name,
            team: this.party1.exportTeam()
        };
        let player2 = {
            name: this.party2.name,
            team: this.party2.exportTeam()
        };
        this.stream.write(`>start {"formatid":"gen7custom"}`);
        this.stream.write(`>player p1 ${JSON.stringify(player1)}`);
        this.stream.write(`>player p2 ${JSON.stringify(player2)}`);
        // this.stream.write(`>p1 team 123456`);
        // this.stream.write(`>p2 team 123456`);
    }

    startRandomBattle() {
        this.stream.write(`>start {"formatid":"gen7randombattle"}`);
        this.stream.write(`>player p1 ${JSON.stringify({ name: this.party1.name })}`);
        this.stream.write(`>player p2 ${JSON.stringify({ name: this.party2.name })}`);
    }

    // useMove(playerId, moveInput) {
    //     if (this["party" + playerId]) {
    //         this.stream.write(`>p${playerId} move ${moveInput}`);
    //     } else {
    //         throw Error("Turn input wasn't recognized as being from a valid Party.");
    //     }
    // }

    // switchTo(playerId, switchInput) {
    //     if (this["party" + playerId]) {
    //         this.stream.write(`>p${playerId} switch ${switchInput}`);
    //     } else {
    //         throw Error("Turn input wasn't recognized as being from a valid Party.");
    //     }
    // }

    endBattle(forced = false, endData = []) {
        let ids = [1, 2];
        for (let id of ids) {
            if (this["party" + id].isPlayer) {
                let player = this["party" + id].trainer;
                if (player) {
                    player.battle = null;
                    if (forced && player.connected) {
                        let endMessages = endData.length ? endData : [{ message: this.text.endBattle.replace("[TRAINER]", player.displayName) }];
                        endMessages[endMessages.length - 1].battleOver = true;
                        player.socket.emit("endBattle", endMessages);
                    }
                }
            }
        }
    }

    destroy() {
        this.stream.destroy();
    }
}

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
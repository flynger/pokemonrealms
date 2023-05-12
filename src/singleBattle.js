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
        opposingPokemon: DefaultText.default.opposingPokemon,
        switchIn: DefaultText.default.switchIn,
        endBattle: "Battle ended"
    }

    constructor(party1, party2, canRun = false) {
        console.log("Making a battle...");
        this.canRun = canRun;
        this.player1 = party1;
        this.player2 = party2;

        this.stream = new BattleStream();
        this.output = "";
        (async () => {
            for await (const output of this.stream) {
                let outputArray = output.split("\n");
                switch (outputArray.shift()) {
                    case "update":
                        if (this.player1.isPlayer) this.createBattlePerspective(outputArray, "1");
                        if (this.player2.isPlayer) this.createBattlePerspective(outputArray, "2");
                        this.player1.data = this.player1.nextData;
                        this.player2.data = this.player2.nextData;
                        break;
                    case "sideupdate":
                        let playerId = outputArray[0][1];
                        let lineArray = outputArray[1].slice(1).split("|");
                        let denoter = lineArray.shift();
                        switch (denoter) {
                            case "request":
                                let options = JSON.parse(lineArray[0]);
                                if (this["player" + playerId].isPlayer) {
                                    let player = players[this["player" + playerId].name];
                                    if (player && player.connected) {
                                        player.socket.emit("battleOptions", options);
                                    }
                                }
                                this["player" + playerId].nextData = options;
                                console.log(options);
                                break;
                            case "error":
                                console.log("Bad input for " + this["player" + playerId].name)
                        }
                    //console.log(outputArray)
                }
            }
        })();
    }

    createBattlePerspective(showdownOutputArray, thisPlayer = "1") {
        console.log("\n" + this["player" + thisPlayer].name + "'s perspective: \n");
        let splitCounter = 0; // split counter
        for (const line of showdownOutputArray) {
            let lineArray = line.slice(1).split("|");
            let args = {}; //args to replace their respective fields in default.ts
            let useArgs = true; // whether to replace args or not

            let isOwnPokemon = lineArray.length > 1 && (lineArray[1].includes("p1") || lineArray[1].includes("p2")) ? lineArray[1].slice(0, 2) == "p" + thisPlayer : null; // whether the message is about your pokemon or the opponent's
            let denoter = lineArray.shift();
            let messageText = DefaultText.default[denoter[0] == "-" ? denoter.substring(1) : denoter] || " ";
            if (splitCounter > 0) {
                // private information and switch out check
                if (splitCounter == 2) {
                    switch (denoter) {
                        case "switch":
                            var pokemonArgs = lineArray[0].split(": ");
                            var side = pokemonArgs[0][1];
                            var thisParty = this["player" + side];
                            if (thisParty.data && !thisParty.data.teamPreview && !thisParty.nextData.forcedSwitch) {
                                if (isOwnPokemon) {
                                    messageText = DefaultText.default.switchOutOwn;
                                } else {
                                    messageText = DefaultText.default.switchOut;
                                    args.TRAINER = thisParty.name;
                                }
                                args.NICKNAME = thisParty.data.side.pokemon.find((mon) => mon.active).ident.split(": ")[1];
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
                            var pokemonArgs = lineArray[0].split(": ");
                            var side = pokemonArgs[0][1];
                            args.NICKNAME = pokemonArgs[1];
                            args.SPECIES = lineArray[1].split(", ")[0];
                            if (isOwnPokemon) {
                                messageText = DefaultText.default.switchInOwn;
                            } else if (!isOwnPokemon) {
                                messageText = this.text.switchIn;
                                args.TRAINER = this["player" + side].name;
                            }
                            // add logic to send public data to player
                            break;
                        case "-damage":
                            messageText = DefaultText.default.damagePercentage;
                            var pokemonArgs = lineArray[0].split(": ");
                            var pokemonIdentity = pokemonArgs[0].slice(0, -1) + ": " + pokemonArgs[1];
                            var side = pokemonArgs[0][1];
                            args.NICKNAME = pokemonArgs[1];

                            if (lineArray[2] && lineArray[2].startsWith("[from] ")) {
                                let effectDetails = lineArray[2].slice(7).split(": ");
                                let effectSourceType = effectDetails[0];
                                let effectSource = effectDetails[1] || effectDetails[0];
                                if (effectSourceType == "item" && ItemsText[Dex.items.get(effectSource).id].damage) {
                                    messageText = ItemsText[Dex.items.get(effectSource).id].damage;
                                } else if (effectSourceType == effectSource) {
                                    if (MovesText[Dex.moves.get(effectSource).id] && MovesText[Dex.moves.get(effectSource).id].damage) {
                                        messageText = MovesText[Dex.moves.get(effectSource).id].damage;
                                    }
                                    else messageText = DefaultText[effectSource].damage;
                                } else {
                                    //messageText = MovesText[Dex.moves.get(effectSource).id].damage;
                                }
                            }
                            var thisPartyData = this["player" + side].data;
                            var oldMonHP = thisPartyData.side.pokemon.find((mon) => mon.ident == pokemonIdentity).condition.split("/");
                            var oldPercentage = Math.ceil(+oldMonHP[0] / +oldMonHP[1].split(" ")[0] * 100);
                            var newPercentage = lineArray[1] == "0 fnt" ? 0 : +lineArray[1].split("/")[0];
                            args.PERCENTAGE = oldPercentage - newPercentage + "%";
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
                                    messageText = ItemsText[Dex.items.get(effectSource).id].heal;
                                } else if (effectSourceType == "move" && MovesText[Dex.moves.get(effectSource).id].heal) {
                                    messageText = MovesText[Dex.moves.get(effectSource).id].heal;
                                } else if (effectSourceType == "drain") {
                                    messageText = DefaultText.drain.heal;
                                }
                            }
                            break;
                        default:
                            messageText = " ";
                    }
                }
                splitCounter--;
            } else {
                switch (denoter) {
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
                        messageText = DefaultText.default.startBattle.replace("[TRAINER]", this.player1.name).replace("[TRAINER]", this.player2.name);
                        useArgs = false;
                        break;
                    case "turn":
                        args.NUMBER = lineArray[0];
                        break;
                    case "-ability":
                        messageText = DefaultText.default.abilityActivation;
                        args.NICKNAME = lineArray[0].split(": ")[1];
                        args.ABILITY = lineArray[1];
                        if (lineArray[2] && lineArray[2].startsWith("[from] ")) {
                            let effectDetails = lineArray[2].slice(7).split(": ");
                            let effectSourceType = effectDetails[0];
                            let effectSource = effectDetails[1] || effectDetails[0];
                            if (effectSourceType == "ability") {
                                if (AbilitiesText[Dex.abilities.get(effectSource).id].changeAbility) {
                                    messageText = AbilitiesText[Dex.abilities.get(effectSource).id].changeAbility;
                                }
                            }
                        }
                        if (lineArray[3] && lineArray[3].startsWith("[of] ")) {
                            args.SOURCE = lineArray[3].slice(5).split(": ")[1];
                        }
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
                    case "-status":
                        var statusEffect = lineArray[1];
                        messageText = DefaultText[statusEffect].start;
                        args.NICKNAME = lineArray[0].split(": ")[1];
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
                    messageText = messageText.replace("[POKEMON]", isOwnPokemon ? DefaultText.default.pokemon : this.text.opposingPokemon);
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

            if (this["player" + thisPlayer].isPlayer && messageText != " ") {
                // TODO: make a room for battle emits later
                let player = players[this["player" + thisPlayer].name];
                if (player && player.connected) {
                    player.socket.emit("battleData", messageText);
                }
                console.log(messageText);
                this.output += messageText + "\n";
            }
            //console.log(line + " ".repeat(70 >= line.length ? 70 - line.length : 0) + " ===>      " + messageText); // formatting to compare old output to our new, processed output
        }
    }

    getPlayerId(player) {
        return this.player1.name == player ? 1 : this.player2.name == player ? 2 : -1;
    }

    startBattle() {
        let player1 = {
            name: this.player1.name,
            team: this.player1.exportTeam()
        };
        let player2 = {
            name: this.player2.name,
            team: this.player2.exportTeam()
        };
        this.stream.write(`>start {"formatid":"gen7custom"}`);
        this.stream.write(`>player p1 ${JSON.stringify(player1)}`);
        this.stream.write(`>player p2 ${JSON.stringify(player2)}`);
        // this.stream.write(`>p1 team 123456`);
        // this.stream.write(`>p2 team 123456`);
    }

    startRandomBattle() {
        this.stream.write(`>start {"formatid":"gen7randombattle"}`);
        this.stream.write(`>player p1 ${JSON.stringify({ name: this.player1.name })}`);
        this.stream.write(`>player p2 ${JSON.stringify({ name: this.player2.name })}`);
    }

    useMove(partyName, moveNumber) {
        let playerId = this.getPlayerId(partyName);
        if (playerId == 1) {
            this.stream.write(`>p1 move ${moveNumber}`);
        } else if (playerId == 2) {
            this.stream.write(`>p2 move ${moveNumber}`)
        }
    }

    switchTo(partyName, switchNumber) {
        let playerId = this.getPlayerId(partyName);
        if (playerId == 1) {
            this.stream.write(`>p1 switch ${switchNumber}`);
        } else if (playerId == 2) {
            this.stream.write(`>p2 switch ${switchNumber}`);
        }
    }

    endBattle() {
        this.stream.destroy();
        let players = [1, 2];
        for (let id of players) {
            if (this["player" + id].isPlayer) {
                let player = players[this["player" + id].name];
                if (player) {
                    player.battle = null;
                    if (player.connected) player.socket.emit("endBattle", this.text.endBattle);
                }
            }
        }
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
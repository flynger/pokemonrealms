/*
Alex G, flynger, Richard W, Harry

Implements Client class
*/
class client {
    static link = window.location.host;
    static latency = -1;
    static username;
    static firstJoin = true;
    static player = null;

    static setup() {
        this.socket = io.connect(this.link);

        //implements the /ping command
        setInterval(() => {
            const start = Date.now();

            this.socket.emit("ping", () => {
                const duration = Date.now() - start;
                this.latency = duration;
            });
        }, 1000);

        // Updates the time and effects of the day from data recieved from server
        this.socket.on("timeChange", (data) => {
            let timeString = "" + data.exactTime;
            while (timeString.length < 4) {
                timeString = "0" + timeString;
            }
            let hour = timeString.slice(0, 2);
            let minute = timeString.slice(2, 4);

            let timeFromMidnight;
            let nightEffects = false;
            if (+hour < 6 || timeString == "0600") {
                timeFromMidnight = 100 * (+hour + +minute / 60);
                nightEffects = true;

            } else if (+hour >= 18) {
                timeFromMidnight = 2400 - 100 * (+hour + +minute / 60);
                nightEffects = true;
            }
            if (nightEffects) {
                let rg = (Math.floor(150 + 105 / 600 * timeFromMidnight)).toString(16);
                // console.log( { timeString, timeFromMidnight, rg });
                colorMatrix.tint("#" + rg.repeat(2) + "FF");
            }

            if (hour == "00") hour = "12"; // set hour 0 to 12
            if (+hour > 12) hour = +hour - 12 + ""; // keep hour within 1 to 12
            if (hour[0] == "0") hour = hour[1]; // remove leading 0 if single digit hour
            timeString = hour + ":" + minute + " " + (data.exactTime < 1200 ? "AM" : "PM")
            let timeOfDay = data.time[0].toUpperCase() + data.time.slice(1);
            $("#timeLabel").html(timeOfDay + " - " + timeString);
        });

        //connect command
        this.socket.on("mapData", (name, playersArray, locationData, collideables, grasses, water) => {
            if (this.player) {
                this.player.busy = true;
            }

            $("#warpOverlay").addClass('warp');
            gameDiv.prepend(app.view);

            setTimeout(async () => {
                if (map.name) destroyMap();
                if (Object.keys(players).length > 0) {
                    for (let name in players) {
                        players[name].destroy();
                    }
                }
                collideables.push(...water)
                await loadMap(locationData.map, locationData.submap, collideables, grasses);

                if (!this.firstJoin) window.location.reload();
                // add fix for reconnect properly instead of jank reload
                console.log({ playersArray });
                this.username = name;
                loadPlayers(playersArray);
                $('#message').modal('hide');
            }, 750);
            setTimeout(() => {
                $("#warpOverlay").removeClass('warp');
            }, 1500);
        });

        // updates the player's direction, coordinates, and sprites
        this.socket.on("playerMovement", (data) => {
            let { name, x, y, facing, currentFrame } = data;
            if (!players[name]) new player(name, "red", x, y, facing);
            else {
                players[name].moveTo(x, y);
                players[name].updateSprite();
                players[name].setFacing(facing);
            }
            players[name].headSprite.currentFrame = players[name].bodySprite.currentFrame = currentFrame;
        });

        // Removes other players when they disconnect or move to another map
        this.socket.on("playerDisconnect", (name) => {
            // when a player disconnects
            if (name in players) {
                players[name].nameTagText.destroy();
                players[name].nameTagBack.destroy();
                players[name].headSprite.destroy();
                players[name].bodySprite.destroy();
                //players[name].grassUpdate(true);
                delete players[name];
            }
        });

        // Shows UI for trade request and emits a trade request to the user
        this.socket.on("tradeRequest", (user) => {
            $('#message').modal({ backdrop: 'static' });
            $('#message').modal('show');
            $('#message-title').text("Trade Request");
            //const pokemonName = pokemon ? pokemon.name || pokemon.species : '';
            $('#message-body').text(`${user} has sent you a trade request. Accept?`);
            $('#blueModalBtn').text("Accept!");
            $('#grayModalBtn').text("Decline");
            $('#blueModalBtn').off('click');
            $('#blueModalBtn').on('click', () => {
                this.socket.emit("tradeRequest", user);
                $('#message').modal('hide');
            });
            $('#grayModalBtn').off('click');
            $('#grayModalBtn').on('click', () => $('#message').modal('hide'));
            $('#blueModalBtn').show();
            $('#grayModalBtn').show();
        });

        // debug commands
        this.socket.on("startTrade", (user) => {
            console.log(`Starting trade with ${user}...`);
        });

        this.socket.on("tradeOffers", (myOffers, theirOffers) => {
            console.log({ myOffers, theirOffers });
        });

        this.socket.on("acceptTrade", (data) => {
            //do trade animation
            console.log(`Succesfully traded`)
        });

        // Shows UI for battle request and emits a battle request to the user
        this.socket.on("battleRequest", (user) => {
            $('#message').modal({ backdrop: 'static' });
            $('#message').modal('show');
            $('#message-title').text("Battle request");
            $('#message-body').text(user + " has sent you a battle request. Accept?");
            $('#blueModalBtn').text("Let's battle!");
            $('#grayModalBtn').text("Ignore");
            $('#blueModalBtn').off('click');
            $('#blueModalBtn').on('click', () => {
                sendBattleRequest(user);
                $('#message').modal('hide');
            });
            $('#grayModalBtn').off('click');
            $('#grayModalBtn').on('click', () => $('#message').modal('hide'));
            $('#blueModalBtn').show();
            $('#grayModalBtn').show();
        });

        // Shows battle UI on start of battle
        this.socket.on("startBattle", (showWaitMessage) => {
            $("#info-you").hide();
            $("#info-foe").hide();
            $("#battle-UI").show();
            $("#party-div").hide();
            battle.isBattleActive = true;
            filterBagInvAndGenerate("All");
            battle.waitMessage = showWaitMessage ? "Waiting for other player..." : "";
            this.player.busy = true;
            app.view.style.filter = "blur(0.2em)";
            battle.setup();
        });

        // Recieves battle data
        this.socket.on("battleData", (newBattleData) => {
            console.log({ newBattleData });
            battle.battleData.push(...newBattleData);
            if (!battle.dialoguePlaying) battle.nextAction();
        });

        // Shows battle options
        this.socket.on("battleOptions", (newBattleOptions) => {
            console.log({ newBattleOptions });
            battle.battleOptions = newBattleOptions;
            battle.updateMoveChoices();
        });

        // End of battle
        this.socket.on("endBattle", (endData) => {
            battle.battleData.push(...endData);
            if (!battle.dialoguePlaying) battle.nextAction();
        });

        this.socket.on("pokemartData", (catalog) => {
            console.log({ catalog });
        });

        this.socket.on("itemData", items => {
            Items = items;
        });

        this.socket.on("balanceUpdate", (newBalance) => {
            console.log({ newBalance });
        });

        this.socket.on("pcUpdate", (newPokemon) => {
            pokemonArr = newPokemon;
            filterPcAndGenerate();
        });

        // Calls functions to update player inventory
        this.socket.on("inventoryUpdate", (newInventory) => {
            // console.log({ newInventory });
            inventory = newInventory;
            updateInventory();
            filterInvAndGenerate();
        });

        // Calls function to update party UI
        this.socket.on("partyUpdate", (newParty) => {
            party = newParty;
            updatePartyMembers();
        });

        this.socket.on("pong", (ms) => {
            this.latency = ms;
        });

        // Message on disconnect from server
        this.socket.on("disconnect", (reason) => {
            $('#message').modal({ backdrop: 'static', keyboard: false });
            $('#message').modal('show');
            $('#message-title').text("Disconnected from server");
            $('#message-body').text(reason);
            $('#blueModalBtn').text("Go home");
            $('#grayModalBtn').text("Exit game");
            $('#blueModalBtn').on('click', () => window.location.href = "/home");
            $('#grayModalBtn').on('click', () => window.location.href = "https://www.google.com");
            $('#blueModalBtn').show();
            $('#grayModalBtn').show();
            gameDiv.removeChild(app.view);
            this.firstJoin = false;
            // if (isBattleActive) {
            //     $("#battle-UI").hide();
            // }
        });
    }
}

// Sends shop data and actions to server
function addBal(amount) {
    client.socket.emit("addBal", amount);
}
function removeBal(amount) {
    client.socket.emit("removeBal", amount);
}
function openPokemart(id) {
    client.socket.emit("openPokemart", id);
}
function buyItem(id, quantity) {
    client.socket.emit("buyItem", id, quantity);
}
function sellItem(id, quantity) {
    client.socket.emit("sellItem", id, quantity);
}

// Sends battle and trade data and requests
function sendBattleRequest(user) {
    client.socket.emit("battleRequest", user);
}
function sendTradeRequest(user) {
    client.socket.emit("tradeRequest", user);
}
function acceptTrade(data) {
    client.socket.emit("acceptTrade", data);
}

// Sends updated party information
function swapPartySlots(slot1, slot2) {
    client.socket.emit("swapPartySlots", slot1, slot2);
}
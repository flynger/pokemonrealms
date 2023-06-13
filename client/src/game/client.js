/*
Alex Ge, Arnav Singh, Richard Wei, Will Gannon, Harry Liu

This file implements main client-sided functionality 
*/
var link = window.location.host;
var socket;
var latency = -1;
var username;
var time;
var party;
let firstJoin = true;

function setupSocket() {
    socket = io.connect(link);
    //implements the /ping command
    setInterval(() => {
        const start = Date.now();

        socket.emit("ping", () => {
            const duration = Date.now() - start;
            latency = duration;
        });
    }, 1000);

    // Updates the time and effects of the day from data recieved from server
    socket.on("timeChange", (data) => {
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
    socket.on("mapData", async (locationData, collideables, grasses, water) => {
        if (map.name) destroyMap();
        collideables.push(...water)
        await loadMap(locationData.map, locationData.submap, collideables, grasses);
        gameDiv.prepend(app.view);
    });

    // loads the players on the map
    socket.on("playerData", (name, playersArray) => {
        if (!firstJoin) window.location.reload();
        // add fix for reconnect properly instead of jank reload
        if (Object.keys(players).length > 0) {
            for (let name in players) {
                players[name].destroy();
            }
        }
        console.log({ playersArray });
        username = name;
        loadPlayers(playersArray);
        $('#message').modal('hide');
    });

    // updates the player's direction, coordinates, and sprites
    socket.on("playerMovement", (data) => {
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
    socket.on("playerDisconnect", (name) => {
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
    socket.on("tradeRequest", (user) => {
        $('#message').modal({ backdrop: 'static' });
        $('#message').modal('show');
        $('#message-title').text("Trade Request");
        //const pokemonName = pokemon ? pokemon.name || pokemon.species : '';
        $('#message-body').text(`${user} has sent you a trade request. Accept?`);
        $('#blueModalBtn').text("Accept!");
        $('#grayModalBtn').text("Decline");
        $('#blueModalBtn').off('click');
        $('#blueModalBtn').on('click', () => {
            console.log(`username: ${username} user: ${user}`);
            socket.emit("tradeRequest", user);
            $('#message').modal('hide');
        });
        $('#grayModalBtn').off('click');
        $('#grayModalBtn').on('click', () => $('#message').modal('hide'));
        $('#blueModalBtn').show();
        $('#grayModalBtn').show();
    });

    // debug commands
    socket.on("startTrade", (user) => {
        console.log(`Starting trade with ${user}...`);
    });

    socket.on("tradeOffers", (myOffers, theirOffers) => {
        console.log({ myOffers, theirOffers });
    });

    socket.on("acceptTrade", (data) => {
        //do trade animation
        console.log(`Succesfully traded`)
    });

    // Shows UI for battle request and emits a battle request to the user
    socket.on("battleRequest", (user) => {
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
    socket.on("startBattle", (showWaitMessage) => {
        $("#info-you").hide();
        $("#info-foe").hide();
        $("#battle-UI").show();
        $("#party-div").hide();
        isBattleActive = true;
        filterBagInvAndGenerate("All");
        waitMessage = showWaitMessage ? "Waiting for other player..." : "";
        players[username].busy = true;
        app.view.style.filter = "blur(0.2em)";
    });

    // Recieves battle data
    socket.on("battleData", (newBattleData) => {
        console.log({ newBattleData });
        battleData.push(...newBattleData);
        if (!dialoguePlaying) nextAction();
    });

    // Shows battle options
    socket.on("battleOptions", (newBattleOptions) => {
        console.log({ newBattleOptions });
        battleOptions = newBattleOptions;
        updateMoveChoices();
    });

    // End of battle
    socket.on("endBattle", (endData) => {
        battleData.push(...endData);
        if (!dialoguePlaying) nextAction();
    });

    socket.on("pokemartData", (catalog) => {
        console.log({ catalog });
    });

    socket.on("itemData", items => {
        Items = items;
    });

    socket.on("balanceUpdate", (newBalance) => {
        console.log({ newBalance });
    });

    // Calls functions to update player inventory
    socket.on("inventoryUpdate", (newInventory) => {
        console.log({ newInventory });
        inventory = newInventory;
        updateInventory();
        filterInvAndGenerate();
    });

    // Calls function to update party UI
    socket.on("partyUpdate", (newParty) => {
        party = newParty;
        updatePartyMembers();
    });

    socket.on("pong", (ms) => {
        latency = ms;
    });

    // Message on disconnect from server
    socket.on("disconnect", (reason) => {
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
        firstJoin = false;
        // if (isBattleActive) {
        //     $("#battle-UI").hide();
        // }
    });
}

// Sends shop data and actions to server
function addBal(amount) {
    socket.emit("addBal", amount);
}
function removeBal(amount) {
    socket.emit("removeBal", amount);
}
function openPokemart(id) {
    socket.emit("openPokemart", id);
}
function buyItem(id, quantity) {
    socket.emit("buyItem", id, quantity);
}
function sellItem(id, quantity) {
    socket.emit("sellItem", id, quantity);
}

// Sends battle and trade data and requests
function sendBattleRequest(user) {
    socket.emit("battleRequest", user);
}
function sendTradeRequest(user) {
    socket.emit("tradeRequest", user);
}
function acceptTrade(data) {
    socket.emit("acceptTrade", data);
}

// Sends updated party information
function swapPartySlots(slot1, slot2) {
    socket.emit("swapPartySlots", slot1, slot2);
}
/*
Alex Ge, Arnav Singh, Richard Wei, Will Gannon, Harry Liu

This file implements main client-sided functionality 
*/
var link = window.location.host;
var socket;
var latency = -1;
var username;
var time;

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

    socket.on("timeChange", (data) => {
        let timeString = "" + data.exactTime;
        while (timeString.length < 4) {
            timeString = "0" + timeString;
        }
        let hour = timeString.slice(0, 2);
        let minute = timeString.slice(2, 4);
        if (hour == "00") hour = "12"; // set hour 0 to 12
        if (+hour > 12) hour = +hour - 12 + ""; // keep hour within 1 to 12
        if (hour[0] == "0") hour = hour[1]; // remove leading 0 if single digit hour
        timeString = hour + ":" + minute + " " + (data.exactTime < 1200 ? "AM" : "PM")
        let timeOfDay = data.time[0].toUpperCase() + data.time.slice(1);
        $("#timeLabel").html(timeOfDay + " - " + timeString);
    });

    //connect command
    socket.on("playerData", (name, playersArray) => {
        // add fix for reconnect properly instead of jank reload
        if (Object.values(players).length > 0) {
            window.location.reload();
        }
        console.log(playersArray);
        username = name;
        loadPlayersAndGame(playersArray);
        $('#message').modal('hide');
    });

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

    socket.on("tradeRequest", (user, pokemon) => {
        $('#message').modal({ backdrop: 'static' });
        $('#message').modal('show');
        $('#message-title').text("Trade Request");
        const pokemonName = pokemon ? pokemon.name || pokemon.species : '';
        $('#message-body').text(`${user} has sent you a trade request for ${pokemonName}. Accept?`);
        $('#blueModalBtn').text("Accept!");
        $('#grayModalBtn').text("Decline");
        $('#blueModalBtn').on('click', () => {
            console.log(`username: ${username} user: ${user}`);
            acceptTrade({
                player1: user,
                player2: username,
                pokemonSlot1: 1,
                pokemonSlot2: 1
            });
            $('#message').modal('hide');
        });
        $('#grayModalBtn').on('click', () => $('#message').modal('hide'));
        $('#blueModalBtn').show();
        $('#grayModalBtn').show();
    });

    socket.on("acceptTrade", (data) => {
        //do trade animation
        console.log(`Succesfully traded`)
    });

    socket.on("battleRequest", (user) => {
        $('#message').modal({ backdrop: 'static' });
        $('#message').modal('show');
        $('#message-title').text("Battle request");
        $('#message-body').text(user + " has sent you a battle request. Accept?");
        $('#blueModalBtn').text("Let's battle!");
        $('#grayModalBtn').text("Ignore");
        $('#blueModalBtn').on('click', () => {
            battleRequest(user);
            $('#message').modal('hide');
        });
        $('#grayModalBtn').on('click', () => $('#message').modal('hide'));
        $('#blueModalBtn').show();
        $('#grayModalBtn').show();
    });

    socket.on("startBattle", (playerPokemon, wildPokemon) => {
        $("#battle-UI").show();
        showPokemonYou(playerPokemon);
        showPokemonFoe(wildPokemon);
        players[username].busy = true;
        app.view.style.filter = "blur(0.2em)";
        console.log(`Starting battle between ${playerPokemon} and ${wildPokemon}!!!!!!!!!!!!!!!!!!`)
    });

    socket.on("battleData", (newBattleData) => {
        console.log({ newBattleData });
        battleData.push(...newBattleData);
        if (!dialoguePlaying) nextAction();
    });

    socket.on("battleOptions", (newBattleOptions) => {
        console.log({ moves: newBattleOptions.active[0].moves });
        battleOptions = newBattleOptions;
        updateMoveChoices();
    });

    socket.on("endBattle", (data) => {
        battleData.push(data);
        if (!dialoguePlaying) nextAction();
    });

    socket.on("pong", (ms) => {
        latency = ms;
    });

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
    });
}

function battleRequest(user) {
    socket.emit("battleRequest", user);
}
function tradeRequest(user, pokemon) {
    socket.emit("tradeRequest", user, pokemon);
}
function acceptTrade(data) {
    socket.emit("acceptTrade", data);
}
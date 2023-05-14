/*
Alex Ge, Arnav Singh, Richard Wei, Will Gannon, Harry Liu

This file implements main client-sided functionality 
*/
var link = window.location.host;
var socket;
var latency = -1;
var username;

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

    socket.on("startBattle", (playerPokemon, wildPokemon) => {
        $("#battle-UI").show();
        showPokemonYou(playerPokemon);
        showPokemonFoe(wildPokemon);
        players[username].busy = true;
        app.view.style.filter = "blur(0.2em)";
        console.log(`Starting battle between ${playerPokemon} and ${wildPokemon}!!!!!!!!!!!!!!!!!!`)
    });

    socket.on("battleData", (data) => {
        console.log(data);
        battleData.push(...data);
        if (!dialoguePlaying) nextAction();
    });

    socket.on("battleOptions", (options) => {
        console.log(options.active[0].moves);
        battleOptions = options;
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
function useMove(move) {
    socket.emit("moveInput", move);
}
function switchTo(slot) {
    socket.emit("switchInput", slot);
}
function tradeRequest(user, pokemon) {
    socket.emit("tradeRequest", user, pokemon);
}
function acceptTrade(data) {
    socket.emit("acceptTrade", data);
}
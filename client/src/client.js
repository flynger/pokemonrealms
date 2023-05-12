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

    socket.on("battleStart", () => {
        players[username].busy = true;
        $("#battle-UI").show();
    });

    socket.on("battleData", (output) => {
        console.log(output);
        battleDialogue.push(output);
        if (!dialoguePlaying) nextDialogue();
    });

    socket.on("battleOptions", (options) => {
        console.log(options);
        battleOptions = options;
    });

    socket.on("endBattle", (message) => {
        battleDialogue.push(message);
        if (!dialoguePlaying) nextDialogue();
        setTimeout(() => {
            $('#battle-UI').hide();
            players[username].busy = false;
        }, 2000);
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
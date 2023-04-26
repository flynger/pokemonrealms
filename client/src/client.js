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
    socket.on("playerData", (name, playersObject) => {
        username = name;
        new player(username, "red", 0, 0, "right", true).sendLocation();
        // for (let i = 0; i < map.width; i++) {
        //     for (let j = 0; j < map.height; j++) {
        //         if (randomNumber(1, 150) == 1) {
        //             let directions = ["left", "down", "right", "up"];
        //             let avatarName = player.avatars[randomNumber(0, player.avatars.length - 1)];
        //             let num = randomNumber(1, 3);
        //             switch (num) {
        //                 case 1:
        //                     avatarName = avatarName.toUpperCase();
        //                     break;
        //                 case 2:
        //                     avatarName = avatarName[0].toUpperCase() + avatarName.substring(1);
        //                     break;
        //                 default:
        //             }
        //             new player(avatarName + randomNumber(1, 9999), avatarName.toLowerCase(), i * 32, j * 32, directions[randomNumber(0, 3)]);
        //         }
        //     }
        // }
        for (let plyr in playersObject) {
            if (plyr != username) {
                new player(plyr, "red", playersObject[plyr].x, playersObject[plyr].y, playersObject[plyr].facing);
            }
        }
        app.ticker.add(draw);
    });

    socket.on("playerMovement", (data) => {
        let { name, x, y, facing, currentFrame } = data;
        if (!players[name]) new player(name, "red", x, y, facing);
        else {
            players[name].setPosition(x, y);
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
            delete players[name];
        }
    });

    socket.on("pong", (ms) => {
        latency = ms;
    });

    // //tells the server a chat message was sent
    // socket.on("chatMessage", (data) => {
    //     if (data.user === "Server") {
    //         addServerMessage(data.msg, data.room);
    //     } else {
    //         addChatMessage(data.user, data.msg, data.room);
    //     }
    // });

    // //joins room
    // socket.on("roomJoinSuccess", (data) => {
    //     if (data.room === requestedRoom.id) {
    //         chatRooms[requestedRoom.id] = requestedRoom;
    //         updateChatRooms();
    //         selectChat(requestedRoom);
    //         for (let message in data.messages) {
    //             addServerMessage(data.messages[message], currentChat.id);
    //         }
    //         requestedRoom = false;
    //     } else {
    //         addServerMessage("Something went wrong with joining that room.", currentChat.id);
    //     }
    // });

    // //executes if join room fails
    // socket.on("roomJoinFailure", (data) => {
    //     if (data.room === requestedRoom.id) {
    //         addServerMessage(data.error, currentChat.id);
    //         requestedRoom = false;
    //     }
    // });

    // //executes once the client receives the board sent by the server
    // socket.on("boardData", (data) => {
    //     if (data.startSpectating) {
    //         // console.log(data);
    //         minesweeper.SETTINGS = data.settings;
    //         minesweeper.startGame(true, false);
    //         minesweeper.updateTimer(data.time);
    //         if (!data.board) {
    //             return;
    //         }
    //     } else if (data.startPlaying) {
    //         // console.log(data);
    //         minesweeper.SETTINGS = data.settings;
    //         minesweeper.startGame(false, false);
    //         minesweeper.updateTimer(data.time);
    //         if (!data.board) {
    //             return;
    //         }
    //     }
    //     for (let row in minesweeper.GRID) {
    //         for (let col in minesweeper.GRID[row]) {
    //             if (minesweeper.GRID[row][col] != data.board[row][col]) {
    //                 let classToAdd = "";
    //                 let value = data.board[row][col];
    //                 if (minesweeper.GRID[row][col] === "F") {
    //                     minesweeper.FLAGS++;
    //                 }
    //                 switch (value) {
    //                     case "?":
    //                         // uncleared or dont do anything
    //                         classToAdd = "blank";
    //                         break
    //                     case "F":
    //                         // flag
    //                         minesweeper.FLAGS--;
    //                         classToAdd = "bombflagged";
    //                         break
    //                     case "X":
    //                         // bomb (gameover)
    //                         classToAdd = "bombrevealed";
    //                         break
    //                     case "FX":
    //                         classToAdd = "bombmisflagged";
    //                         break
    //                     case "RX":
    //                         classToAdd = "bombdeath";
    //                         break
    //                     default:
    //                         classToAdd = "open" + value;
    //                 }
    //                 minesweeper.GRID[row][col] = value;
    //                 if (classToAdd) $(`#${row}_${col}`).attr("class", "cell " + classToAdd);
    //             }
    //         }
    //     }
    //     // win/loss code
    //     minesweeper.updateFlagCounter();
    //     if (data.gameOver) {
    //         $("#game").off();
    //         minesweeper.setFace("face" + (data.win ? "win" : "dead"));
    //     }
    // });

    // //displays the updated time
    // socket.on("boardTime", (data) => {
    //     minesweeper.updateTimer(data.time);
    // });

    // //displays stats
    // socket.on("gameStats", (data) => {
    //     minesweeper.updateTimer(Math.floor(data.time));
    //     $("#player-name").html("Player" + (data.players.length > 1 ? "s" : "") + ": " + data.players.join(", "));
    //     if (data.spectators.length > 0) {
    //         $("#spectator-name").html("Spectator" + (data.spectators.length == 1 ? "" : "s") + ": " + data.spectators.join(", "));
    //     }
    //     $("#time").html(data.time);
    //     $("#result").html(data.result);
    //     $("#result-block")[0].style.display = "inline-flex";
    // });

    // //displays the request dialog box to the player requested
    // socket.on("requestCoop", (data) => {
    //     addServerMessage("Received co-op request from " + data.displayName, currentChat.id);

    //     $("#dialog-text").html(`You have been invited to play together by ${data.displayName}. Accept the request?`);
    //     $("#dialog-confirm").dialog({
    //         title: "Co-op request from " + data.displayName,
    //         resizable: false,
    //         draggable: false,
    //         height: "auto",
    //         width: 400,
    //         modal: true,
    //         buttons: {
    //             "Accept request": function () {
    //                 $(this).dialog("close");
    //                 socket.emit("startCoop", data);
    //             },
    //             "Ignore": function () {
    //                 $(this).dialog("close");
    //             }
    //         }
    //     });
    // });

    // //joins the coop
    // socket.on("coopJoined", (data) => {
    //     addServerMessage(data.displayName + " join the co-op!", currentChat.id);

    //     $("#dialog-text").html(`${data.displayName} accepted the co-op request and joined the co-op.`);
    //     $("#dialog-confirm").dialog({
    //         title: "Co-op request to " + data.displayName,
    //         resizable: false,
    //         draggable: false,
    //         height: "auto",
    //         width: 400,
    //         modal: true,
    //         buttons: {
    //             "Ok": function () {
    //                 $(this).dialog("close");
    //             }
    //         }
    //     });
    // });

    // //coop on hold
    // socket.on("coopOnHold", (data) => {
    //     addServerMessage(data.displayName + " went offline", currentChat.id);

    //     $("#dialog-text").html(`${data.displayName} disconnected and went offline. You can continue waiting until they rejoin.`);
    //     $("#dialog-confirm").dialog({
    //         title: data.displayName + " is offline",
    //         resizable: false,
    //         draggable: false,
    //         height: "auto",
    //         width: 400,
    //         modal: true,
    //         buttons: {
    //             "Ok": function () {
    //                 $(this).dialog("close");
    //             }
    //         }
    //     });
    // });

    // //executes if a coop partner disconnects
    // socket.on("coopLeft", (data) => {
    //     addServerMessage(data.displayName + " left the co-op", currentChat.id);

    //     $("#dialog-text").html(`${data.displayName} disconnected and left the co-op.`);
    //     $("#dialog-confirm").dialog({
    //         title: data.displayName + " left",
    //         resizable: false,
    //         draggable: false,
    //         height: "auto",
    //         width: 400,
    //         modal: true,
    //         buttons: {
    //             "Ok": function () {
    //                 $(this).dialog("close");
    //             }
    //         }
    //     });
    // });

    // //displays the online players
    // socket.on("playersOnline", (onlinePlayers) => {
    //     onlinePlayers = [...new Set(onlinePlayers)].sort();
    //     $("#users-list").html("");
    //     let text = "";
    //     for (let player of onlinePlayers) {
    //         if (player.toLowerCase() != username) {
    //             text += "<tr><td>" + player + "&nbsp; <button onclick='window.location.href=" + '"/spectate?name=' + player + '"' + "'>Spectate</button>&nbsp; <button onclick='inviteToGame(\"" + player.toLowerCase() + "\"); $(this).prop(\"disabled\", true);'>Invite</button> &nbsp;<a href='/profile?name=" + player.toLowerCase() + "' target='_blank'>Profile</a></td>";
    //         }
    //         else text += "<tr><td>" + player + " (You)</td>";
    //     }
    //     $("#users-list").html(text);
    // });

    // socket.on("kickPlayer", (data) => {
    //     addServerMessage("Disconnected: " + data.msg, currentChat.id);

    //     $("#dialog-text").html(data.msg);
    //     $("#dialog-confirm").dialog({
    //         title: "Disconnected",
    //         resizable: false,
    //         draggable: false,
    //         height: "auto",
    //         width: 400,
    //         modal: true,
    //         closeOnEscape: false,
    //         buttons: {
    //             "Leave": function () {
    //                 window.location.href = "about:blank";
    //             }
    //         }
    //     });
    //     $("#game").off();
    //     $("#face").off();
    //     $(".difficulty-select").off();
    // })
}
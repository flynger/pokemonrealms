/*
Alex Ge, Arnav Singh, Richard Wei, Will Gannon, Harry Liu

This file starts the server, implements the other modules, and interacts with and serves the clients.
*/

// changing Array prototype methods
Array.prototype.remove = function (elem) {
    this.splice(this.indexOf(elem), 1);
}
Array.prototype.shuffle = function () {
    for (let i = this.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this[i], this[j]] = [this[j], this[i]];
    }
    return this;
}
Array.prototype.random = function () {
    return this[randomNumber(0, this.length - 1)];
}

// libraries
import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import { color } from "./libs/color.js";
import bodyParser from "body-parser";
import sessions from "express-session";

// our files
import Map from './src/map.js';
import { ItemsText } from 'pokemon-showdown/.data-dist/text/items.js'; // held items only
import Party from './src/party.js';
import Pokemon from './src/pokemon.js';
import Player from "./src/player.js";
import SingleBattle from "./src/singleBattle.js";
import { players, accounts, LoginHandler } from "./src/loginHandler.js";
import WildEncounter from "./src/wildEncounter.js";
import Pokemart from "./src/pokemart.js";
import Items from "./src/items.js";
import Trade from "./src/trade.js";

// server setup
const app = express();
const port = 3000;
const serverName = "Pokemon Realms";
const sessionMiddleware = sessions({
    secret: "changethis",
    saveUninitialized: true,
    cookie: { maxAge: 365 * 24 * 60 * 60 * 1000 },
    resave: false
});

// express and socket.io initialization
const expressServer = app.listen(port, () => console.log(color.blue, `Starting Server: ${serverName} on port ${port}`));
const io = new Server(expressServer, {
    pingInterval: 900,
    pingTimeout: 5000
});
io.engine.use(sessionMiddleware);

app.use(express.static("./client"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "*",
    })
);
app.use(sessionMiddleware);

// url masks
app.get("/", (req, res) => {
    // redirect to game
    res.sendFile('home.html', { root: './client' });
});
app.get("/play", (req, res) => {
    // game page
    res.sendFile('play.html', { root: './client' });
});
app.get("/login", (req, res) => {
    // send client login page if not logged in
    res.sendFile('login.html', { root: './client' });
});
app.post("/login", (req, res) => {
    // handle login request and send response
    res.send(LoginHandler.loginAccount(req, res));
});
app.get("/register", (req, res) => {
    res.sendFile('register.html', { root: './client' });
});
app.post("/register", (req, res) => {
    // handle register request and send response
    res.send(LoginHandler.registerAccount(req, res));
});
app.get("/home", (req, res) => {
    // sends the home page when requested
    res.sendFile('home.html', { root: './client' });
});
app.get("/game", (req, res) => {
    // sends the home page when requested
    res.send('game.html', { root: './client' });
});
app.get("/logout", (req, res) => {
    // logout user if logged in
    if (req.session.username) {
        // res.clearCookie("signedIn");
        delete req.session.username;
        delete req.session.isGuest;
    }
    // redirect client to login page
    res.redirect("/login");
});

// update global player list every 5 seconds
var ticker = 1155;
Map.updateTime(ticker);
setInterval(() => {
    ticker += 5;
    if (ticker % 100 == 60) {
        ticker += 40;
        if (ticker == 2400) {
            ticker = 0;
        }
    }

    Map.updateTime(ticker);
    io.emit("timeChange", {
        time: Map.time,
        exactTime: ticker
    });
    // console.log("sending global players list");
    // io.emit("playersOnline", server.onlinePlayers);
}, 5000);
var testmart = new Pokemart([
    { id: "pokeball", price: 200 },
    { id: "greatball", price: 650 },
    { id: "revive", price: 200 },
    { id: "aguavberry", price: 5 },
    { id: "thunderstone", price: 10000 }
]);
// var encounters = {
//     grass: {
//         morning: [
//             {
//                 species: "PIDGEY",
//                 weight: 35,
//                 minLevel: 2,
//                 maxLevel: 4
//             },
//             {
//                 species: "LEDYBA",
//                 weight: 35,
//                 minLevel: 2,
//                 maxLevel: 4
//             },
//             {
//                 species: "SENTRET",
//                 weight: 15,
//                 minLevel: 3,
//                 maxLevel: 3
//             },
//             {
//                 species: "BUTTERFREE",
//                 weight: 5,
//                 minLevel: 7,
//                 maxLevel: 7
//             },
//             {
//                 species: "BEEDRILL",
//                 weight: 5,
//                 minLevel: 7,
//                 maxLevel: 7
//             },
//             {
//                 species: "PIDGEOTTO",
//                 weight: 1,
//                 minLevel: 7,
//                 maxLevel: 7
//             },
//             {
//                 species: "PIKACHU",
//                 weight: 1,
//                 minLevel: 4,
//                 maxLevel: 7
//             },
//             {
//                 species: "FURRET",
//                 weight: 1,
//                 minLevel: 6,
//                 maxLevel: 6
//             }
//         ],
//         day: [
//             {
//                 species: "PIDGEY",
//                 weight: 10,
//                 minLevel: 2,
//                 maxLevel: 4
//             },
//             {
//                 species: "RATTATA",
//                 weight: 10,
//                 minLevel: 2,
//                 maxLevel: 2
//             },
//             {
//                 species: "CATERPIE",
//                 weight: 7,
//                 minLevel: 2,
//                 maxLevel: 4
//             },
//             {
//                 species: "WEEDLE",
//                 weight: 7,
//                 minLevel: 2,
//                 maxLevel: 4
//             },
//             {
//                 species: "SENTRET",
//                 weight: 5,
//                 minLevel: 3,
//                 maxLevel: 3
//             },
//             {
//                 species: "PIDGEOTTO",
//                 weight: 1,
//                 minLevel: 7,
//                 maxLevel: 7
//             },
//             {
//                 species: "PIKACHU",
//                 weight: 1,
//                 minLevel: 4,
//                 maxLevel: 7
//             },
//             {
//                 species: "FURRET",
//                 weight: 1,
//                 minLevel: 6,
//                 maxLevel: 6
//             }
//         ],
//         night: [
//             {
//                 species: "RATTATA",
//                 weight: 5,
//                 minLevel: 2,
//                 maxLevel: 6
//             },
//             {
//                 species: "HOOTHOOT",
//                 weight: 5,
//                 minLevel: 2,
//                 maxLevel: 4
//             },
//             {
//                 species: "TIRTOUGA",
//                 weight: 1,
//                 minLevel: 2,
//                 maxLevel: 4
//             },
//             {
//                 species: "SQUIRTLE",
//                 weight: 1,
//                 minLevel: 2,
//                 maxLevel: 4
//             }
//         ],
//         frequency: 8
//     }
// }
// var map = new Map(encounters);
io.on("connection", (socket) => {
    console.log(color.green, socket.id);

    const req = socket.request;

    let username = req.session.username;
    let displayName;
    let isGuest = true;
    if (username) {
        if (players[username].connected) {
            socket.disconnect(true);
            return;
        }
        displayName = players[username].displayName;
        isGuest = false;
        console.log(displayName + " logged in.");
    } else {
        while (!username || (username && username in players)) {
            displayName = "Player " + (Math.floor(Math.random() * 9998) + 1);
            username = displayName.toLowerCase();
        }
        console.log("Guest logged in as " + displayName + ".");
    }

    // create player if doesn't exist
    if (!players[username]) {
        players[username] = new Player(username, displayName);
    }
    let player = players[username];
    player.setSocket(socket);
    player.getMap().addPlayer(player, {
        x: player.x,
        y: player.y,
        facing: player.facing
    });

    // add events
    socket.on("ping", (callback) => {
        callback();
    });

    socket.on("playerMovement", (data) => {
        if (!player.isBusy() && Array.isArray(data.map) && data.map[0] == player.location.map && data.map[1] == player.location.submap) {
            player.getMap().updatePlayerLocation(player, data);
        }
    });

    socket.on("grassEnter", () => {
        let map = player.getMap();
        if (!player.isBusy() && map.grassCheck()) {
            let encounter = map.createEncounter();
            player.battle = new WildEncounter(player, encounter);
            player.battle.startBattle();
        }
    });

    socket.on("chatMessage", (data) => {
        // handle chat packet
        // chatHandler.processChat(socket, data)
    });

    socket.on("battleRequest", (user) => {
        user = user.toLowerCase(); // convert name to username
        let otherPlayer = players[user];
        if (!otherPlayer) {
            socket.emit("invalidRequest", "Couldn't find player with username \"" + user + "\"");
            return;
        } else if (!otherPlayer.connected) {
            socket.emit("invalidRequest", `${user} is offline.`);
            return;
        } else if (otherPlayer.isBusy()) {
            socket.emit("invalidRequest", `${user} is busy.`);
            return;
        } else if (player.isBusy()) {
            socket.emit("invalidRequest", `You are busy.`);
            return;
        }
        // if other player hasnt sent request, send
        if (!player.requests.battle.hasOwnProperty(user)) {
            otherPlayer.socket.emit("battleRequest", displayName);
            otherPlayer.requests.battle[username] = true;
        } else {
            delete player.requests.battle[user];
            const party2 = new Party(2, displayName, player.party);
            const party1 = new Party(1, otherPlayer.displayName, otherPlayer.party);
            player.battle = otherPlayer.battle = new SingleBattle(party1, party2);
            player.battle.startBattle();
            console.log("Starting match with 2 players...");
        }
    });

    socket.on("endBattle", () => {
        if (player.battle != null) {
            // Make sure player can escape
            if (!player.battle.canEscape(displayName)) {
                let message = "You can't run from this battle!";
                if (player.battle.canRun) message = "Your active Pokémon is trapped and cannot escape!";
                socket.emit("battleData", [{ message }]);
                return;
            }
            
            player.battle.run();
        }
    });

    socket.on("moveInput", (moveNumber) => {
        if (player.battle != null) {
            player.battle.useMove(displayName, moveNumber);
        }
    });

    socket.on("switchInput", (switchNumber) => {
        if (player.battle != null) {
            // Make sure player can switch
            if(player.battle.canSwitch(displayName))
                player.battle.switchTo(displayName, switchNumber);
            else socket.emit("battleData", [{ message: "Your active Pokémon is trapped and cannot switch!" }]);
        }
    });

    socket.on("itemInput", (item) => {
        if (player.battle != null) {
            if (player.battle.useItem) player.battle.useItem(displayName, item);
            else socket.emit("battleData", [{ message: "You can't use items in this battle!" }]);
        }
    });

    socket.on("tradeRequest", (user) => {
        user = user.toLowerCase(); // convert name to username
        let otherPlayer = players[user];
        if (!otherPlayer) {
            socket.emit("invalidRequest", "Couldn't find player with username \"" + user + "\"");
            return;
        } else if (!otherPlayer.connected) {
            socket.emit("invalidRequest", `${user} is offline.`);
            return;
        } else if (otherPlayer.isBusy()) {
            socket.emit("invalidRequest", `${user} is busy.`);
            return;
        } else if (player.isBusy()) {
            socket.emit("invalidRequest", `You are busy.`);
            return;
        }

        // if other player hasnt sent request, send
        if (!player.requests.trade.hasOwnProperty(user)) {
            otherPlayer.socket.emit("tradeRequest", displayName);
            otherPlayer.requests.trade[username] = true;
        } else {
            delete player.requests.trade[user];
            console.log("Trade started!")
            new Trade(player, otherPlayer);
        }
    });

    socket.on("offerItem", (id, quantity) => {
        if (player.trade)
            player.trade.offerItem(username, id, quantity);
    });

    socket.on("offerMon", (slot) => {
        if (player.trade)
            player.trade.offerMon(username, slot);
    });

    socket.on("tradeReady", (value) => {
        if (player.trade) player.trade.ready(username, value)
    });

    socket.on("tradeConfirm", (data) => {
        if (player.trade) {
            player.trade.confirm(username);
        }
    });

    socket.on("cancelTrade", () => {
        if (player.trade)
            player.trade.cancel();
    });

    socket.on("addBal", (amount) => {
        player.balance += amount;
        socket.emit("balanceUpdate", player.balance);
        console.log("New Balance: $" + player.balance);
    });

    socket.on("removeBal", (amount) => {
        player.balance -= amount;
        socket.emit("balanceUpdate", player.balance);
        console.log("New Balance: $" + player.balance);
    });

    socket.on("openPokemart", () => {
        console.log(testmart);
        socket.emit("pokemartData", testmart.catalog);
    });

    socket.on("buyItem", (id, quantity) => {
        if (!player.isBusy() && testmart.buyItem(player, id, quantity)) {
            socket.emit("balanceUpdate", player.balance);
        }
    });

    socket.on("sellItem", (id, quantity) => {
        if (!player.isBusy() && testmart.sellItem(player, id, quantity)) {
            socket.emit("balanceUpdate", player.balance);
        }
    });

    socket.on("useItem", (id, slot) => {
        if (!player.isBusy() && player.inventory.hasItem(id, 1) && Items[id].isUsable) {
            player.inventory.useItem(id, slot, 1);
        }
    });

    socket.on("discardItem", (id, quantity) => {
        if (!player.isBusy() && player.inventory.hasItem(id, quantity)) {
            player.inventory.removeItem(id, quantity);
        }
    });

    socket.on("swapPartySlots", (slot1, slot2) => {
        if (!player.isBusy())
            player.swapPartySlots(slot1, slot2);
    });

    socket.on("giveItemToSlot", (id, slot) => {
        if (!player.isBusy())
            player.giveItemToSlot(id, slot);
    });

    socket.on("removeItemFromSlot", (slot) => {
        if (!player.isBusy())
            player.removeItemFromSlot(slot);
    });


    // add disconnect event
    socket.on("disconnect", () => {
        console.log(displayName + " disconnected.");
        player.getMap().removePlayer(player);
        player.deleteSocket();
        if (player.battle) {
            player.battle.endBattle(true, [{ message: displayName + " disconnected. The battle was canceled." }]);
        }
        if (player.trade) {
            player.trade.cancel();
        }
        if (isGuest) {
            delete players[username];
        }
        socket.broadcast.emit("playerDisconnect", username);
    });
    // send data
    socket.emit("itemData", Items);
    socket.emit("balanceUpdate", player.balance);
    player.inventory.sendItemUpdate();
    player.sendPartyUpdate();
    socket.emit("timeChange", {
        time: Map.time,
        exactTime: ticker
    });
    //     socket.emit("playersOnline", server.onlinePlayers);
});

/* to broadcast event to all users: io.sockets.emit(key, data);
   to broadcast event to a single socket (without reference): io.sockets.sockets.get(socketid).emit(key, data);
*/

// code run on server termination
process.on("SIGINT", () => process.exit(0));

process.on("exit", (code) => {
    // io.sockets.emit("disconnect", {});
    console.log(`Process exited with code: ${code}`);
    // loginHandler.saveData();
    // console.log("Account data saved successfully");
});

// helper functions
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

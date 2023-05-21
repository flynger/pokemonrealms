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
import { Pokemon } from './src/pokemon.js';
import Player from "./src/player.js";
import SingleBattle from "./src/singleBattle.js";
import { players, accounts, LoginHandler } from "./src/loginHandler.js";
import WildEncounter from "./src/wildEncounter.js";
import Pokemart from "./src/pokemart.js";
import Items from "./src/items.js";
// const cookieParser = require("./node_modules/cookie-parser");
// const jsonfile = require("./node_modules/jsonfile");
// const sessions = require("./node_modules/express-session");
// const { uniqueNamesGenerator, adjectives, /*colors,*/ animals } = require("./node_modules/unique-names-generator");
// require('locus');

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
    // if (!req.session.username) {
    res.sendFile('login.html', { root: './client' });

    // redirect client to game page if logged in
    // else res.redirect("/game");
});
app.post("/login", (req, res) => {
    // handle login request and send response
    res.send(LoginHandler.loginAccount(req, res));
});
app.get("/register", (req, res) => {
    // send client register page if not logged in
    // if (!req.session.username) {
    res.sendFile('register.html', { root: './client' });
    // }
    // redirect client to game page if logged in
    // else res.redirect("/game");
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
    //if (!req.session.username) {
    // res.sendFile('login.html', { root: './public' });
    //}
    // redirect client to game page if logged in
    //else res.redirect("/game");
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
var ticker = 2350;
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
var encounters = {
    grass: {
        morning: [
            {
                species: "PIDGEY",
                weight: 35,
                minLevel: 2,
                maxLevel: 4
            },
            {
                species: "LEDYBA",
                weight: 35,
                minLevel: 2,
                maxLevel: 4
            },
            {
                species: "SENTRET",
                weight: 15,
                minLevel: 3,
                maxLevel: 3
            },
            {
                species: "BUTTERFREE",
                weight: 5,
                minLevel: 7,
                maxLevel: 7
            },
            {
                species: "BEEDRILL",
                weight: 5,
                minLevel: 7,
                maxLevel: 7
            },
            {
                species: "PIDGEOTTO",
                weight: 1,
                minLevel: 7,
                maxLevel: 7
            },
            {
                species: "PIKACHU",
                weight: 1,
                minLevel: 4,
                maxLevel: 7
            },
            {
                species: "FURRET",
                weight: 1,
                minLevel: 6,
                maxLevel: 6
            }
        ],
        day: [
            {
                species: "PIDGEY",
                weight: 10,
                minLevel: 2,
                maxLevel: 4
            },
            {
                species: "RATTATA",
                weight: 10,
                minLevel: 2,
                maxLevel: 2
            },
            {
                species: "CATERPIE",
                weight: 7,
                minLevel: 2,
                maxLevel: 4
            },
            {
                species: "WEEDLE",
                weight: 7,
                minLevel: 2,
                maxLevel: 4
            },
            {
                species: "SENTRET",
                weight: 5,
                minLevel: 3,
                maxLevel: 3
            },
            {
                species: "PIDGEOTTO",
                weight: 1,
                minLevel: 7,
                maxLevel: 7
            },
            {
                species: "PIKACHU",
                weight: 1,
                minLevel: 4,
                maxLevel: 7
            },
            {
                species: "FURRET",
                weight: 1,
                minLevel: 6,
                maxLevel: 6
            }
        ],
        night: [
            {
                species: "RATTATA",
                weight: 5,
                minLevel: 2,
                maxLevel: 6
            },
            {
                species: "HOOTHOOT",
                weight: 5,
                minLevel: 2,
                maxLevel: 4
            },
            {
                species: "TIRTOUGA",
                weight: 1,
                minLevel: 2,
                maxLevel: 4
            },
            {
                species: "SQUIRTLE",
                weight: 1,
                minLevel: 2,
                maxLevel: 4
            }
        ],
        frequency: 8
    }
}
var map = new Map(encounters);
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
            displayName = username = "player" + (Math.floor(Math.random() * 9998) + 1);
        }
        console.log("Guest logged in as " + displayName + ".");
    }

    // create player if doesn't exist
    if (!players[username]) {
        players[username] = new Player(username, displayName);
    }
    let player = players[username];
    player.setSocket(socket);

    // add events
    socket.on("ping", (callback) => {
        callback();
    });

    socket.on("playerMovement", (data) => {
        if (player.battle == null) {
            data.name = username;
            player.x = data.x;
            player.y = data.y;
            player.facing = data.facing;
            socket.broadcast.emit("playerMovement", data);
        }
    });

    socket.on("grassEnter", () => {
        if (player.battle == null && map.grassCheck()) {
            let encounter = map.createEncounter();
            socket.emit("startBattle", player.party[0].species, encounter.species);
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
        }
        if (otherPlayer.connected && otherPlayer.battle == null && player.battle == null) {
            // if other player hasnt sent request, send
            if (!player.requests.hasOwnProperty(user)) {
                otherPlayer.socket.emit("battleRequest", displayName);
                otherPlayer.requests[username] = true;
            } else {
                const party2 = new Party(displayName, []);
                const party1 = new Party(otherPlayer.displayName, []);
                player.battle = otherPlayer.battle = new SingleBattle(party1, party2);
                player.battle.startRandomBattle();
                console.log("Starting match with 2 players...");
            }
        }
    });

    socket.on("tradeRequest", (user, pokemonSlot) => {
        user = user.toLowerCase(); // convert name to username
        let otherPlayer = players[user];
        if (!otherPlayer) {
            socket.emit("invalidRequest", "Couldn't find player with username \"" + user + "\"");
            return;
        }
        if (otherPlayer.connected && otherPlayer.battle == null && player.battle == null) {
            // if other player hasnt sent request, send
            console.log(`${displayName} requests a trade with ${otherPlayer.displayName}`);
            otherPlayer.socket.emit("tradeRequest", username, player.party[pokemonSlot]);
        }
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

    socket.on("acceptTrade", (data) => {
        console.log("data " + data);
        let player1 = players[data.player1.toLowerCase()];
        let player2 = players[data.player2.toLowerCase()];
        console.log(`Trading ${player1.party[data.pokemon1]} for ${player2.party[data.pokemon2]}`);
        let temp = player1.party[data.pokemonSlot1];
        player1.party[data.pokemonSlot1] = player2.party[data.pokemonSlot2];
        player2.party[data.pokemonSlot2] = temp;
        socket.emit("acceptTrade", (data));
    });

    socket.on("endBattle", () => {
        if (player.battle && player.battle.canRun) {
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
            player.battle.switchTo(displayName, switchNumber);
        }
    });

    socket.on("itemInput", () => {
        if (player.battle != null) {
            player.battle.useItem(displayName);
        }
    });

    socket.on("openPokemart", () => {
        console.log(testmart);
        socket.emit("pokemartData", testmart.catalog);
    });

    socket.on("buyItem", (id, quantity) => {
        if (testmart.buyItem(player, id, quantity)) {
            socket.emit("balanceUpdate", player.balance);
            socket.emit("inventoryUpdate", player.inventory.items);
        }
    });

    socket.on("sellItem", (id, quantity) => {
        if (testmart.sellItem(player, id, quantity)) {
            socket.emit("balanceUpdate", player.balance);
            socket.emit("inventoryUpdate", player.inventory.items);
        }
    });

    socket.on("useItem", (id, quantity) => {
        if (player.battle == null && player.inventory.hasItem(id, quantity) && Items[id].isUsable) {
            player.inventory.useItem(id, quantity);
            socket.emit("inventoryUpdate", player.inventory.items);
        }
    });

    socket.on("discardItem", (id, quantity) => {
        if (player.inventory.hasItem(id, quantity)) {
            player.inventory.removeItem(id, quantity);
            socket.emit("inventoryUpdate", player.inventory.items);
        }
    });

    // add disconnect event
    socket.on("disconnect", () => {
        console.log(displayName + " disconnected.");
        player.deleteSocket();
        if (player.battle) {
            player.battle.endBattle(true);
        }
        if (isGuest) {
            delete players[username];
        }
        socket.broadcast.emit("playerDisconnect", username);
    });
    // send username
    socket.emit("playerData", username, Object.values(players).filter((plyr) => plyr.connected).map((plyr) => plyr.export()));
    socket.emit("balanceUpdate", player.balance);
    socket.emit("inventoryUpdate", player.inventory.items);
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

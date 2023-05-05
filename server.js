// libraries
import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import { color } from "./libs/color.js";
import bodyParser from "body-parser";
import sessions from "express-session";

// our files
import Party from './src/party.js';
import Pokemon from './src/pokemon.js';
import Player from "./src/player.js";
import SingleBattle from "./src/singleBattle.js";
import { players, accounts, LoginHandler } from "./src/loginHandler.js";
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
// io.use((socket: any, next: any) => sessionMiddleware(socket.request, {}, next)); // gives request

// server variable
const server = {
    io,
    onlinePlayers: [] // Array<Player>
}
// our source file initialization

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
// app.get("/home", (req, res) => {
//     // redirect to game
//     res.redirect("/game");
// });
app.get("/play", (req, res) => {
    // game page
    res.sendFile('play.html', { root: './client' });
});
// app.get("/profile", (req, res) => {
//     // get the requested username parameter
//     let requestedUsername: String = req.query.name ? req.query.name.toLowerCase() : req.session.username ? req.session.username : "";
//     // send profile page if player exists, else redirect to login
//     // if (requestedUsername && server.players.hasOwnProperty(requestedUsername)) {
//     //     res.sendFile('profile.html', { root: './client' });
//     // } else res.redirect("/login");
// });
// app.post("/profile", (req, res) => {
//     // get the requested username parameter
//     let requestedUsername: String = req.query.name ? req.query.name.toLowerCase() : req.session.username ? req.session.username : "";
//     // send profile data if player exists
//     // if (requestedUsername && server.players.hasOwnProperty(requestedUsername)) {
//     //     let { username, displayName, wins, losses, gamesCreated, connected } = server.players[requestedUsername];
//     //     res.send({ success: true, data: { username, displayName, wins, losses, gamesCreated, connected } });
//     // } else {
//     //     res.send({ success: false });
//     // }
// });
// app.get("/settings", (req, res) => {
//     // settings page
//     res.sendFile('settings.html', { root: './client' });
// });
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
// app.get("/logout", (req, res) => {
//     // logout user if logged in
//     if (req.session.username) {
//         res.clearCookie("signedIn");
//         delete req.session.username;
//         delete req.session.isGuest;
//     }
//     // redirect client to login page
//     res.redirect("/login");
// });

// // update global player list every 5 seconds
// setInterval(() => {
//     console.log("sending global players list");
//     io.emit("playersOnline", server.onlinePlayers);
// }, 5000);

io.on("connection", (socket) => {
    console.log(color.green, socket.id);

    const req = socket.request;

    let username = req.session.username;
    let displayName;
    let isGuest = true;
    let battle = null;
    if (username) {
        if (players[username].connected) {
            socket.disconnect(true);
        }
        displayName = players[username].displayName;
        isGuest = false;
    } else {
        while (!username || (username && username in players)) {
            displayName = username = "player" + (Math.floor(Math.random() * 9998) + 1);
        }
    }

    // create player if doesn't exist
    if (!players[username]) {
        players[username] = new Player(username, displayName);
    }
    players[username].setSocket(socket);

    // add events
    socket.on("ping", (callback) => {
        callback();
    });

    //     // chat and room events
    //     socket.on("joinRoom", (data) => {
    //         // handle room join request
    //         // let result = chatHandler.joinSocketToRoom(socket, data.requestedRoom);
    //         // if (result.error) {
    //         //     socket.emit("roomJoinFailure", { room: data.requestedRoom, error: result.error });
    //         // } else if (result.success) {
    //         //     socket.emit("roomJoinSuccess", { room: data.requestedRoom, messages: [`You connected as user: ${server.players[username].displayName}`, "Joined chat: " + data.requestedRoom] });
    //         // }
    //     });

    socket.on("playerMovement", (data) => {
        data.name = username;
        players[username].x = data.x;
        players[username].y = data.y;
        players[username].facing = data.facing;
        socket.broadcast.emit("playerMovement", data);
    });


    socket.on("chatMessage", (data) => {
        // handle chat packet
        // chatHandler.processChat(socket, data)
    });

    socket.on("startBattle", () => {
        if (battle == null) {
            const party1 = new Party(username, []);
            const party2 = new Party('MoldyNano', []);
            battle = new SingleBattle(party1, party2);
            battle.startRandomBattle();
            console.log("Received start battle request");
        }
    });

    // add disconnect event
    socket.on("disconnect", () => {
        console.log(color.red, socket.id);
        players[username].deleteSocket();
        if (isGuest) {
            delete players[username];
        }
        socket.broadcast.emit("playerDisconnect", username);
    });
    // send username
    socket.emit("playerData", username, Object.values(players).filter((player) => player.connected).map((player) => player.export()));
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

"use strict";
/*

*/
Object.defineProperty(exports, "__esModule", { value: true });
// libraries
var bodyParser = require("./node_modules/body-parser");
var cors = require("./node_modules/cors");
var color = require("./libs/color");
var cookieParser = require("./node_modules/cookie-parser");
var express = require("./node_modules/express/index");
var jsonfile = require("./node_modules/jsonfile");
var sessions = require("./node_modules/express-session");
var socket = require("./node_modules/socket.io/dist/index");
var _a = require("./node_modules/unique-names-generator"), uniqueNamesGenerator = _a.uniqueNamesGenerator, adjectives = _a.adjectives, /*colors,*/ animals = _a.animals;
require('locus');
// server setup
var app = express();
var port = 80;
var serverName = "Pokemon Realms";
var sessionMiddleware = sessions({
    secret: "e'eF?infFwa%%ofFia*Gesj8\\g4pdO!ih",
    saveUninitialized: true,
    cookie: { maxAge: 365 * 24 * 60 * 60 * 1000 },
    resave: false
});
app.use(express.static("./client"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
    origin: "*",
}));
app.use(sessionMiddleware);
// url masks
app.get("/", function (req, res) {
    // redirect to game
    res.redirect("/play");
});
app.get("/home", function (req, res) {
    // redirect to game
    res.redirect("/play");
});
app.get("/play", function (req, res) {
    // game page
    res.sendFile('play.html', { root: './public' });
});
app.get("/profile", function (req, res) {
    // get the requested username parameter
    var requestedUsername = req.query.name ? req.query.name.toLowerCase() : req.session.username ? req.session.username : "";
    // send profile page if player exists, else redirect to login
    // if (requestedUsername && server.players.hasOwnProperty(requestedUsername)) {
    //     res.sendFile('profile.html', { root: './public' });
    // } else res.redirect("/login");
});
app.post("/profile", function (req, res) {
    // get the requested username parameter
    var requestedUsername = req.query.name ? req.query.name.toLowerCase() : req.session.username ? req.session.username : "";
    // send profile data if player exists
    // if (requestedUsername && server.players.hasOwnProperty(requestedUsername)) {
    //     let { username, displayName, wins, losses, gamesCreated, connected } = server.players[requestedUsername];
    //     res.send({ success: true, data: { username, displayName, wins, losses, gamesCreated, connected } });
    // } else {
    //     res.send({ success: false });
    // }
});
app.get("/settings", function (req, res) {
    // settings page
    res.sendFile('settings.html', { root: './public' });
});
app.get("/login", function (req, res) {
    // send client login page if not logged in
    if (!req.session.username) {
        res.sendFile('login.html', { root: './public' });
    }
    // redirect client to game page if logged in
    else
        res.redirect("/play");
});
app.post("/login", function (req, res) {
    // handle login request and send response
    // res.send(loginHandler.loginAccount(req, res));
});
app.get("/register", function (req, res) {
    // send client register page if not logged in
    if (!req.session.username) {
        res.sendFile('register.html', { root: './public' });
    }
    // redirect client to game page if logged in
    else
        res.redirect("/play");
});
app.post("/register", function (req, res) {
    // handle register request and send response
    // res.send(loginHandler.registerAccount(req, res));
});
app.get("/logout", function (req, res) {
    // logout user if logged in
    if (req.session.username) {
        res.clearCookie("signedIn");
        delete req.session.username;
        delete req.session.isGuest;
    }
    // redirect client to login page
    res.redirect("/login");
});
// express and socket.io initialization
var expressServer = app.listen(port, function () { return console.log(color.blue, "Starting Server: ".concat(name, " on port ").concat(port)); });
var io = socket(expressServer, {
    pingInterval: 900,
    pingTimeout: 5000
});
io.use(function (socket, next) { return sessionMiddleware(socket.request, {}, next); }); // gives request 
// server variable
var server = {
    io: io,
    onlinePlayers: []
};
// our source file initialization
// update global player list every 5 seconds
setInterval(function () {
    console.log("sending global players list");
    io.emit("playersOnline", server.onlinePlayers);
}, 5000);
io.on("connection", function (socket) {
    // get socket's session details
    var _a = socket.request, session = _a.session, sessionID = _a.sessionID;
    var username = socket.username = session.username;
    // if (!session.username) {
    //     // assign guest account if not logged in
    //     session.isGuest = true;
    //     let displayName: String = "Guest " + uniqueNamesGenerator({
    //         dictionaries: [adjectives, animals],
    //         separator: " ",
    //         style: "capital"
    //     });
    //     socket.username = username = session.username = displayName.toLowerCase();//sessionID;
    //     server.players[username] = { username, displayName, isGuest: true, connected: true };
    // }
    // server.players[username].connected = true;
    // server.players[username].socket = session.socket = socket;
    // server.players[username].board = null;
    // server.onlinePlayers.push(server.players[username].displayName);
    // connect event
    console.log(color.green, socket.id);
    // add events
    socket.on("ping", function (callback) {
        callback();
    });
    // chat and room events
    socket.on("joinRoom", function (data) {
        // handle room join request
        // let result = chatHandler.joinSocketToRoom(socket, data.requestedRoom);
        // if (result.error) {
        //     socket.emit("roomJoinFailure", { room: data.requestedRoom, error: result.error });
        // } else if (result.success) {
        //     socket.emit("roomJoinSuccess", { room: data.requestedRoom, messages: [`You connected as user: ${server.players[username].displayName}`, "Joined chat: " + data.requestedRoom] });
        // }
    });
    socket.on("chatMessage", function (data) {
        // handle chat packet
        // chatHandler.processChat(socket, data)
    });
    // add disconnect event
    socket.on("disconnect", function () {
        console.log(color.red, socket.id);
        // server.players[username].connected = false;
        // server.onlinePlayers.splice(server.onlinePlayers.indexOf(server.players[username].displayName), 1);
        // console.log(server.onlinePlayers);
        delete session.socket;
        // if (session.isGuest) {
        //     delete server.players[username];
        // }
    });
    // send username
    socket.emit("username", username);
    socket.emit("playersOnline", server.onlinePlayers);
});
/* to broadcast event to all users: io.sockets.emit(key, data);
   to broadcast event to a single socket (without reference): io.sockets.sockets.get(socketid).emit(key, data);
*/
// code run on server termination
process.on("SIGINT", function () { return process.exit(0); });
process.on("exit", function (code) {
    console.log("Process exited with code: ".concat(code));
    // loginHandler.saveData();
    console.log("Account data saved successfully");
});
// helper functions
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//# sourceMappingURL=server.js.map
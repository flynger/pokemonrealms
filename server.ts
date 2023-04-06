/*

*/

// libraries
const bodyParser = require("./node_modules/body-parser");
const cors = require("./node_modules/cors");
const color = require("./libs/color");
const cookieParser = require("./node_modules/cookie-parser");
const express = require("./node_modules/express/index");
const jsonfile = require("./node_modules/jsonfile");
const sessions = require("./node_modules/express-session");
const socket = require("./node_modules/socket.io/dist/index");
const { uniqueNamesGenerator, adjectives, /*colors,*/ animals } = require("./node_modules/unique-names-generator");
require('locus');

// server setup
const app = express();
var port: number = 80;
var serverName: String = "Pokemon Realms";
const sessionMiddleware = sessions({
    secret: "e'eF?infFwa%%ofFia*Gesj8\\g4pdO!ih",
    saveUninitialized: true,
    cookie: { maxAge: 365 * 24 * 60 * 60 * 1000 },
    resave: false
});

app.use(express.static("./client"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    cors({
        origin: "*",
    })
);
app.use(sessionMiddleware);

// url masks
app.get("/", (req, res) => {
    // redirect to game
    res.redirect("/play");
});
app.get("/home", (req, res) => {
    // redirect to game
    res.redirect("/play");
});
app.get("/play", (req, res) => {
    // game page
    res.sendFile('play.html', { root: './public' });
});
app.get("/profile", (req, res) => {
    // get the requested username parameter
    let requestedUsername: String = req.query.name ? req.query.name.toLowerCase() : req.session.username ? req.session.username : "";
    // send profile page if player exists, else redirect to login
    // if (requestedUsername && server.players.hasOwnProperty(requestedUsername)) {
    //     res.sendFile('profile.html', { root: './public' });
    // } else res.redirect("/login");
});
app.post("/profile", (req, res) => {
    // get the requested username parameter
    let requestedUsername: String = req.query.name ? req.query.name.toLowerCase() : req.session.username ? req.session.username : "";
    // send profile data if player exists
    // if (requestedUsername && server.players.hasOwnProperty(requestedUsername)) {
    //     let { username, displayName, wins, losses, gamesCreated, connected } = server.players[requestedUsername];
    //     res.send({ success: true, data: { username, displayName, wins, losses, gamesCreated, connected } });
    // } else {
    //     res.send({ success: false });
    // }
});
app.get("/settings", (req, res) => {
    // settings page
    res.sendFile('settings.html', { root: './public' });
});
app.get("/login", (req, res) => {
    // send client login page if not logged in
    if (!req.session.username) {
        res.sendFile('login.html', { root: './public' });
    }
    // redirect client to game page if logged in
    else res.redirect("/play");
});
app.post("/login", (req, res) => {
    // handle login request and send response
    // res.send(loginHandler.loginAccount(req, res));
});
app.get("/register", (req, res) => {
    // send client register page if not logged in
    if (!req.session.username) {
        res.sendFile('register.html', { root: './public' });
    }
    // redirect client to game page if logged in
    else res.redirect("/play");
});
app.post("/register", (req, res) => {
    // handle register request and send response
    // res.send(loginHandler.registerAccount(req, res));
});
app.get("/logout", (req, res) => {
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
const expressServer = app.listen(port, () => console.log(color.blue, `Starting Server: ${name} on port ${port}`));
const io = socket(expressServer, {
    pingInterval: 900,
    pingTimeout: 5000
});
io.use((socket, next) => sessionMiddleware(socket.request, {}, next)); // gives request 

// server variable
var server = {
    io: io,
    onlinePlayers: []
}
// our source file initialization


// update global player list every 5 seconds
setInterval(() => {
    console.log("sending global players list");
    io.emit("playersOnline", server.onlinePlayers);
}, 5000);

io.on("connection", (socket) => {
    // get socket's session details
    let { session, sessionID } = socket.request;
    let username: String = socket.username = session.username;
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
    socket.on("ping", (callback) => {
        callback();
    });

    // chat and room events
    socket.on("joinRoom", (data) => {
        // handle room join request
        // let result = chatHandler.joinSocketToRoom(socket, data.requestedRoom);
        // if (result.error) {
        //     socket.emit("roomJoinFailure", { room: data.requestedRoom, error: result.error });
        // } else if (result.success) {
        //     socket.emit("roomJoinSuccess", { room: data.requestedRoom, messages: [`You connected as user: ${server.players[username].displayName}`, "Joined chat: " + data.requestedRoom] });
        // }
    });

    socket.on("chatMessage", (data) => {
        // handle chat packet
        // chatHandler.processChat(socket, data)
    });

    // add disconnect event
    socket.on("disconnect", () => {
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
process.on("SIGINT", () => process.exit(0));

process.on("exit", (code) => {
    console.log(`Process exited with code: ${code}`);
    // loginHandler.saveData();
    console.log("Account data saved successfully");
});

// helper functions
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

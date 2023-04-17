/*

This file implements server-sided chat functionality including storing user data after it is submitted
*/

// TODO: ADD TYPES

const { json } = require("express");

module.exports = (server) => {
    // gets the data and exports to server.js
    const jsonfile = require("../node_modules/jsonfile");
    const accounts = jsonfile.readFileSync("./data/accounts.json");
    const playerData = jsonfile.readFileSync("./data/players.json");
    const { io } = server; // tells you what properties of server are imported
    const players = server.players = playerData;
    console.log(`accounts: ${JSON.stringify(accounts)}`);

    const loginHandler = {
        registerAccount: (req, res) => {
            const displayName = req.body.username;
            const username = displayName.toLowerCase();
            const password = req.body.password;
            if (accounts[username]) {
                return { success: false, reason: "An account with the provided username already exists." };
                // socket.emit("usernameExists");
            } else if (!/(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/.test(password)) {
                return { success: false, reason: "Invalid password. A password must include 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long." };
            } else if (!/^[A-Za-z0-9_]{3,16}$/.test(username)) {
                return { success: false, reason: "Invalid username. A username may only include alphanumeric characters, underscores, and be a length of 3 to 16 characters." };
            } else {
                accounts[username] = password;

                // add data
                players[username] = { username, displayName};
                console.log(`signed up, Username: ${username} Password: ${password}`);
                console.log(players);
                loginHandler.loginAccount(req, res);
                return { success: true };
            }
        },
        // logs in account
        loginAccount: (req, res) => {
            const displayName = req.body.username;
            const username = req.body.username.toLowerCase();
            if (accounts[username] === req.body.password) {
                req.session.username = username;
                req.session.isGuest = false;
                if (!players[username]) {
                    // add data
                    players[username] = { username, displayName};
                }
                res.cookie("signedIn", "true");
                return { success: true };
                // server.gameHandler.socketToPlayer[socket.id] = username;
                // socket.emit("loginSuccess");
            } else {
                return { success: false, reason: "The username or password is incorrect." };
            }
        },
        // saves data after server closes
        saveData: () => {
            jsonfile.writeFileSync("./data/players.json", players);
            jsonfile.writeFileSync("./data/accounts.json", accounts);
        }
    }
    return server.loginHandler = loginHandler;
}
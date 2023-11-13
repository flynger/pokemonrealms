/*
Alex G, flynger, Richard W, Harry

This file implements server-sided chat functionality including storing user data after it is submitted
*/

import Player from "./player.js"
import jsonfile from "jsonfile";
export const accounts = jsonfile.readFileSync("./data/accounts.json");
export const players = jsonfile.readFileSync("./data/players.json"); // create players property in server
for (const name in players) {
    players[name] = new Player(players[name]);
}
console.log(`accounts: ${JSON.stringify(accounts)}`);

export class LoginHandler {
    static registerAccount(req, res) {
        const displayName = req.body.username;
        const username = displayName.toLowerCase();
        const password = req.body.password;
        const passwordRepeat = req.body.passwordRepeat;
        if (password !== passwordRepeat) {
            return { success: false, reason: "Those passwords didn’t match. Try again." };
        } else if (accounts[username]) {
            return { success: false, reason: "An account with the provided username already exists." };
            // socket.emit("usernameExists");
        } else if (!/(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/.test(password)) {
            return { success: false, reason: "Invalid password. A password must include 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long." };
        } else if (!/^[A-Za-z0-9_]{3,16}$/.test(username)) {
            return { success: false, reason: "Invalid username. A username may only include alphanumeric characters, underscores, and be a length of 3 to 16 characters." };
        } else {
            // add data
            accounts[username] = password;
            players[username] = new Player({ name: username, displayName });
            console.log(`signed up, Username: ${username} Password: ${password}`);
            console.log(players);
            return this.loginAccount(req, res);
        }
    }
    // logs in account
    static loginAccount(req, res) {
        const username = req.body.username.toLowerCase();
        if (accounts[username] === req.body.password) {
            req.session.username = username;
            return { success: true };
        } else {
            return { success: false, reason: "The username or password is incorrect." };
        }
    }
    // saves data after server closes
    static saveData() {
        for (const name in players) {
            // console.log(players[name]);
            players[name] = players[name].getSaveData();
        }
        jsonfile.writeFileSync("./data/players.json", players);
        jsonfile.writeFileSync("./data/accounts.json", accounts);
    }
}
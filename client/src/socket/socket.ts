import { io, Socket } from "socket.io-client";

const SERVER_URL = "50.54.130.26:8000"; // Replace with your server URL

const socket: Socket = io(SERVER_URL, {
    withCredentials: true,
    transports: ["websocket", "polling"],
});

export default socket;
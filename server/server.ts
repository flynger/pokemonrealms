import express from 'express';
import color from './util/color';
import Pokemon from "./src/pokemon";
import SingleBattle from './src/battle/singleBattle';
import { Server, Socket } from 'socket.io';
import Player from "./src/players/player";

const mon: Pokemon = new Pokemon("Bulbasaur", 10, { caughtBall: "Master Ball" });
const mon2: Pokemon = new Pokemon("Mareep", 10);
console.log(mon)
console.log(mon2)
const p1 = [mon];
const p2 = [mon2];
const battle = new SingleBattle(p1, p2);
const party1 = battle.sides[0].parties[0];
const party2 = battle.sides[1].parties[0];
party1.takeInput(0, { kind: "move", id: 0, targets: [1] });
party2.takeInput(0, { kind: "move", id: 0, targets: [0] });
party1.takeInput(0, { kind: "move", id: 0, targets: [1] });
party2.takeInput(0, { kind: "move", id: 0, targets: [0] });
party1.takeInput(0, { kind: "move", id: 0, targets: [1] });
party2.takeInput(0, { kind: "move", id: 0, targets: [0] });
party1.takeInput(0, { kind: "move", id: 0, targets: [1] });
party2.takeInput(0, { kind: "move", id: 0, targets: [0] });
party1.takeInput(0, { kind: "move", id: 0, targets: [1] });
party2.takeInput(0, { kind: "move", id: 0, targets: [0] });
party1.takeInput(0, { kind: "move", id: 0, targets: [1] });
party2.takeInput(0, { kind: "move", id: 0, targets: [0] });
party1.takeInput(0, { kind: "move", id: 0, targets: [1] });
party2.takeInput(0, { kind: "move", id: 0, targets: [0] });
// console.log(battle);

const app = express();
const port = 8000;
const serverName = 'Pokemon Realms';

// const clientDirectory = './client/build';
// const clientSendOptions = { root: clientDirectory };

// app.use(express.static(clientDirectory));
// app.use(
//     cors({
//         origin: '*',
//     })
// );

const expressServer = app.listen(port, () => console.log(color.blue, `Starting Server: ${serverName} on port ${port}`));

const io = new Server(expressServer);

io.on('connection', (socket: Socket) => {
  console.log(`User connected: ${socket.id}`);
  const player = new Player();

  // Listen for messages from the client
  socket.on('startEncounter', () => {
    console.log(`Received message: ${message}`);

    // Broadcast the message to all clients
    io.emit('message', message);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });

  // send initial data
  socket.emit()
});


// app.get('/', (_, res) => {
//     res.sendFile('index.html', clientSendOptions);
// });
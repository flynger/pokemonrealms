import express from 'express';
import color from './util/color';
import Pokemon from "./src/pokemon";
import SingleBattle from './src/battle/singleBattle';
import { Server, Socket } from 'socket.io';
import Player from "./src/players/player";
import { Vector2 } from "../shared/maps/types";
import BattleParty from './src/battle/battleParty';
import BattleMon from './src/battle/battleMon';

const users: { [key: string]: any } = {};
const battles = {};

const mon: Pokemon = new Pokemon("Bulbasaur", 10);
const mon2: Pokemon = new Pokemon("Mareep", 10);
const bp1 = [new BattleMon(mon)];
const bp2 = [new BattleMon(mon2)];
const p1 = new BattleParty(bp1);
const p2 = new BattleParty(bp2);
const battle = new SingleBattle(p1, p2);
// const party1 = battle.sides[0].parties[0];
// const party2 = battle.sides[1].parties[0];
// party1.takeInput(0, { kind: "move", id: 0 });
// party2.takeInput(0, { kind: "move", id: 0 });
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

  socket.on('movePlayer', (position: Vector2) => player.moveTo(position));

  socket.on('authenticate', (data) => {
    users[socket.id] = { username: data.username };
    console.log(`User authenticated: ${data.username}`);
  });

  socket.on('startEncounter', () => {
    console.log("Starting encounter");
    const user = users[socket.id];
    const wildMon: Pokemon = new Pokemon("Bulbasaur", 10);
    // TODO pull mon from user's party from a database
    const bp1 = [new BattleMon(wildMon)];
    const p1 = new BattleParty(bp1);
    // const battle = new SingleBattle(p1, p2);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    socket.broadcast.emit("disconnectPlayer", player.name);
  });

  player.onConnect(socket);
});


// app.get('/', (_, res) => {
//     res.sendFile('index.html', clientSendOptions);
// });

export default io;
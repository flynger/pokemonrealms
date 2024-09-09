import express from 'express';
import color from './util/color';
import Pokemon from "./src/pokemon";
import SingleBattle from './src/battle/singleBattle';
import { Server, Socket } from 'socket.io';
import Player from "./src/players/player";
import { Vector2 } from "../shared/maps/types";
import BattleParty from './src/battle/battleParty';

const mon: Pokemon = new Pokemon("Bulbasaur", 10);
const mon2: Pokemon = new Pokemon("Mareep", 10);
const p1 = new BattleParty([mon]);
const p2 = new BattleParty([mon2]);
const battle = new SingleBattle(p1, p2);
// const party1 = battle.sides[0].parties[0];
// const party2 = battle.sides[1].parties[0];
// party1.takeInput(0, { kind: "move", id: 0 });
// party2.takeInput(0, { kind: "move", id: 0 });
// console.log(battle.output);

// const battle = new SingleBattle([mon], [mon2]);

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
  // const playerBp = [new BattleMon(new Pokemon("Mareep", 10))];
  // player.party = new BattleParty(playerBp, player);

  socket.on('movePlayer', (position: Vector2) => player.moveTo(position));

  socket.on('authenticate', (data) => {
    // users[socket.id] = { username: data.username };
    // console.log(`User authenticated: ${data.username}`);
  });

  socket.on('useMove', (moveNum: 0|1|2|3) => {
    //TODO validate input
    if ( !player.battle || !player.party ) return;
    // const spotsRequiringInput = player.party.spots!.filter(spot => !spot.turnInput);
    // if (spotsRequiringInput.length === 0) return;
    
    // spotsRequiringInput[0].takeInput({ kind: "move", id: moveNum });
  });

  socket.on('startEncounter', () => {
    console.log("Starting encounter");
    if (!player.party || player.battle ) return;
    
    const wildMon: Pokemon = new Pokemon("Bulbasaur", 10);
    // const bp1 = [new BattleMon(wildMon)];
    // player.battle = new SingleBattle(player.party, new BattleParty(bp1));
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
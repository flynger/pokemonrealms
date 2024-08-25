import './globals/globals';
import express from 'express';
import color from './util/color';
import Pokemon from './src/pokemon';
import SingleBattle from './src/battle/singleBattle';

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

const clientDirectory = './client/build';
const clientSendOptions = { root: clientDirectory };

app.use(express.static(clientDirectory));
// app.use(
//     cors({
//         origin: '*',
//     })
// );

const expressServer = app.listen(port, () => console.log(color.blue, `Starting Server: ${serverName} on port ${port}`));

app.get('/', (_, res) => {
    res.sendFile('index.html', clientSendOptions);
});
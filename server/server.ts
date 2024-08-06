import './globals/globals';
import express from 'express';
// import cors from 'cors';
import color from './util/color';
import Pokemon from './src/pokemon';

const mon: Pokemon = new Pokemon("Bulbasaur", 10, { caughtBall: "Master Ball" });
const mon2: Pokemon = new Pokemon("Mareep", 10);
console.log(mon, mon2)

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
import './src/util/util.js';
import express from 'express';
// import cors from 'cors';
import color from './util/color.js';

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
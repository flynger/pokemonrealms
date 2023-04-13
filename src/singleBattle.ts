import { DefaultText } from 'pokemon-showdown/data/text/default';

export function singleBattle() {
    const Sim = require('pokemon-showdown');
    const stream = new Sim.BattleStream();

    const battleOptions = {
        formatid: 'gen7ou', // the format ID for the battle
        p1: {
            name: 'Flynger',
            team: 'insert packed team here'
        },
        p2: {
            name: 'Eichardo',
            team: 'insert packed team here'
        }
    };

    // Start the battle
    stream.write(`>start ${JSON.stringify(battleOptions)}`);

    // Write player choices and read protocol messages from the stream
    (async () => {
        for await (const output of stream) {
            console.log(output);

            // Parse the output to get the battle log for each turn
            if (output.startsWith('|turn|')) {
                const turnNumber = output.split('|')[2];
                const log = output.split('\n').slice(1, -1).map(line => line.substr(1)).join('\n');
                console.log(`Turn ${turnNumber} log: ${log}`);
            }
        }
    })();

    // Example player choices
    stream.write('>p1 move 1');
    stream.write('>p2 switch 2');
    stream.write('>p1 move 2');
    stream.write('>p2 move 3');
    // etc...
}
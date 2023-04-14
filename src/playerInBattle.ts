//player object according to smogon requirements

export type PlayerID = 'p1'|'p2'|'p3'|'p4';
export type PlayerInBattle = {
    playerId: PlayerID,
    name: string,
    avatar: string,
    team: string[],
}

export function createPlayerOptions(): object {
    return battleOptions;
}

const battleOptions = {
    formatid: 'gen7ou',
    p1: {
        name: 'Flynger',
        team: 'insert packed team here',
    },
    p2: {
        name: 'Eichardo',
        team: 'insert packed team here',
    }
}
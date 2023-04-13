//player object according to smogon requirements

export type PlayerID = 'p1'|'p2'|'p3'|'p4';
export type PlayerInBattle = {
    playerId: PlayerID,
    name: string,
    avatar: string,
    team: string[],
}
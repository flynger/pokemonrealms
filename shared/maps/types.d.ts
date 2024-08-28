import Maps from "./maps";

export type MapLocation = typeof Maps[number];
export type Vector2 = { x: number, y: number };
export type PlayerMovementData = {
    name: string;
    avatar: PlayerAvatar;
    position: Vector2;
};
export type PlayerMapData = PlayerMovementData & { location: MapLocation };
export type InitialMapData = {
    player: PlayerMapData
};
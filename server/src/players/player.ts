export default class Player {
    avatar: PlayerAvatar = "red";
    loc: Location = {
        map: "Ranch",
        submap: ""
    };
    pos: Vector2;
    constructor() {
        this.pos = { x: 0, y: 0 };
    }
}

type PlayerAvatar = "red";
type Location = {
    map: "Ranch",
    submap: ""
};
type Vector2 = { x: number, y: number };
import { MapLocation } from "@/shared/maps/types";

export default class Player {
    avatar: PlayerAvatar = "red";
    loc: MapLocation = {
        map: "Ranch",
        submap: ""
    };
    pos: Vector2 = { x: 500, y: 200 };

    constructor() {
        // this.pos = pos;
    }

    moveTo(pos: Vector2) {
        this.pos = pos;
        // update map
    }
}

type PlayerAvatar = "red";

type Vector2 = { x: number, y: number };
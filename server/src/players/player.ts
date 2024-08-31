import io from "../../server";

import { MapLocation, PlayerMapData, PlayerMovementData, Vector2 } from "@/shared/maps/types";
import { randomInteger } from "../../../shared/shared";
import { PlayerAvatar } from "../../../shared/players/types";
import { Socket } from "socket.io";

export default class Player {
    private static readonly entries: Map<string, Player> = new Map();
    name: string;
    avatar: PlayerAvatar = "red";
    location: MapLocation = {
        map: "Ranch",
        subarea: "Ranch"
    };
    position: Vector2 = { x: 500, y: 200 };
    socket?: Socket;

    constructor(name?: string) {
        while (name === undefined || Player.entries.has(name)) {
            name = "Guest " + randomInteger(1, 9999);
        }
        console.log(name)
        this.name = name;
        Player.entries.set(this.name, this);
    }

    onConnect(socket: Socket) {
        this.socket = socket;
        socket.emit("loadMap", { player: this.getMapData() });
    }

    moveTo(position: Vector2) {
        this.position = position;
        
        io.emit("movePlayer", this.getMovementData());
    }

    getMovementData(): PlayerMovementData {
        const { name, avatar, position } = this;
        return { name, avatar, position };
    }

    getMapData(): PlayerMapData {
        const { name, avatar, location, position } = this;
        return { name, avatar, location, position };
    }

    // Battle
    getTurnInput() {
        
    }
}
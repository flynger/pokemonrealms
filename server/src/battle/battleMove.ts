import Pokemon from "pokemon";
import Field from "./field";
import Side from "./oldSide";
import BattleParty, { InputKind } from "./battleParty";
import BattleSpot from "./battleSpot";
import Move, { Moves, MoveTarget } from "../pokedex/move";
import { MoveInput } from "./battleParty";


export const executeRun = () => {
    // if(calculateRun()) {
    //     console.log("You got away safely!");
    // } else {
    //     console.log("You couldn't get away!");
    // }
}

// const getPossibleTargets = (move: Move): BattleSpot[] => {
//     const moveEntry = Moves.get(move);

// }

// const hitsAllPossibleTargets = (move: Move): boolean => {
//     const allTargets = new Set<MoveTarget>(["allAdjacentFoes"]);
//     const moveEntry = Moves.get(move);
//     if (moveEntry.target ) {

//     }
// }

// export const 

const calculateRun = (userSpe: number, foeSpe: number, runTimes: number = 1): boolean => {
    let runChance = (userSpe*32/(foeSpe/4))+30*runTimes; 
    return Math.random() * 255 < runChance;
}
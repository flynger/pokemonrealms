import Pokemon from "pokemon";
import Field from "./field";
import Side from "./side";
import BattleParty, { InputKind } from "./battleParty";
import BattleSpot from "./battleSpot";
import Move, { Moves } from "../pokedex/move";
import { MoveInput } from "./battleParty";


export const executeMove = (nextInput: MoveInput, mon: Pokemon, battleSpots: BattleSpot[]) => {
    const moveEntry = Moves.get(mon.moves[nextInput.id]);
    console.log(`${mon.getName()} used ${moveEntry.name}!`);
    if (moveEntry.category === "Status") {
        console.log(`but nothing happened...`);
    } else {
        for (const target of nextInput.targets) {
            const foeSpot = battleSpots[target];
            //stop if there is no target
            if (!foeSpot.mon) continue;
            //calculate damage            
            dealDamage(mon, [foeSpot], moveEntry.power!);
        }
    }
}

export const executeRun = () => {
    // if(calculateRun()) {
    //     console.log("You got away safely!");
    // } else {
    //     console.log("You couldn't get away!");
    // }
}

const calculateDamage = (level: number, atk: number, def: number, power: number): number => {
    const dmg = Math.floor((2 * level / 5 + 2) * power * atk / def / 50 + 2);
    return Math.max(dmg, 1);
}

const dealDamage = (user: Pokemon, recipients: BattleSpot[], power: number) => {
    for (const recipient of recipients) {
        let rec = recipient.mon!;
        let dmg = calculateDamage(user!.level, user!.atk, rec.def, power);
        console.log(`${rec.getName()} HP${rec.currenthp}/${rec.hp}, took ${Math.min(dmg, rec.currenthp)} damage`);
        rec.currenthp -= dmg;

        //fainted
        if(rec.currenthp <= 0) {
            console.log(`${rec.getName()} fainted!`);
            rec.currenthp = 0;
            recipient.mon = undefined;
        }
    }

    const calculateRun = (user: Pokemon, foe: Pokemon): boolean => {
        return false;
    }
}


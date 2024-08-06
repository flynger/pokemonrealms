import { Stats } from "pokemon";
import { Type } from "./type";
import MOVE_DATA from "./data/moves";

type MoveCategory = "Physical" | "Special" | "Status";

/** Possible move flags. */
interface MoveFlags {
    allyanim?: 1; // The move plays its animation when used on an ally.
    bypasssub?: 1; // Ignores a target's substitute.
    bite?: 1; // Power is multiplied by 1.5 when used by a Pokemon with the Ability Strong Jaw.
    bullet?: 1; // Has no effect on Pokemon with the Ability Bulletproof.
    cantusetwice?: 1; // The user cannot select this move after a previous successful use.
    charge?: 1; // The user is unable to make a move between turns.
    contact?: 1; // Makes contact.
    dance?: 1; // When used by a Pokemon, other Pokemon with the Ability Dancer can attempt to execute the same move.
    defrost?: 1; // Thaws the user if executed successfully while the user is frozen.
    distance?: 1; // Can target a Pokemon positioned anywhere in a Triple Battle.
    failcopycat?: 1; // Cannot be selected by Copycat.
    failencore?: 1; // Encore fails if target used this move.
    failinstruct?: 1; // Cannot be repeated by Instruct.
    failmefirst?: 1; // Cannot be selected by Me First.
    failmimic?: 1; // Cannot be copied by Mimic.
    futuremove?: 1; // Targets a slot, and in 2 turns damages that slot.
    gravity?: 1; // Prevented from being executed or selected during Gravity's effect.
    heal?: 1; // Prevented from being executed or selected during Heal Block's effect.
    metronome?: 1; // Can be selected by Metronome.
    mirror?: 1; // Can be copied by Mirror Move.
    mustpressure?: 1; // Additional PP is deducted due to Pressure when it ordinarily would not.
    noassist?: 1; // Cannot be selected by Assist.
    nonsky?: 1; // Prevented from being executed or selected in a Sky Battle.
    noparentalbond?: 1; // Cannot be made to hit twice via Parental Bond.
    nosketch?: 1; // Cannot be copied by Sketch.
    nosleeptalk?: 1; // Cannot be selected by Sleep Talk.
    pledgecombo?: 1; // Gems will not activate. Cannot be redirected by Storm Drain / Lightning Rod.
    powder?: 1; // Has no effect on Pokemon which are Grass-type, have the Ability Overcoat, or hold Safety Goggles.
    protect?: 1; // Blocked by Detect, Protect, Spiky Shield, and if not a Status move, King's Shield.
    pulse?: 1; // Power is multiplied by 1.5 when used by a Pokemon with the Ability Mega Launcher.
    punch?: 1; // Power is multiplied by 1.2 when used by a Pokemon with the Ability Iron Fist.
    recharge?: 1; // If this move is successful, the user must recharge on the following turn and cannot make a move.
    reflectable?: 1; // Bounced back to the original user by Magic Coat or the Ability Magic Bounce.
    slicing?: 1; // Power is multiplied by 1.5 when used by a Pokemon with the Ability Sharpness.
    snatch?: 1; // Can be stolen from the original user and instead used by another Pokemon using Snatch.
    sound?: 1; // Has no effect on Pokemon with the Ability Soundproof.
    wind?: 1; // Activates the Wind Power and Wind Rider Abilities.
}

export type MoveTarget = "allAdjacentFoes";
// 'adjacentAlly' | 'adjacentAllyOrSelf' | 'adjacentFoe' | 'all' | 'allAdjacent' | 'allAdjacentFoes' |
// 'allies' | 'allySide' | 'allyTeam' | 'any' | 'foeSide' | 'randomNormal' | 'scripted' | 'self';

interface MoveEntry {
    num: number,
    accuracy?: number,
    basePower?: number,
    category: MoveCategory,
    name: Move,
    pp: number,
    flags: MoveFlags,
    stages?: Partial<Stats>,
    target?: MoveTarget,
    type: Type
}

export class Moves {
    private static entries: Record<Move, MoveEntry> = MOVE_DATA;

    static get(move: Move): MoveEntry {
        return Moves.entries[move];
    }
}

type Move = keyof typeof MOVE_DATA;
export default Move;
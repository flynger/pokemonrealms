import Pokemon from "pokemon";
import { BattlePosition } from "./side";

export type BattleOutput =
    { type: "switchIn", mon: Partial<Pokemon> } & BattlePosition |
    { type: "switchOut" } & BattlePosition |
    { type: "faint" } & BattlePosition
import { StatStages } from "./battleSpot";

export default interface BattleData {
    msg: string;
    // none for no need for animation like move fail (most moves can use this for now)
    // switch for switch
    // health for damage or heal
    // status for status change
    // statChange for stat change
    // faint for faint
    effect: { type: "none"} | 
    { type: "switch", index: number} | 
    { type: "health", index: number, healthPercent: number} | 
    { type: "status", index: number, status: string } | 
    { type: "statChange", index: number, statChangees: StatStages } | 
    { type:"faint", index: number} 
}

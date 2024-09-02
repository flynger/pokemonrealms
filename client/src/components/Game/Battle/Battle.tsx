import { useEffect, useState } from "react";
import "./Battle.css";
import HpBar from "./components/HpBar";
import MonLabel from "./components/MonLabel";
import XpBar from "./components/XpBar";
import socket from "../../../socket/socket";

type MessageState = "actions" | "fight" | "message";

export default function Battle() {
    const you = {
        name: "Mareep",
        species: "Mareep",
        level: 6,
        shiny: false,
        currenthp: 20,
        hp: 23
    };
    const foe = {
        name: "Lillipup",
        species: "Lillipup",
        level: 3,
        shiny: false,
        hpPercent: 26
    };
    // const [messageState, setMessageState] = useState<MessageState>("message");
    const [actions, setActions] = useState<unknown[]>([]);

    useEffect(() => {
        socket.on('nextTurn', ({ actions }: { actions: unknown[] }) => {
            setActions(actions);
            console.log(actions);
        });
    }, []);

    return (
        <div id="battle">
            <div id="battle-container">
                <div id="foe">
                    <img className="base foe" src="assets/battle/field_base1.png" />
                    <img className="pokemon foe" src={`assets/pokemon/sprites/front/${foe.shiny ? 'shiny/' : ''}lillipup.gif`} />
                </div>
                <div id="you">
                    <img className="base you" src="assets/battle/field_base1.png" />
                    <img className="pokemon you" src={`assets/pokemon/sprites/back/${you.shiny ? 'shiny/' : ''}mareep.gif`} />
                </div>

                <div className="info you">
                    <div id="info-you-container">
                        <MonLabel name={you.name} level={you.level} shiny={you.shiny} />
                        <div className="info-row s">
                            <HpBar percent={you.currenthp / you.hp * 100} />
                        </div>
                        <div className="info-row s">
                            <span className="hp">{you.currenthp}/{you.hp}</span>
                        </div>
                    </div>
                    <XpBar percent={100} />
                </div>

                <div className="info foe">
                    <div id="info-foe-container">
                        <MonLabel name={foe.name} level={foe.level} shiny={foe.shiny} />
                        <div className="info-row s">
                            <HpBar percent={foe.hpPercent} />
                        </div>
                    </div>
                </div>
                <div className="message">
                    <DialogueBox text="But our sides can have multiple people so maybe we should put active on every party?" />
                </div>
                {/* {messageState === "message" && <div className="message">
                    <span id="battle-msg">Go! Squirtle!</span>
                </div>}
                {messageState !== "message" && <div className="message" id="battle-btns">
                    {messageState === "actions" &&
                        <>
                            <div id="battle-btns-message">
                                What will {you.name} do?
                            </div>
                            <div id="battle-btns-container">
                                <button className="battle-btn fight" onClick={() => setMessageState("fight")}>FIGHT</button>
                                <button className="battle-btn bag">BAG</button>
                                <button className="battle-btn switch">SWITCH</button>
                                <button className="battle-btn run">RUN</button>
                            </div>
                        </>}
                    {messageState === "fight" && <div id="fights-btns-container">
                        <button className="battle-btn"></button>
                        <button className="battle-btn"></button>
                        <button className="battle-btn"></button>
                        <button className="battle-btn"></button>
                    </div>}
                </div>} */}
                {/* <div id="battle-btns">
                </div>
                <div id="battle-btns-footer">
                </div> */}
            </div>
        </div>
    );
}

type DialogueBoxProps = { text: string };
const DialogueBox = ({ text }: DialogueBoxProps) => {
    return (
      <div id="battle-dialogue">
        {text.split('').map((char, index) => (
          <span key={index} style={{ animationDelay: `${index * 0.005}s` }}>
            {char}
          </span>
        ))}
      </div>
    );
  };
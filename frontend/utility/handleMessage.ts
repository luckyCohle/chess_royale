import { Chess } from "chess.js";
import { Dispatch, RefObject, SetStateAction } from "react";
import { boardType } from "./board";
import { messageTypes } from "./message";
import { moveType } from "./moveType";

export const messageHandler = (
    stringMessage: string,
    chess: Chess,
    setChess: Dispatch<SetStateAction<Chess>>,
    board: boardType,
    setBoard: Dispatch<SetStateAction<boardType>>,
    prespective:"b"|"w",
    setMoves:Dispatch<SetStateAction<moveType[]>>,
    setGameStarted:Dispatch<SetStateAction<boolean>>
) => {
    const message = JSON.parse(stringMessage);

    switch (message.type) {
        case messageTypes.Init_Game:
            console.log("Game initialized");
            const newChess = new Chess();
            setGameStarted((prev)=>{
                return true;
            })
            setChess(newChess);
            setBoard((prevBoard) => {
                return chess.board();
            });
            
            break; 

        case messageTypes.Move:
            const playerColor = message.payload.player;
            const move = {
                from: message.payload.from,
                to: message.payload.to,
            };
            console.log("Attempting move:", move);
            const result = chess.move(move)
            let newMove ={
                from:move.from,
                to:move.to,
                player:prespective,
            }
            setMoves((prevMoves)=>{
                return [...prevMoves,newMove]
    })
            if (result) {
                setBoard((prevBoard) => {
                    return chess.board()
                });
            } else {
                console.error("Invalid move:", move);
            }
            break;
        case messageTypes.Game_Over:
            console.log("Game Over");
            break; 

        default:
            console.warn("Unknown message type:", message.type);
            break;
    }
};

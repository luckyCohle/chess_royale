import { Chess } from "chess.js";
import { messageTypes } from "./message";
import { useGameStore } from "@/stateStore/chessStore";
import { GameState } from "@/stateStore/chessStore";


export const messageHandler = (stringMessage: string, gameStore: GameState) => {
    const {
        chess,
        setChess,
        setBoard,
        setGameStarted,
        setWinner,
        setIsFindingOpponent,
        addMove,
        setDrawRequested,
        setPerspective,
        setGameOverDetail,
        setIsGameOver,
    } = gameStore; 

    const message = JSON.parse(stringMessage);

    switch (message.type) {
        case messageTypes.Init_Game:
            console.log("Game initialized");
            setIsFindingOpponent(true);
            const newChess = new Chess();
            setGameStarted(true);
            setChess(newChess);
            setBoard();
            break;

        case messageTypes.Init_Game_done:
            setIsFindingOpponent(false);
            setGameStarted(true);
            const color: string = message.payload.color;
            const colorChar = color.split("")[0] as "b" | "w";
            setPerspective(colorChar);
            break;

        case messageTypes.Move:
            const playerColor = message.payload.player;
            const move = {
                from: message.payload.from,
                to: message.payload.to,
            };
            console.log("Attempting move:", move);
            let newMove = {
                from: move.from,
                to: move.to,
                player: playerColor,
            };
            addMove(newMove);
            const result = chess.move(move);
            if (result) {
                setBoard();
            } else {
                console.error("Invalid move:", move);
            }
            break;

        case messageTypes.Request_Draw:
            setDrawRequested(true);
            break;

        case messageTypes.Draw:
            console.log("draw condition: " + message.payload.condition);
            setGameOverDetail({
                type: "draw",
                reason: message.payload.condition,
            });
            setIsGameOver(true);
            setGameStarted(false);
            break;

        case messageTypes.Game_Over:
            console.log("winner: " + message.payload.winner);
            console.log("condition: " + message.payload.condition);
            setGameOverDetail({
                type: "game_over",
                reason: message.payload.condition,
            });
            setWinner(message.payload.winner);
            setIsGameOver(true);
            setGameStarted(false);
            break;

        default:
            console.warn("Unknown message type:", message.type);
            break;
    }
};

import { useGameStore } from "@/stateStore/chessStore";
import { DragItem } from "@/utility/drag";
import { messageTypes } from "@/utility/message";
import { Color, PieceSymbol, Square } from "chess.js";
import React, { useState } from "react";
import { useDrop } from "react-dnd";
import Piece from "./Piece";
import { getImage, getSquareCode } from "@/utility/chessBoardUtils";

interface propType {
    socket: WebSocket,
}

function ChessBoard({ socket }: propType) {
    const [to, setTo] = useState<Square | null>(null);
    const [from, setFrom] = useState<Square | null>(null);
    const { chess, board, setBoard, addMove, perspective } = useGameStore()


    function handleSquareClick(square: Square | null, squreCode: string) {
        if (!from) {
            setFrom(square);
        } else {
            handleMove(from, squreCode)
        }
    }
    function handleMove(from: string, to: string) {
        try {
            console.log(`Attempting move from ${from} to ${to}`);
            const result = chess.move({ from, to });
            if (result) {
                console.log("Move successful:", result);
                setBoard();
                addMove({ from, to, player: perspective });
                socket.send(JSON.stringify({
                    type: messageTypes.Move,
                    payload: { from, to },
                }));
            } else {
                console.log("Move returned null - invalid but no error thrown");
            }
        } catch (err) {
            console.error("Invalid move error:", err);
            // Reset selection to allow for new selection
            setFrom(null);
        }
    }


    // Get the board to render based on perspective
    const displayBoard = perspective === "w" ? board : [...board].reverse().map(row => [...row].reverse());

    return (
        <div className="grid grid-cols-8 gap-0 border-4 border-gray-700 w-full max-w-[45rem] mx-auto contain-content">
            {displayBoard.map((row, rowIndex) =>
                row.map((square, colIndex) => {
                    const squareCode = getSquareCode(rowIndex, colIndex,perspective);
                    const isLightSquare = perspective === "w"
                        ? (rowIndex + colIndex) % 2 === 0
                        : (7 - rowIndex + 7 - colIndex) % 2 === 0;
                 
                        const [{ isOver }, dropRef] = useDrop({
                            accept: "piece",
                            drop: (item: DragItem) => {
                                const from = item.square;
                                const to = squareCode;
                                
                                // Enhanced debugging
                                console.log("Drop detected!");
                                // console.log("Piece:", item.piece);
                                console.log("From square:", from);
                                console.log("To square:", to);
                                console.log("Current board state:", chess.fen());
                                
                                handleMove(from, to); 
                            },
                            collect: (monitor) => ({
                                isOver: !!monitor.isOver(),
                            }),
                        });
                        
                    return (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            className={`flex items-center justify-center h-16 w-16 md:h-20 md:w-20
                                text-lg font-bold uppercase ${isLightSquare ? "bg-gray-300" : "bg-green-700 text-white"}`}
                            ref={(node) => {
                                if (node) dropRef(node);
                            }}

                            onClick={() => handleSquareClick(square?.square ?? null, squareCode)}
                        >
                            {square ? <Piece piece={getImage(square.type, square.color)} square={squareCode} /> : ""}
                        </div>
                    );
                })
            )}
        </div>
    );
}

export default ChessBoard;
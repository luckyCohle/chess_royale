import { boardType } from "@/utility/board";
import { messageTypes } from "@/utility/message";
import { Chess, Color, PieceSymbol, Square } from "chess.js";
import React, { Dispatch, RefObject, SetStateAction, useEffect, useState } from "react";
import { json } from "stream/consumers";

interface propType {
  board: boardType,
  socket: WebSocket,
  chess: Chess,
  setBoard: Dispatch<SetStateAction<boardType>>,
  prespective: "b" | "w"
}

function ChessBoard({ board, socket, chess, setBoard, prespective }: propType) {
    const [to, setTo] = useState<Square | null>(null);
    const [from, setFrom] = useState<Square | null>(null);

    function getImage(piece: PieceSymbol, color: Color) {
        let returnValue = ""
        if (color == "w") {
            returnValue = piece + ".png";
        } else {
            returnValue = "b" + piece + ".png"
        }
        return returnValue;
    }

    function handleSquareClick(square: Square | null, squreCode: string) {
        if (!from) {
            setFrom(square);
        } else {
            const newMove = { from, to: squreCode };
            
            const result = chess.move(newMove);
            if (result) {
                setBoard(chess.board());
                socket.send(JSON.stringify({
                    type: messageTypes.Move,
                    payload: newMove,
                }));
            } else {
                console.error("Invalid move:", newMove);
            }
            
            setFrom(null);
        }
    }

    // Calculate square code based on perspective
    function getSquareCode(rowIndex: number, colIndex: number): string {
        if (prespective === "w") {
            // White perspective: a1 at bottom-left
            const rowNo = 8 - rowIndex;
            const colChar = String.fromCharCode(97 + colIndex);
            return colChar + rowNo.toString();
        } else {
            // Black perspective: a8 at bottom-left (from black's view)
            const rowNo = rowIndex + 1;
            const colChar = String.fromCharCode(97 + (7 - colIndex));
            return colChar + rowNo.toString();
        }
    }

    // Get the board to render based on perspective
    const displayBoard = prespective === "w" ? board : [...board].reverse().map(row => [...row].reverse());

    return (
        <div className="grid grid-cols-8 gap-0 border-4 border-gray-700 w-full max-w-[45rem] mx-auto contain-content">
            {displayBoard.map((row, rowIndex) =>
                row.map((square, colIndex) => {
                    const squreCode = getSquareCode(rowIndex, colIndex);
                    const isLightSquare = prespective === "w" 
                        ? (rowIndex + colIndex) % 2 === 0
                        : (7 - rowIndex + 7 - colIndex) % 2 === 0;

                    return (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            className={`flex items-center justify-center h-16 w-16 md:h-20 md:w-20
                                text-lg font-bold uppercase ${isLightSquare ? "bg-gray-300" : "bg-green-700 text-white"}`}
                            onClick={() => handleSquareClick(square?.square ?? null, squreCode)}
                        >
                            {square ? <img src={`${getImage(square.type, square.color)}`} alt={`${square.type}`} /> : ""}
                        </div>
                    );
                })
            )}
        </div>
    );
}

export default ChessBoard;
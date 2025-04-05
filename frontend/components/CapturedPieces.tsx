"use client";

import { useGameStore } from "@/stateStore/chessStore";
import { getImage } from "@/utility/chessBoardUtils";
import { PieceSymbol } from "chess.js";
import React from "react";

interface CapturedPiecesProps {
  show: "capturedByBlack" | "capturedByWhite";
}

function CapturedPieces({ show }: CapturedPiecesProps) {
  const { capturedByBlack, capturedByWhite } = useGameStore();
  const piecesToShow = show === "capturedByBlack" ? capturedByBlack : capturedByWhite;
  const piecesNotToShow = show === "capturedByBlack"? capturedByWhite: capturedByBlack;
  const pieceColor = show === "capturedByBlack" ? "w" : "b";
  let totalPieceValue = 0;
  let totalOppositePieceValue=0;
  console.log("captured by black\n")
  console.log(capturedByBlack);
  console.log("")
  
  // Sort pieces by value (pawn, knight/bishop, rook, queen)
  const pieceValue = {
    p: 1, n: 3, b: 3, r: 5, q: 9
  };
  for(let piece of piecesToShow){
    totalPieceValue += pieceValue[piece as keyof typeof pieceValue];
  }
  for(let piece of piecesNotToShow){
    totalOppositePieceValue += pieceValue[piece as keyof typeof pieceValue];
  }
  const valueDifference = totalPieceValue-totalOppositePieceValue;
  
  const sortedPieces = [...piecesToShow].sort((a, b) => 
    pieceValue[b as keyof typeof pieceValue] - pieceValue[a as keyof typeof pieceValue]
  );

  return (
    <div className="w-full flex flex-row flex-wrap items-center p-1 min-h-8 bg-gray-600">
      {sortedPieces.map((piece, index) => (
        <img 
          src={getImage(piece as PieceSymbol, pieceColor as "w" | "b")} 
          key={`${piece}-${index}`}
          className="w-8 h-8 mx-0.5" 
          alt={`Captured ${pieceColor === "w" ? "white" : "black"} ${piece}`}
        />
      ))}
      <div className="text-white flex justify-center items-center font-bold text-lg ">
      {valueDifference>0?`+${valueDifference}`:``}
      </div>
    </div>
  );
}

export default CapturedPieces;
import { moveType } from '@/utility/moveType'
import React from 'react'

function GamePannel({ moves }: { moves: moveType[] }) {
    const blackMoves = moves.filter((move) => move.player === "b");
    const whiteMoves = moves.filter((move) => move.player === "w");

    return (
        <div className="flex flex-col justify-center items-center space-y-4 bg-gray-800 p-6 rounded-lg shadow-md w-full">
            <div className="w-full h-full grid grid-rows-3">
                {/* Move Display (2/3 of space) */}
                <div className="flex flex-col row-span-2 w-full">
                    <div className="flex justify-between text-gray-300 font-semibold px-4">
                        <p>#</p>
                        <p>White</p>
                        <p>Black</p>
                    </div>
                    {
                        whiteMoves.map((wMove, index) => (
                            <div key={index} className="text-white flex justify-between px-4 py-1 border-b border-gray-700">
                                <p>{index + 1}</p>
                                <p>{wMove.to}</p>
                                <p>{blackMoves[index]?.to || '-'}</p>
                            </div>
                        ))
                    }
                </div>
                {/* Placeholder for additional content */}
                <div></div>
            </div>
        </div>
    )
}

export default GamePannel;

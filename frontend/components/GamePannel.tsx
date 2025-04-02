import { drawConditions, messageTypes, winningConditions } from '@/utility/message';
import { moveType } from '@/utility/moveType'
import { Flag, Handshake, X } from 'lucide-react';
import React, { Dispatch, SetStateAction } from 'react';

function GamePanel({ 
  moves, 
  socket, 
  prespective, 
  drawRequested, 
  setDrawRequested
}: { 
  moves: moveType[], 
  socket: WebSocket, 
  prespective: "b" | "w",
  drawRequested: boolean,
  setDrawRequested: Dispatch<SetStateAction<boolean>>
}) {
    const blackMoves = moves.filter((move) => move.player === "b");
    const whiteMoves = moves.filter((move) => move.player === "w");
    
    function onDraw() {
        socket.send(JSON.stringify({
            type: messageTypes.Request_Draw
        }))
    }
    
    function onResign() {
        socket.send(JSON.stringify({
            type: messageTypes.Game_Over,
            payload: {
                winner: prespective === "b" ? "w" : "b",
                condition: winningConditions.resign
            }
        }))
    }
    
    function acceptDraw() {
        setDrawRequested(false);
        onDraw();
    }

    return (
        <div className="flex flex-col justify-between bg-gray-900 p-6 rounded-xl shadow-lg w-full border border-gray-800 h-full">
            {/* Game title and info */}
            <div className="mb-4">
                <h2 className="text-xl font-bold text-white mb-1">Game Moves</h2>
                <div className="h-px w-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
            </div>
            
            {/* Move Display */}
            <div className="flex-grow overflow-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 mb-4">
                <div className="sticky top-0 bg-gray-900 flex justify-between text-gray-300 font-semibold px-4 py-2 border-b border-gray-800">
                    <p className="w-1/6 text-center">#</p>
                    <p className="w-2/5 text-center">White</p>
                    <p className="w-2/5 text-center">Black</p>
                </div>
                <div className="max-h-64 overflow-y-auto">
                    {
                        whiteMoves.map((wMove, index) => (
                            <div key={index} className="text-white flex justify-between px-4 py-2 hover:bg-gray-800 transition-colors">
                                <p className="w-1/6 text-center text-gray-400">{index + 1}</p>
                                <p className="w-2/5 text-center font-mono">{wMove.to}</p>
                                <p className="w-2/5 text-center font-mono">{blackMoves[index]?.to || '—'}</p>
                            </div>
                        ))
                    }
                </div>
            </div>

            {/* Draw request dialog */}
            {drawRequested && (
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-4 animate-fadeIn">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-bold text-white">Draw Offer</h3>
                    </div>
                    <p className="text-gray-300 mb-3">Your opponent has offered a draw. Do you accept?</p>
                    <div className="flex space-x-3 justify-center">
                        <button 
                            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center" 
                            onClick={acceptDraw}
                        >
                            <Handshake className="w-4 h-4 mr-2" />
                            Accept
                        </button>
                        <button 
                            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center"
                            onClick={() => setDrawRequested(false)}
                        >
                            <X className="w-4 h-4 mr-2" />
                            Decline
                        </button>
                    </div>
                </div>
            )}

            {/* Game control buttons */}
            <div className="flex justify-center space-x-4 mt-2">
                <button
                    onClick={onDraw}
                    className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-all transform hover:scale-105 shadow-md"
                >
                    <Handshake className="w-5 h-5 mr-2" />
                    Offer Draw
                </button>

                <button
                    onClick={onResign}
                    className="flex items-center bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-all transform hover:scale-105 shadow-md"
                >
                    <Flag className="w-5 h-5 mr-2" />
                    Resign
                </button>
            </div>
        </div>
    )
}

export default GamePanel;
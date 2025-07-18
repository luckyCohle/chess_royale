"use client";
import BeforeGamePannel from '@/components/BeforeGamePannel';
import CapturedPieces from '@/components/CapturedPieces';
import ChessBoard from '@/components/ChessBoard';
import GameOverModal from '@/components/GameOverModal';
import GamePannel from '@/components/GamePannel';
import { useSocket } from '@/hooks/useSocket';
import { useGameStore } from '@/stateStore/chessStore';
import { messageHandler } from '@/utility/handleMessage';
import { messageTypes } from '@/utility/message';
import React, { useEffect, useRef, useState } from 'react';
function Page() {
    const socket = useSocket();
     const gameStore = useGameStore();

    const {gameStarted,perspective,setIsGameOver,setIsFindingOpponent}=gameStore
alert("backend may take a little time to become active .Please wait for 1 minute")
    useEffect(() => {
        if (!socket) return;

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log("message received:", message);            
            messageHandler(event.data,gameStore);
        };
        return ()=>{
            // socket.close()
            socket.onmessage = null;
        }
    }, [socket]);

    if (!socket) {
        return <div className=" flex justify-center items-center text-white text-center text-lg font-semibold mt-4">
            Loading...
            </div>
    }

    function handleClick() {
        // setGameStarted(true);
        setIsFindingOpponent(true);
        setIsGameOver(false);
        console.log("gameStarted: "+gameStarted)
        socket?.send(JSON.stringify({ type: messageTypes.Init_Game }));
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white p-4">
            <div className="max-w-screen-lg w-full grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Chess Board - 2/3 of the space */}
                <div className="md:col-span-2 flex justify-center">
                    <div className="border-4 border-gray-700 p-1 rounded-lg">
                        <CapturedPieces show={perspective === "w" ? "capturedByBlack" : "capturedByWhite"} />
                        <ChessBoard socket={socket} />
                        <CapturedPieces show={perspective === "w" ? "capturedByWhite" : "capturedByBlack"} />
                    </div>
                </div>
                
                {/* Side Panel - 1/3 of the space */}
                {gameStarted 
                    ? <GamePannel socket={socket} />
                    : <BeforeGamePannel socket={socket} handleClick={handleClick} />
                }
            </div>
            
            {/* Show the game over popup if game is over */}
            <GameOverModal handleClick={handleClick} />
        </div>
    );
}

export default Page;

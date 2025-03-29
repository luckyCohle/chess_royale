"use client";
import ChessBoard from '@/components/ChessBoard';
import { useSocket } from '@/hooks/useSocket';
import { messageHandler } from '@/utility/handleMessage';
import { messageTypes } from '@/utility/message';
import { Chess } from 'chess.js';
import React, { useEffect, useRef, useState } from 'react';

function Page() {
    const socket = useSocket();
    const [chess, setChess] = useState(new Chess());
    const [board, setBoard] = useState(chess.board());
    const [prespective,setPrespective] = useState<"b"|"w">("w");
    // const prespective = useRef<"b"|"w">("w");

    useEffect(() => {
        if (!socket) return;

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log("message received:", message);
            if( message.type==messageTypes.Init_Game_done){
            const color:string = message.payload.color;
            const colorChar = color.split("")[0] as "b"|"w";
            // setPrespective(colorChar)
            setPrespective(colorChar)
            console.log("color recieved:"+colorChar)
            console.log(`prespective changed to ${prespective}`)
            return;
            }
            console.log("prespective:"+prespective);
            messageHandler(event.data, chess, setChess, board, setBoard,prespective);
        };
        return ()=>{
            socket.close()
        }
    }, [socket]);

    if (!socket) {
        return <div className=" flex justify-center items-center text-white text-center text-lg font-semibold mt-4">
            Loading...
            </div>
    }

    function handleClick() {
        socket?.send(JSON.stringify({ type: messageTypes.Init_Game }));
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white p-4">
            <div className="max-w-screen-lg w-full grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Chess Board - 2/3 of the space */}
                <div className="md:col-span-2 flex justify-center">
                    <div className="border-4 border-gray-700 p-1 rounded-lg">
                        <ChessBoard board={board} socket={socket} chess={chess} setBoard={setBoard} prespective={prespective} />
                    </div>
                </div>

                {/* Side Panel - 1/3 of the space */}
                <div className="flex flex-col justify-center items-center space-y-4 bg-gray-800 p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold">Chess Royale</h2>
                    <button
                        onClick={handleClick}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition"
                    >
                        Play
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Page;

import { useGameStore } from '@/stateStore/chessStore'
import { messageTypes } from '@/utility/message';
import React, { Dispatch, SetStateAction } from 'react'

function BeforeGamePannel({handleClick,socket}:{handleClick: () => void,socket:WebSocket}) {
  const {isFindingOpponent,setIsFindingOpponent} = useGameStore();
  console.log("isFIndingOpponent: "+isFindingOpponent)
  function handleCancelOnClcik() {
    setIsFindingOpponent(false);
    socket.send(JSON.stringify({
      type:messageTypes.Cancel_init
    }))
  }
  return (
    <div className="flex flex-col justify-center items-center space-y-4 bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold">Chess Royale</h2>
      {
        isFindingOpponent ? (
          <div className='flex flex-col justify-center items-center space-y-4'>
            <p className='text-white font-bold text-2xl'>Looking for Opponent</p>
            <button
              onClick={handleCancelOnClcik}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={handleClick}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition"
          >
            Play
          </button>
        )
      }
    </div>
  )
}

export default BeforeGamePannel
import React from 'react'

function BeforeGamePannel({handleClick}:{handleClick:()=>void}) {
  return (
    <div className="flex flex-col justify-center items-center space-y-4 bg-gray-800 p-6 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold">Chess Royale</h2>
    <button
        onClick={handleClick}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition"
    >
        Play
    </button>
</div>
  )
}

export default BeforeGamePannel
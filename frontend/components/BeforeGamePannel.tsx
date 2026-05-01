import { useGameStore } from '@/stateStore/chessStore'
import { messageTypes } from '@/utility/message';
import { getUserData } from '@/utility/user';
import { userInfoType } from '@/utility/userType';
import { userInfo } from 'os';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import TimeControlDropdown from './TimeControlPanel';

function BeforeGamePannel({handleClick,socket}:{handleClick: () => void,socket:WebSocket}) {
  const {isFindingOpponent,setIsFindingOpponent} = useGameStore();
  console.log("isFIndingOpponent: "+isFindingOpponent)
  const [user,setUser] = useState<userInfoType>();
  useEffect(()=>{
    getUserInfo()
  },[])
  async function getUserInfo(){
    const data = await getUserData()
    // console.log(data)
    setUser({
  email: data.email,
  username: data.username,
  rating: data.rating,
  profile_url: data.profile_url
});
  }
  function handleCancelOnClcik() {
    setIsFindingOpponent(false);
    socket.send(JSON.stringify({
      type:messageTypes.Cancel_init
    }))
  }
  return (
    <div className="flex flex-col justify-between items-center h-full bg-gray-800 p-6 rounded-lg shadow-md">
  
  {/* TOP SECTION */}
  <div className="flex flex-col items-center space-y-4">
    <h2 className="text-2xl font-bold">Chess Royale</h2>

    <TimeControlDropdown/>

    {isFindingOpponent ? (
      <div className="flex flex-col items-center space-y-4">
        <p className="text-white font-bold text-2xl">
          Looking for Opponent
        </p>
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
    )}
  </div>

  {/* BOTTOM PROFILE */}
  <div className="flex items-center space-x-4 mt-6 bg-gray-700 px-4 py-3 rounded-xl shadow-md w-full justify-center">
    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-500">
      <img
        src={user?.profile_url || "/default-avatar.png"}
        alt="Profile"
        className="w-full h-full object-cover"
      />
    </div>

    <div className="flex flex-col">
      <p className="text-white font-semibold text-lg">
        {user?.username || "Guest"}
      </p>
      <p className="text-gray-300 text-sm">
        Rating: {user?.rating ?? "--"}
      </p>
    </div>
  </div>
</div>
  )
}

export default BeforeGamePannel
import React, { useState } from 'react'
import './Body.css'
import Playlists from './Playlists'
import Search from './Search'
function Body({user,setUser,accessToken,code,playingTrack,setPlayingTrack,setAccessToken}) {
  
  const [lyrics, setLyrics] = useState("")
  return (
    <div className='body'>
        <Search setUser={setUser} setAccessToken={setAccessToken} code={code} playingTrack={playingTrack} setPlayingTrack={setPlayingTrack} setLyrics={setLyrics} />
        <Playlists user={user} accessToken={accessToken} code={code} playingTrack={playingTrack} setPlayingTrack={setPlayingTrack}  />
    </div>
  )
}

export default Body
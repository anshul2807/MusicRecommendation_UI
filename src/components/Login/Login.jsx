import React from 'react'
import "./Login.css"
import spotifyIcon from '../../static/spotifyIcon.png';

const AUTH_URL="https://accounts.spotify.com/authorize?client_id=a160f17383de4e958b6df307796c8100&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";


function Login() {
  return (
    <div className='login'>
        <div className="section1">
          <img src={spotifyIcon} alt="spotify-icon"/>
        </div>
        <div className="section2">
          <a className='btn' href={AUTH_URL}>Login</a>
        </div>
    </div>
  )
}

export default Login
import React from 'react'
import "./Login.css"
import spotifyIcon from '../../static/spotifyIcon.png';
function Login() {
  return (
    <div className='login'>
        <div className="section1">
          <img src={spotifyIcon} alt="spotify-icon"/>
        </div>
        <div className="section2">
          <a className='btn' href="/">Login</a>
        </div>
    </div>
  )
}

export default Login
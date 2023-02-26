import './App.css';
import Login from './components/Login/Login';
import Body from './components/Body/Body';
import Player from './components/Player/Player';
import {  useState } from 'react';


const code = new URLSearchParams(window.location.search).get("code")



function App() {
  const [accessToken,setAccessToken]=useState(null);
  const [playingTrack, setPlayingTrack] = useState(null)
  const [user,setUser] = useState({
    isLogin : false,
  });


  return (
    <div className="app">
      {code ? 
        <>
        <Body user={user} setUser={setUser} accessToken={accessToken} setAccessToken={setAccessToken} code={code} playingTrack={playingTrack} setPlayingTrack={setPlayingTrack}/>
        {playingTrack==null?null:
        <Player 
          accessToken={accessToken} 
          trackUri={playingTrack?.uri} 
        />}
      </>
      :
        <Login />
      }
    </div>
  );
}

export default App;

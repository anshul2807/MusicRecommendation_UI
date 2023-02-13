import {useState} from 'react';
import './App.css';
import Login from './components/Login/Login';
import Body from './components/Body/Body';
import Player from './components/Player/Player';

function App() {
  const [user] = useState({
    islogin : true,
    user : {
      name : "Anshul singh"
    }
  }); // temp state 
  return (
    <div className="app">
      {!user.islogin ? 
        <Login />
      :
        <>
          <Body />
          <Player />
        </>
      }
    </div>
  );
}

export default App;

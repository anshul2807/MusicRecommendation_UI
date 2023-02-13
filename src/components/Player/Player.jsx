import React,{useState} from 'react'
import './Player.css'
import Prev from '../../static/previous.svg';
import Next from '../../static/next.svg';
import Play from '../../static/play.svg';
import Volume from '../../static/volumeUp.svg';
import Pause from '../../static/pause.svg';
import Mute from '../../static/mute.svg';

function Player() {
  const [play,setPlay]=useState(false);
  const [mute,setMute]=useState(false);
  const [music,setMusic]=useState({
    songName : "Perfect",
    artistName : "Ed Sheeran",
    min:0,
    max:273,
    currValue : 0
  });

  const convertSecondToMinute = (val) => {
    const min = Math.floor(val / 60);
    const sec = Math.floor(val - min*60);
    return min+":"+sec;
  } 

  return (
    <div className='player'>
        <div className="section1">
          <p className='player__songName'>{music.songName}</p>
          <p className='player__artistName'>{music.artistName}</p>
        </div>
        <div className="section2">
          <div className="section2__1">
            <img className='player__previous' src={Prev} alt="playerPrev" />
            <img className='player__play' src={play ? Pause: Play} alt="playerPlay" onClick={()=>setPlay(!play)}/>
            <img className='player__next' src={Next} alt="playerNext" />
          </div>
          <div className="section2__2">
            <p className='player__start'>{convertSecondToMinute(music.currValue)}</p>
            <input onChange={(e)=>{
              setMusic({
                songName : music.songName,
                artistName : music.artistName,
                min : music.min,
                max : music.max,
                currValue : e.target.value
              })
            }} className='player__range' type="range" min={music.min} max={music.max} value={music.currValue}/>
            <p className='player__end'>{convertSecondToMinute(music.max)}</p>
          </div>
        </div>
        <div className="section3">
          <img className='player__volume' src={mute ? Mute: Volume} alt="playerVolume" onClick={()=>setMute(!mute)}/>
          <input className='player__volume__range' type="range" />
        </div>
    </div>
  )
}

export default Player
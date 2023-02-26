import React, { useRef, useState } from 'react'
import Webcam from "react-webcam";
import './GeneratePlaylist.css'

function GeneratePlaylist({setPlayingTrack}) {
  const [snap,setSnap] = useState(null);
  const [customPlaylist,setCustomPlaylist]=useState([]);
  const camRef = useRef(null);

  const capture = React.useCallback(()=>{
    const getSnap = camRef.current.getScreenshot();
    setSnap(getSnap);
  },[camRef]);

  const videoConstraints = {
    width: 700,
    height: 300,
    facingMode: "user"
  };
  const chooseTrack = (uri) => {
    setPlayingTrack({
        uri : uri
    })
}

  return (
    <div className='generatePlaylist'>
        <div className="section1">
          {snap===null ?
            <Webcam 
            audio={false}
            height={300}
            screenshotFormat="image/jpeg"
            width={700}
            videoConstraints={videoConstraints}
            ref={camRef}
            />
          :
            customPlaylist.length==0 ?
            <h1 className='loading'>Loading...</h1>
            :
            customPlaylist.map((list,ind) => {
              return (
                  <div key={ind} className="section1__song">
                      <img onClick={()=>chooseTrack(list.uri)} src={list.playlistImage} alt="" />
                      <p>{list.name}</p>
                      <p>{list.userName}</p>
                  </div>
              );
          })
          }
        </div>
        <div className="section2">
          <a className='btn-gen' onClick={capture}>Generate</a>
          <a className='btn-gen'onClick={()=>setSnap(null)}>Re-Generate</a>
        </div>
    </div>
  )
}

export default GeneratePlaylist
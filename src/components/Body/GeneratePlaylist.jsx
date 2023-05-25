import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import './GeneratePlaylist.css';
import axios from 'axios';

function GeneratePlaylist({ setPlayingTrack, accessToken }) {
  const [snap, setSnap] = useState(null);
  const [mood, setMood] = useState("");
  const [customPlaylist, setCustomPlaylist] = useState([]);
  const camRef = useRef(null);

  useEffect(() => {
    if (mood.length== 0) return;
    generatePlaylist(mood);
    console.log(mood);
  }, [mood]);

  const generatePlaylist = async (moods) => {
    // console.log(moods);
    const mySet1 = new Set();
    mySet1.add("happy")
    mySet1.add("sad")
    mySet1.add("fear")
    mySet1.add("angry")
    if(mySet1.has(moods)==false)return;
    
    moods=moods.toLowerCase()
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/recommendations?seed_genres=${moods}&limit=10`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const tracks = data.tracks.map((track) => {
          return {
            uri: track.uri,
            name: track.name,
            userName: track.artists[0].name,
            playlistImage: track.album.images[0].url,
          };
        });
        console.log(tracks);
        setCustomPlaylist(tracks);
      } else {
        console.error('Failed to fetch recommendations from the Spotify API');
      }
    } catch (error) {
      console.error('Error occurred while fetching recommendations:', error);
    }
  };

  const handleMood = async (snaps) => {
   
    try {
      const response = await axios.post('http://127.0.0.1:5000/emotion', {photo : snaps});
      // Handle the response as needed
      const data = await response.data;
      // console.log(data);
      // setMood();
      if(data.emotion)
        setMood(data.emotion);
      else {
        alert("Face Not detected")
        setMood('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const capture = React.useCallback(() => {
    const getSnap = camRef.current.getScreenshot();
    setSnap(getSnap);
    handleMood(getSnap);
    // console.log(mood);
  }, [camRef]);

  const videoConstraints = {
    width: 700,
    height: 300,
    facingMode: 'user',
  };

  const chooseTrack = (uri) => {
    setPlayingTrack({
      uri: uri,
    });
  };

  return (
    <div className='generatePlaylist'>
      <div className='section1'>
        {snap === null ? (
          <Webcam
            audio={false}
            height={300}
            screenshotFormat='image/jpeg'
            width={700}
            videoConstraints={videoConstraints}
            ref={camRef}
          />
        ) : customPlaylist.length === 0 ? (
          <h1 className='loading'>Loading...</h1>
        ) : (
          customPlaylist.map((list, ind) => {
            return (
              <div key={ind} className='section1__song'>
                <img
                  onClick={() => chooseTrack(list.uri)}
                  src={list.playlistImage}
                  alt=''
                />
                <p className='section1__title'>{list.name}</p>
                <p>{list.userName}</p>
              </div>
            );
          })
        )}
      </div>
      <div className='section2'>
        <a className='btn-gen' onClick={capture}>
          Generate
        </a>
        <a className='btn-gen' onClick={() => setSnap(null)}>
          Re-Generate
        </a>
        <span>
          {mood.length==0 ? "Click on Generate to get a Custom Playlist!" : `Mood Status : ${mood.toUpperCase()}`}
        </span>
      </div>
    </div>
  );
}

export default GeneratePlaylist;

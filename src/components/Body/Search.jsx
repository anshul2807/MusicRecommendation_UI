import React, { useState,useEffect } from 'react'
import './Search.css'
import SongSearch from '../../static/search.svg'
import SpotifyWebApi from "spotify-web-api-node"
import axios from "axios"
import useAuth from '../../customHook/useAuth';

const spotifyApi = new SpotifyWebApi({
  clientId: "a160f17383de4e958b6df307796c8100",
})

function Search({setAccessToken,code,playingTrack,setPlayingTrack,setLyrics,setUser}) {
  const accessToken = useAuth(code)
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([])

  useEffect(()=>{
    setAccessToken(accessToken);
  },[accessToken])
  function chooseTrack(track) {
    // console.log("track -> ",track);
    setPlayingTrack(track)
    setSearch("")
    setLyrics("")
  }
  useEffect(() => {
    if (!playingTrack) return

    axios
      .get("http://localhost:4000/lyrics", {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then(res => {
        setLyrics(res.data.lyrics)
      })
      
      // console.log(playingTrack);
  }, [playingTrack])

  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  useEffect(() => {
    if (!search) return setSearchResults([])
    if (!accessToken) return
    

    let cancel = false
    spotifyApi.searchTracks(search).then(res => {
      if (cancel) return
      setSearchResults(
        res.body.tracks.items.map(track => {
          
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image
              return smallest
            },
            track.album.images[0]
          )
          // console.log(track);
          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
            duration: Math.floor(track.duration_ms/1000),
          }
        })
      )
    })

    return () => (cancel = true)
  }, [search, accessToken])

  useEffect(()=>{
    if(!accessToken)return;
    spotifyApi.getMe()
    .then(data => {
      // console.log('Some information about the authenticated user', data.body);
      setUser({
        isLogin : true,
        displayName : data.body.display_name,
        email : data.body.email,
        userName:data.body.uri.split(":")[2],
        profileUrl : data.body.images
      })
    }).catch(err => {
      console.log('Something went wrong!', err);
    })

  },[accessToken]);

  function truncate(str, length) {
    if (str.length > length) {
      return str.slice(0, length) + '...';
    } else return str;
  }
  const convertSecondToMinute = (val) => {
    const min = Math.floor(val / 60);
    const sec = Math.floor(val - min*60);
    return min+":"+sec;
  } 

  return (
    <div className='search'>
      <div className="section1">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder='What do you want to listen to?' type="text" />
        <img src={SongSearch} alt="search" />
      </div>
      {
        search ?
          <div className="section2">

            {searchResults.map((track,ind) => {
              // console.log(track);
              return (
                <div key={track.uri} className="search_songs">
                  <div className="search_songs_1">
                    <img src={track.albumUrl} alt="play-btn" onClick={()=>chooseTrack(track)}/>
                  </div>
                  <div className="search_songs_2">
                    <div className="search-songs-songName">
                      {truncate(track.title,10)}
                    </div>
                    <div className="search-songs-artistName">
                      {truncate(track.artist,10)}
                    </div>
                  </div>
                  <div className="search_songs_3">
                    {convertSecondToMinute(track.duration)}
                  </div>
                </div>
              );
            })}

          </div>
          :
          null
      }
    </div>
  )
}

export default Search
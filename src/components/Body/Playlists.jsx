import React, { useEffect, useState } from 'react'
import './Playlists.css';
import SpotifyWebApi from "spotify-web-api-node"
import Play from '../../static/play.svg';
import GeneratePlaylist from './GeneratePlaylist'
const spotifyApi = new SpotifyWebApi({
    clientId: "a160f17383de4e958b6df307796c8100",
})

function Playlists({ accessToken, user,setPlayingTrack }) {

    const [playlist, setPlaylist] = useState([]);
    
    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    useEffect(() => {
        if (!accessToken) return
        if (user.isLogin == false) return
        spotifyApi.getUserPlaylists(user.userName)
            .then(function (data) {
                // console.log(data.body);
                setPlaylist(data.body.items.map(item => {
                    return {
                        name: item.name,
                        uri: item.uri,
                        userName: item.owner.display_name,
                        playlistImage: item.images[0] ?item.images[0].url:Play,
                    }
                }))
            }, function (err) {
                console.log('Something went wrong!', err);
            });
    }, [accessToken, user])

    // console.log(playlist);
    const chooseTrack = (uri) => {
        setPlayingTrack({
            uri : uri
        })
    }
    return (
        <div className='playlists'>
            <h1>Exsisting Playlists</h1>
            <div className="section1">
                {playlist.length === 0 ? 
                <h1 className='loading'>Loading...</h1>
                :
                playlist.map((list,ind) => {
                    return (
                        <div key={ind} className="section1__song">
                            <img onClick={()=>chooseTrack(list.uri)} src={list.playlistImage} alt="" />
                            <p className='section1__title'>{list.name}</p>
                            <p>{list.userName}</p>
                        </div>
                    );
                })
                }
            </div>
            <h1>Generate Custom a Playlists</h1>
            <GeneratePlaylist accessToken={accessToken} setPlayingTrack={setPlayingTrack}/>
        </div>
    )
}

export default Playlists
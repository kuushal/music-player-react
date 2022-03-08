import Song from "./components/Song";
import Player from "./components/Player";
import './styles/app.scss'
import data from '../src/data'
import { useState, useRef } from 'react'
import Library from "./components/Library";

function App() {
  // States
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0
  })


  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[2]);
  const [isPlaying, setisPlaying] = useState(false);

  // Refs
  const audioRef = useRef(null);


  const timeEventHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;

    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration: duration
    })
  }

  return (
    <div className="App">
      <Song
        picture={currentSong.cover}
        songName={currentSong.name}
        artist={currentSong.artist}
      />
      <Player
        currentSong={currentSong}
        isPlaying={isPlaying}
        setisPlaying={setisPlaying}
        songInfo={songInfo}
        audioRef={audioRef}
      />
      <Library
        songs={songs}
        setCurrentSong={setCurrentSong}
        setSongInfo={setSongInfo}
        audioRef={audioRef}
        isPlaying={isPlaying}
      />
      <audio
        onTimeUpdate={timeEventHandler}
        onLoadedMetadata={timeEventHandler}
        ref={audioRef}
        src={currentSong.audio}></audio>
    </div>
  );


}

export default App;

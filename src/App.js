import Song from "./components/Song";
import Player from "./components/Player";
import './styles/app.scss'
import data from '../src/data'
import { useState, useRef } from 'react'
import Library from "./components/Library";
import Nav from "./components/Nav";

function App() {
  // States
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0
  })
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setisPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);

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

  const songEndHandler = async (e) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);

    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);

    if (isPlaying) audioRef.current.play();
  }

  return (
    <div className="App">
      <Nav
        libraryStatus={libraryStatus}
        setLibraryStatus={setLibraryStatus}
      />
      <Song
        picture={currentSong.cover}
        songName={currentSong.name}
        artist={currentSong.artist}
      />
      <Player
        setisPlaying={setisPlaying}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
        currentSong={currentSong}
        isPlaying={isPlaying}
        songInfo={songInfo}
        audioRef={audioRef}
        songs={songs}
      />
      <Library
        songs={songs}
        setCurrentSong={setCurrentSong}
        setSongInfo={setSongInfo}
        setSongs={setSongs}
        audioRef={audioRef}
        isPlaying={isPlaying}
        libraryStatus={libraryStatus}
      />
      <audio
        onTimeUpdate={timeEventHandler}
        onLoadedMetadata={timeEventHandler}
        onEnded={songEndHandler}
        ref={audioRef}
        src={currentSong.audio}></audio>
    </div>
  );


}

export default App;

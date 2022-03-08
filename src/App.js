import Song from "./components/Song";
import Player from "./components/Player";
import './styles/app.scss'
import data from '../src/data'
import { useState } from 'react'

function App() {

  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[2]);
  const [isPlaying, setisPlaying] = useState(false);
  return (
    <div className="App">
      <Song picture={currentSong.cover} songName={currentSong.name} artist={currentSong.artist} />
      <Player currentSong={currentSong} isPlaying={isPlaying} setisPlaying={setisPlaying} />
    </div>
  );
}

export default App;

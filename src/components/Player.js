import '../assets/css/fontawesome.css';
import '../assets/css/brands.css';
import '../assets/css/solid.css';
import { useEffect } from 'react';


const Player = ({ currentSong, isPlaying, setisPlaying, audioRef, songInfo, setSongInfo, setCurrentSong, songs, setSongs }) => {

    useEffect(() => {
        const newSongs = songs.map((song) => {
            if (song.id === currentSong.id) {
                return {
                    ...song,
                    active: true,
                };
            } else {
                return {
                    ...song,
                    active: false
                };
            }
        });
        setSongs(newSongs);
    }, [currentSong]);

    // Event Handler
    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setisPlaying(false);
        } else {
            audioRef.current.play();
            setisPlaying(true);
        }
    }

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({ ...songInfo, currentTime: e.target.value });
    }

    const getTime = (time) => {
        return (Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2));
    };

    const skipTrackHandler = async (direction) => {

        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);

        if (direction === 'skip-forward') {
            await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
        } else {
            if (currentIndex === 0) {
                await setCurrentSong(songs[songs.length - 1]);
            } else {
                await setCurrentSong(songs[currentIndex - 1]);
            }
        }
        if (isPlaying) audioRef.current.play();
    }

    return (

        < div className="player" >
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input min={0} max={songInfo.duration || 0} value={songInfo.currentTime} onChange={dragHandler} type="range" name="" id="" />
                <p> {songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
            </div>

            <div className="play-control">
                <span className="fa-solid fa-xl fa-angle-left skip-back" onClick={() => skipTrackHandler('skip-back')}></span>
                <span onClick={playSongHandler} className={isPlaying ? "fa-solid fa-lg fa-pause pause" : "fa-solid fa-lg fa-play play"}></span>
                <span className="fa-solid fa-xl fa-angle-right skip-forward" onClick={() => skipTrackHandler('skip-forward')}></span>
            </div>

        </div >
    );
}

export default Player;
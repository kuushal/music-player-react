import React from "react";

const Song = (props) => {
    return (
        <div className="song-container">
            <img src={props.picture} alt="song-picture" />
            <h2>{props.songName}</h2>
            <h3>{props.artist}</h3>
        </div>
    );
}

export default Song;
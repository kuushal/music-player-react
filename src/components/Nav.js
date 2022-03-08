import React from "react";

const Nav = ({ libraryStatus, setLibraryStatus }) => {
    return (
        <nav>
            <h1>Music Player</h1>
            <button onClick={() => setLibraryStatus(!libraryStatus)}>
                Library
                <span className="fa-solid fa-xl fa-music"></span>
            </button>
        </nav>
    );
}

export default Nav;
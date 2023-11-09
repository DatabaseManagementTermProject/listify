import React from "react";

import NavBar from "../Components/NavBar/NavBar";
import Grid from "../Components/Grid/Grid";

const VideoGames = () => {
    return (
        <div>
            <NavBar />
            <h1 className='pageTitleContainer'>All Video Games</h1>
             <Grid list="videoGames"/>
        </div>

    );
}

export default VideoGames;
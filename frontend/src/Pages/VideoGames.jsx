import React from "react";

import NavBar from "../Components/NavBar/NavBar";
import Grid from "../Components/AllGrid/Grid";

const VideoGames = () => {
    return (
        <div>
            <NavBar />
             <Grid list="videoGames"/>
        </div>

    );
}

export default VideoGames;
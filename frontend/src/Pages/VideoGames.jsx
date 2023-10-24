import React from "react";

import VideoGames from "../Components/AllVideoGames/VideoGameCards";
import '../Components/AllVideoGames/AllVideoGames.css'
import NavBar from "../Components/NavBar/NavBar";

const AllVideoGames = () => {
    return (
        <div>
            <NavBar />
            <h1>All Video Games</h1>
             <VideoGames />
        </div>

    );
}

export default AllVideoGames;
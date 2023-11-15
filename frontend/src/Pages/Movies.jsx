import React from "react";
import NavBar from "../Components/NavBar/NavBar";
import Grid from "../Components/Grid/Grid";

const Movies = () => {
    return (
        <div>
            <NavBar />
            <h1 className='pageTitleContainer'>All Movies</h1>
            <Grid list='movies'/>
        </div>
    );
}

export default Movies;
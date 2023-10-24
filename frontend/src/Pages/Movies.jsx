import React from "react";

import MovieCards from "../Components/AllMovies/MovieCards";
import '../Components/AllMovies/AllMovies.css'
import NavBar from "../Components/NavBar/NavBar";

const AllMovies = () => {
    return (
        <div>
            <NavBar />
            <h1>All Movies</h1>
             <MovieCards />
        </div>

    );
}

export default AllMovies;
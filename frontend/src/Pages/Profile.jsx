import React from "react";
import NavBar from "../Components/NavBar/NavBar";
import LikedBooks from "../Components/Profile/LikedBooks"
import LikedMovies from "../Components/Profile/LikedMovies";
import LikedVideoGames from "../Components/Profile/LikedVideoGames";
import './profile.css'

const Profile = () => {
    return(
        <div>
            <NavBar />
            <div className="profileHeader">Lists</div>
            <h3 className="subheading">My Books</h3>
            <LikedBooks />
            <h3 className="subheading">My Movies</h3>
            <LikedMovies />
            <h3 className="subheading">My Video Games</h3>
            <LikedVideoGames />
        </div>
    );
}

export default Profile;
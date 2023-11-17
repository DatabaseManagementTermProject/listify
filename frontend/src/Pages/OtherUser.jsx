import React from "react";
import NavBar from "../Components/NavBar/NavBar";
import SharedLikedItems from "../Components/OtherUser/SharedLikedItems";
import './profile.css'

const OtherUserProfile = () => {
    // use this for the current authenticated user const { loggedInUserID }
    // and this  for the other one. based on the userid routing perhaps? when
    // user searches email, it takes them to a page routed with userid const { viewedUserID }
    // do we want to display their general likes too? or just mutual likes?
    // we would need to make a new component for that
    return(
        <div>
            <NavBar />
            <h3 className="subheading">Your Mutual Books</h3>
            <SharedLikedItems
                loggedInUserID={loggedInUserID}
                viewedUserID={viewedUserID}
                contentType="Books"
            />
            <h3 className="subheading">Your Mutual Movies</h3>
            <SharedLikedItems
                loggedInUserID={loggedInUserID}
                viewedUserID={viewedUserID}
                contentType="Movies"
            />
            <h3 className="subheading">Your Mutual Video Games</h3>
            <SharedLikedItems
                loggedInUserID={loggedInUserID}
                viewedUserID={viewedUserID}
                contentType="VideoGames"
            />
        </div>
    );
}

export default OtherUserProfile;
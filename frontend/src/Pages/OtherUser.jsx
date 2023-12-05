import React from "react";
import NavBar from "../Components/NavBar/NavBar";
import SharedLikedItems from "../Components/OtherUser/SharedLikedItems";
import './profile.css'
import { useParams } from 'react-router-dom';
import { supabase } from '../database';
import { useEffect, useState } from 'react';
import "./OtherUser.css";

const OtherUserProfile = () => {
    const { viewedUserId } = useParams();
    const [loggedInUserId, setLoggedInUserId] = useState(null);
    // allows for all the data to be loaded before rendering
    const [loading, setLoading] = useState(true);
    const [viewedUsername, setViewedUsername] = useState("");

    useEffect(() => {
        const fetchLoggedInUser = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase.auth.getUser();
                
                if (error) {
                    throw error;
                }
        
                if (data && data.user) {
                    setLoggedInUserId(data.user.id);
                } else {
                    console.log('No user is logged in');
                }
            } catch (error) {
                console.error('Error fetching logged in user:', error);
            } finally {
                // set loading to false after fetching data
                // renders the page with all media types populated
                setLoading(false);
            }
        };

        // used to fetch the username of the viewed user for the profile page
        const fetchViewedUserUsername = async () => {
            try {
                const { data, error } = await supabase
                    .from('Users')
                    .select('username')
                    .eq('id', viewedUserId);

                if (error) {
                    throw error;
                }

                // it only works when structured like this, interestingly
                if (data && data.length > 0) {
                    setViewedUsername(data[0].username);
                }
            } catch (error) {
                console.error('Error fetching viewed user username:', error);
            }
        };

        fetchLoggedInUser();
        fetchViewedUserUsername();
    }, []);

    // will display loading until the data is fetched
    if (loading) {
        return <div>Loading...</div>;
    }

    return(
        <div>
            <NavBar />
            <h1>{`${viewedUsername}'s Profile`}</h1> 
            <SharedLikedItems
                loggedInUserId={loggedInUserId}
                viewedUserId={viewedUserId}
                contentType="Books"
            />
            <SharedLikedItems
                loggedInUserId={loggedInUserId}
                viewedUserId={viewedUserId}
                contentType="Movies"
            />
            <SharedLikedItems
                loggedInUserId={loggedInUserId}
                viewedUserId={viewedUserId}
                contentType="VideoGames"
            />
        </div>
    );
}

export default OtherUserProfile;
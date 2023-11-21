import React from "react";
import NavBar from "../Components/NavBar/NavBar";
import './profile.css'
import HorizontalGrid from "../Components/HorizontalGrid/HorizontalGrid";

import { useState, useEffect } from 'react';
import { supabase } from '../database';

const Profile = () => {

    const [books, setBooks] = useState([]);
    const [movies, setMovies] = useState([]);
    const [videoGames, setVideoGames] = useState([]);
	const [UID, setUID] = useState();

    useEffect(() => {

		// calls our backend to retrieve a full list of items and list of liked items within the current user's relevant liked list (to fill bookmark icons)
		supabase.auth.getUser().then((data) => {
					
			let userId = data.data.user.id;
            setUID(userId);
			return userId;

		}).then((userId) => {

        Promise.all(
          [
            fetch(`http://localhost:3002/getLikedBooks/${userId}`),
            fetch(`http://localhost:3002/getLikedMovies/${userId}`),
            fetch(`http://localhost:3002/getLikedVideoGames/${userId}`)
          ]
        ).then(([resBooks, resMovies, resVideoGames]) => {
           return Promise.all([resBooks.json(), resMovies.json(), resVideoGames.json()])
        }).then(([data_books, data_movies, data_videogames]) => {
          setBooks(data_books);
          setMovies(data_movies);
          setVideoGames(data_videogames)
        })
      })
    }, []);

    const removeLikedItem = (itemID, index, listName) => {

		var url = `http://localhost:3002/removeLiked${listName}`;
		
		fetch(url, {
			method: "POST",
			body: JSON.stringify({
				uid: UID,
				itemId: itemID
			}),
			headers: {
			"Content-type": "application/json; charset=UTF-8"
				}
			})
          .then((res) => {
              return res.json()
          })
          .then((data) => {
              //console.log(data);
          })
          .catch((error) => {
              //console.log(error);
          });

        // set state variable for automatic re-render... probably a better way of doing this
        if (listName === "VideoGames"){
            setVideoGames(oldValues => {
                return oldValues.filter((_, i) => i !== index)
            })
        } else if (listName === "Movies"){
            setMovies(oldValues => {
                return oldValues.filter((_, i) => i !== index)
              })
        } else if (listName === "Books") {
            setBooks(oldValues => {
                return oldValues.filter((_, i) => i !== index)
              })
        }
     }

    return(
        <div>
            <NavBar />
            <HorizontalGrid gridItems={books} listName="Books" gridTitle="Books" removalHandler={removeLikedItem}/>
            <HorizontalGrid gridItems={movies} listName="Movies" gridTitle="Movies" removalHandler={removeLikedItem}/>
            <HorizontalGrid gridItems={videoGames} listName="VideoGames" gridTitle="Video Games" removalHandler={removeLikedItem}/>
        </div>
    );
}

export default Profile;
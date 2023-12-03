import React from "react";
import { useState, useEffect } from 'react';
import NavBar from "../Components/NavBar/NavBar";
import HorizontalGrid from "../Components/HorizontalGrid/HorizontalGrid";
import './profile.css'

const Test = () => {

  // the likes from the Lists, will change when the list changes
  const [booksLists, setBooksLists] = useState([]);
  const [movieLists, setMovieLists] = useState([]);
  const [videoGameLists, setVideoGameLists] = useState([]);

  // the object from the lists, will change when the list changes
  const [booksObj, setBooksObj] = useState([]);
  const [movieObj, setMovieObj] = useState([]);
  const [videoGameObj, setVideoGameObj] = useState([]);

  useEffect(() => {
    // fetch the likes index from the list
    fetch(`http://localhost:3002/gettable/Stest1`)
    .then((res) => { return res.json() })
    .then((data) => {
      let temp = {"Movies": [], "Books": [], "VideoGames": []};
      data.forEach(element => { temp[element.category].push(element.id); });
      setBooksLists(temp.Books);
      setMovieLists(temp.Movies);
      setVideoGameLists(temp.VideoGames);
    })
    .catch((error) => { console.log(error); });
  }, []);

  useEffect(() => {
    // fetch the likes book object from the list
    let tempBook = [];
    booksLists.forEach((id) => {
      fetch(`http://localhost:3002/getObject/Books/${id}`)
      .then((res) => { return res.json() })
      .then((data) => { tempBook.push(data[0].coverImg); })
      .catch((error) => { console.log(error); });
    });
    console.log("tempBook", tempBook)
    setBooksObj(tempBook);

    // fetch the likes movie object from the list
    let tempMovie = [];
    movieLists.forEach((id) => {
      fetch(`http://localhost:3002/getObject/Movies/${id}`)
      .then((res) => { return res.json() })
      .then((data) => { tempMovie.push(data[0]); })
      .catch((error) => { console.log(error); });
    });
    setMovieObj(tempMovie);

    // fetch the likes videogame object from the list
    let tempVideoGame = [];
    videoGameLists.forEach((id) => {
      fetch(`http://localhost:3002/getObject/VideoGames/${id}`)
      .then((res) => { return res.json() })
      .then((data) => { tempVideoGame.push(data[0]); })
      .catch((error) => { console.log(error); });
    });
    setVideoGameObj(tempVideoGame);
  }, [booksLists, movieLists, videoGameLists]);

  return (
    <div>
      <NavBar />
      
      <p>My Book: {booksLists.map((item) => <span> {item} </span>)}</p>
      <p>My Movie: {movieLists.map((item) => <span> {item} </span>)}</p>
      <p>My Video Games: {videoGameLists.map((item) => <span> {item} </span>)}</p>

      <br></br>

      <HorizontalGrid gridItems={booksObj} listName="Books" gridTitle="Books" />
      <HorizontalGrid gridItems={movieObj} listName="Movies" gridTitle="Movies" />
      <HorizontalGrid gridItems={videoGameObj} listName="Video Games" gridTitle="Video Games" />

    </div>
  );
}

export default Test;
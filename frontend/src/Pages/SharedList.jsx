import React from "react";
import { useState, useEffect } from 'react';

import NavBar from "../Components/NavBar/NavBar";
// import Grid from "../Components/Grid/Grid";

import './profile.css'

const SharedList = () => {
    // the lists can access by this user
    const [lists, setLists] = useState([]);

    // the likes from the Lists, will change when the list changes
    const [movieLists, setMovieLists] = useState([]);
    const [booksLists, setBooksLists] = useState([]);
    const [videoGameLists, setVideoGameLists] = useState([]);

    // fetch the initial list from database
    useEffect(() => {
      fetch(`http://localhost:3002/getAccessedLists/1`)
          .then((res) => { return res.json() })
          .then((data) => {
            let temp = [];
            data.forEach(element => {
              temp.push(element.tableID);
            });
            setLists(temp);
          })
          .catch((error) => {
            console.log(error);
          });
    }, []);

    // fetch the initial likes from the initial list
    useEffect(() => {
        fetchLikes(lists[0]);
    }, [lists]);

    function change() {
      let select = document.getElementById("access").value;
      fetchLikes(select);
    }

    // function for changing the likes when the list changes
    function fetchLikes(tableName) {
      fetch(`http://localhost:3002/gettable/${tableName}`)
          .then((res) => { return res.json() })
          .then((data) => {
              let temp = {"movies": [], "books": [], "videoGames": []};
              data.forEach(element => {
                  temp[element.category].push(element.itemID);
              });
              setMovieLists(temp.movies);
              setBooksLists(temp.books);
              setVideoGameLists(temp.videoGames);
          })
          .catch((error) => {
             console.log(error);
          });
    }


    // output the pages
    return (
        <div>
            <NavBar />
            <select className="option" id="access" onChange={change}>{
                lists.map((item) => <option key={item} id={item}>{item}</option>)
            }</select>
            <h3 className="subheading">My Books</h3>
            <p>{booksLists}</p>
            <h3 className="subheading">My Movies</h3>
            <p>{movieLists}</p>
            <h3 className="subheading">My Video Games</h3>
            <p>{videoGameLists}</p>
        </div>

    );
}

export default SharedList;

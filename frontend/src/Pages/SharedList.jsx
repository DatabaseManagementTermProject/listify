import React from "react";
import { useState, useEffect } from 'react';
import { supabase } from '../database';

import NavBar from "../Components/NavBar/NavBar";
// import Grid from "../Components/Grid/Grid";

import './profile.css'

const SharedList = () => {

  // the user's name
  const [username, setUsername] = useState("");

  // the lists can access by this user
  const [lists, setLists] = useState([]);

  // the likes from the Lists, will change when the list changes
  const [booksLists, setBooksLists] = useState([]);
  const [movieLists, setMovieLists] = useState([]);
  const [videoGameLists, setVideoGameLists] = useState([]);

  // fetch the user's name from the database
  useEffect(() => {
    supabase.auth.getUser().then((data) => {
			let userId = data.data.user.id;
			return userId;
		}).then((userId) => {
      fetch(`http://localhost:3002/username/${userId}`)
        .then((res) => { return res.json() })
        .then((data) => {
          setUsername(data[0].username);
        })
        .catch((error) => {
          console.log(error);
        });
    })
  }, []);

  // fetch the initial list from database
  useEffect(() => {
    console.log(username)
    fetch(`http://localhost:3002/getAccessedLists/${username}`)
      .then((res) => { 
        return res.json() })
      .then((data) => {
        console.log(data);
        let temp = [];
        data.forEach(element => {
          temp.push(element.tableID);
        });
        setLists(temp);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [username]);

  // fetch the initial likes from the initial list
  useEffect(() => {
      fetchLikes(lists[0]);
  }, [lists]);

  // function for changing the likes when the list changes
  function change() {
    let select = document.getElementById("access").value;
    fetchLikes(select);
  }

  // function for adding a like to the list, and then update the states
  function add() {
    let curList = document.getElementById("access").value;
    let categories = document.getElementById("categories").value;
    let itemID = parseInt(document.getElementById("itemID").value);
    fetch(`http://localhost:3002/addToList/${curList}`,
      { method: "POST",
        body: JSON.stringify({
        categories: categories,
        itemID: itemID
      }),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    })
    .then((res) => { return res.json() })
    .then((data) => {
      if (data[0].category === "books") { setBooksLists([...booksLists, data[0].itemID]); }
      else if (data[0].category === "movies") { setMovieLists([...movieLists, data[0].itemID]); }
      else { setVideoGameLists([...videoGameLists, data[0].itemID]); }
    });
  }

  // function for deleting a like from the list
  function del() {
    let curList = document.getElementById("access").value;
    let categories = document.getElementById("categories").value;
    let itemID = parseInt(document.getElementById("itemID").value);
    console.log(curList, categories, itemID);

    // check if item is in the list, if not, return an alert
    if (categories === "books" && !booksLists.includes(itemID)) { alert("Item not in bookslist"); return; }
    else if (categories === "movies" && !movieLists.includes(itemID)) { alert("Item not in movieslist"); return; }
    else if (categories === "videoGames" && !videoGameLists.includes(itemID)) { alert("Item not in videogameslist"); return; }
  
    fetch(`http://localhost:3002/deleteFromList/${curList}`,
      { method: "POST",
        body: JSON.stringify({
        categories: categories,
        itemID: itemID
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then((res) => { return res.json() })
    .then((data) => {
      console.log(data);
      if (data.category === "books") { setBooksLists(booksLists.filter((item) => item !== itemID)); }
      else if (data.category === "movies") { setMovieLists(movieLists.filter((item) => item !== itemID)); }
      else { setVideoGameLists(videoGameLists.filter((item) => item !== itemID)); }
    });
  };

  // function for changing the likes when the list changes
  function fetchLikes(tableName) {
    fetch(`http://localhost:3002/gettable/${tableName}`)
      .then((res) => { return res.json() })
      .then((data) => {
        let temp = {"movies": [], "books": [], "videoGames": []};
        data.forEach(element => {
            temp[element.category].push(element.itemID);
        });
        setBooksLists(temp.books);
        setMovieLists(temp.movies);
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
        &emsp;&emsp;&emsp;&emsp;
        <select id="categories">
            <option value="books">Books</option>
            <option value="movies">Movies</option>
            <option value="videoGames">Video Games</option> 
        </select>
        <input id="itemID"></input>
        <button id="addButton" onClick={add}>Add</button>
        <button id="delButton" onClick={del}>Delete</button>

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

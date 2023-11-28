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

  // function for adding a like to the list
  function add() {
    let curList = document.getElementById("access").value;
    let addCategories = document.getElementById("addCategories").value;
    let addID = document.getElementById("addID").value;
    console.log(curList, addCategories, addID)
    fetch(`http://localhost:3002/addToList/${curList}`,
      {method: "POST",
      body: JSON.stringify({
        addCategories: addCategories,
        addID: addID
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })

    if (addCategories === "books") {
      setBooksLists(booksLists.push(addID));
    } else if (addCategories === "movies") {
      setMovieLists(movieLists.push(addID));
    } else {
      setVideoGameLists(videoGameLists.push(addID));
    }
    fetchLikes(curList);
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
        setBooksLists(temp.books);
        setMovieLists(temp.movies);
        setVideoGameLists(temp.videoGames);
      })
      .catch((error) => {
          console.log(error);
      });
  }

  console.log(username)
  // output the pages
  return (
    <div>
        <NavBar />
        <select className="option" id="access" onChange={change}>{
            lists.map((item) => <option key={item} id={item}>{item}</option>)
        }</select>
        &emsp;&emsp;&emsp;&emsp;
        <select id="addCategories">
            <option value="books">Books</option>
            <option value="movies">Movies</option>
            <option value="videoGames">Video Games</option> 
        </select>
        <input id="addID"></input>
        <button id="addButton" onClick={add}>Add</button>

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

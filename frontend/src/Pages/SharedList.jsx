import React from "react";
import { useState, useEffect } from 'react';
import { supabase } from '../database';

import NavBar from "../Components/NavBar/NavBar";
// import HorizontalGrid from "../Components/HorizontalGrid/HorizontalGrid";

import './profile.css'

const SharedList = () => {

  // the user's name
  const [username, setUsername] = useState("");

  // the lists can access by this user and shared by who
  const [lists, setLists] = useState([]);
  const [sharedppl, setSharedppl] = useState([]);

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
    fetch(`http://localhost:3002/getAccessedLists/${username}`)
      .then((res) => { 
        return res.json() })
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
  }, [username]);

  // fetch the initial information from the initial list
  useEffect(() => {
    fetchCurListInformation(lists[0]);
  }, [lists]);

  // function for changing the likes when the list changes
  function change() {
    let select = document.getElementById("access").value;
    fetchCurListInformation(select);
  }

  // function for fetching likes from the list
  // using in initial fetch and when the list changes
  function fetchCurListInformation(tableName) {
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

    fetch(`http://localhost:3002/getSharedppl/${tableName}`)
    .then((res) => { return res.json() })
    .then((data) => { 
      let temp = [];
      data.forEach( element => { temp.push(element.userID) });
      setSharedppl(temp);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  // function for adding a like to the list, and then update the states
  function addFavItem() {
    let curList = document.getElementById("access").value;
    let categories = document.getElementById("categories").value;
    let itemID = parseInt(document.getElementById("itemID").value);

    // check the item is alredy in the list or not, if yes, return an alert
    if (categories === "books" && booksLists.includes(itemID)) { alert("Item already in bookslist"); return; }
    else if (categories === "movies" && movieLists.includes(itemID)) { alert("Item already in movieslist"); return; }
    else if (categories === "videoGames" && videoGameLists.includes(itemID)) { alert("Item already in videogameslist"); return; }

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
  function delFavItem() {
    let curList = document.getElementById("access").value;
    let categories = document.getElementById("categories").value;
    let itemID = parseInt(document.getElementById("itemID").value);

    // check if item is in the list, if not, return an alert
    if (categories === "books" && !booksLists.includes(itemID)) { alert("Item not in bookslist"); return; }
    else if (categories === "movies" && !movieLists.includes(itemID)) { alert("Item not in movieslist"); return; }
    else if (categories === "videoGames" && !videoGameLists.includes(itemID)) { alert("Item not in videogameslist"); return; }
  
    fetch(`http://localhost:3002/deleteFromList/${curList}`,
      { method: "DELETE",
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
      if (data.category === "books") { setBooksLists(booksLists.filter((item) => item !== itemID)); }
      else if (data.category === "movies") { setMovieLists(movieLists.filter((item) => item !== itemID)); }
      else { setVideoGameLists(videoGameLists.filter((item) => item !== itemID)); }
    });
  };

  // function for adding a user to the list
  function addUser() {
    let curList = document.getElementById("access").value;
    let userID = document.getElementById("userName").value;

    // check if user is in the list, if yes, return an alert
    if (sharedppl.includes(userID)) { alert("User already in list"); return; }

    fetch(`http://localhost:3002/addUser/${curList}`,
      { method: "POST",
        body: JSON.stringify({
        userID: userID
      }),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    })
    .then((res) => { return res.json() })
    .then((data) => {
      console.log(data);
      setSharedppl([...sharedppl, data[0].userID]);
    });
  }

  // function for deleting a user from the list
  function delUser() {
    let curList = document.getElementById("access").value;
    let userID = document.getElementById("userName").value;

    // check if user is in the list, if not, return an alert
    if (!sharedppl.includes(userID)) { alert("User not in list"); return; }

    fetch(`http://localhost:3002/deleteUser/${curList}`,
      { method: "DELETE",
        body: JSON.stringify({
        userID: userID
      }),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    })
    .then((res) => { return res.json() })
    .then((data) => {
      setSharedppl(sharedppl.filter((item) => item !== userID));
    });
  }

  // output the pages
  return (
    <div>
      <NavBar />
      <select className="option" id="access" onChange={change}>
        { lists.map((item) => <option key={item} id={item}>{item}</option>) }
      </select>
      &emsp;
      This List is Share with: { sharedppl.map((item) => <span key={item}> "{item}" </span>) }
      <input id="userName"></input>
      <button id="addUserB" onClick={addUser}>Add</button>
      <button id="delUserB" onClick={delUser}>Delete</button>

      <br></br>

      <select id="categories">
          <option value="books">Books</option>
          <option value="movies">Movies</option>
          <option value="videoGames">Video Games</option> 
      </select>
      <input id="itemID"></input>
      <button id="addFavItemB" onClick={addFavItem}>Add</button>
      <button id="delFavItemB" onClick={delFavItem}>Delete</button>

      <br></br>

      <h3 className="subheading">My Books</h3>
      <p>{booksLists}</p>
      {/* <HorizontalGrid gridItems={booksLists} listName="Books" gridTitle="Books" removalHandler={removeLikedItem}/> */}
      <h3 className="subheading">My Movies</h3>
      <p>{movieLists}</p>
      {/* <HorizontalGrid gridItems={movieLists} listName="Movies" gridTitle="Movies" removalHandler={removeLikedItem}/> */}
      <h3 className="subheading">My Video Games</h3>
      <p>{videoGameLists}</p>
      {/* <HorizontalGrid gridItems={videoGameLists} listName="Video Games" gridTitle="Video Games" removalHandler={removeLikedItem}/> */}
    </div>
  );
}

export default SharedList;

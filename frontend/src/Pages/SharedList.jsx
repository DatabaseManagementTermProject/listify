import React from "react";
import { useState, useEffect } from 'react';
import { supabase } from '../database';

import NavBar from "../Components/NavBar/NavBar";
import HorizontalGrid from "../Components/HorizontalGrid/HorizontalGrid";

import './SharedList.css';

const SharedList = () => {

  // the user's name
  const [username, setUsername] = useState("");

  // the lists can access by this user and shared by who
  const [totalList, setTotalList] = useState([]);
  const [lists, setLists] = useState([]);
  const [sharedppl, setSharedppl] = useState([]);

  // the likes from the Lists, will change when the list changes
  const [booksLists, setBooksLists] = useState([]);
  const [movieLists, setMovieLists] = useState([]);
  const [videoGameLists, setVideoGameLists] = useState([]);

  // the object from the lists, will change when the list changes
  const [booksObj, setBooksObj] = useState([]);
  const [movieObj, setMovieObj] = useState([]);
  const [videoGameObj, setVideoGameObj] = useState([]);

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

  // fetch the total list from database
  useEffect(() => {
    fetch(`http://localhost:3002/getAllLists`)
      .then((res) => { return res.json() })
      .then((data) => {
        let temp = [];
        data.forEach(element => { 
          if (!temp.includes(element.tableID)) { temp.push(element.tableID); } 
        });
        setTotalList(temp);
      })
      .catch((error) => { console.log(error); });
  }, []);

  // fetch the initial list from database
  useEffect(() => {
    if (username === "") { return; }
    fetch(`http://localhost:3002/getAccessedLists/${username}`)
    .then((res) => { return res.json() })
    .then((data) => {
      let temp = [];
      data.forEach(element => {
        temp.push(element.tableID);
      });
      setLists(temp);
    })
    .catch((error) => { console.log(error); });
  }, [username]);

  // fetch the initial information from the initial list
  useEffect(() => {
    fetchCurListInformation(lists[0]);
  }, // eslint-disable-next-line 
    [lists]);

  // function for changing the likes when the list changes
  function change() {
    let listName = document.getElementById("access").value;
    fetchCurListInformation(listName);
  }

  // function for fetching likes from the list
  // using in initial fetch and when the list changes
  function fetchCurListInformation(listName) {
    // fetch the likes index from the list
    fetch(`http://localhost:3002/gettable/${listName}`)
    .then((res) => { return res.json() })
    .then((data) => {
      let temp = {"Movies": [], "Books": [], "VideoGames": []};
      data.forEach(element => { temp[element.category].push(element.id); });
      setBooksLists(temp.Books);
      setMovieLists(temp.Movies);
      setVideoGameLists(temp.VideoGames);
    })
    .catch((error) => { console.log(error); });
    
    // fetch the people share the list
    fetch(`http://localhost:3002/getSharedppl/${listName}`)
    .then((res) => { return res.json() })
    .then((data) => { 
      let temp = [];
      data.forEach( element => { temp.push(element.userID) });
      setSharedppl(temp);
    })
    .catch((error) => { console.log(error); });

    fetchBooksObjects(listName);
    fetchMoviesObjects(listName);
    fetchVideoGamesObjects(listName);
  }

  // function for adding a like to the list, and then update the states
  function addFavItem() {
    let curList = document.getElementById("access").value;
    let categories = document.getElementById("categories").value;
    let id = parseInt(document.getElementById("id").value);

    // check the item is alredy in the list or not, if yes, return an alert
    if (categories === "Books" && booksLists.includes(id)) { alert("Item already in Bookslist"); return; }
    else if (categories === "Movies" && movieLists.includes(id)) { alert("Item already in Movieslist"); return; }
    else if (categories === "VideoGames" && videoGameLists.includes(id)) { alert("Item already in VideoGameslist"); return; }

    fetch(`http://localhost:3002/addToList/${curList}`,
      { method: "POST",
        body: JSON.stringify({
        categories: categories,
        id: id
      }),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    })
    .then((res) => { return res.json() })
    .then((data) => {
      if (data[0].category === "Books") { 
        setBooksLists([...booksLists, data[0].id]);
        fetchBooksObjects(curList);
      }
      else if (data[0].category === "Movies") {
        setMovieLists([...movieLists, data[0].id]); 
        fetchMoviesObjects(curList);
      }
      else { 
        setVideoGameLists([...videoGameLists, data[0].id]);
        fetchVideoGamesObjects(curList);
      }
    });
  }

  function removeLikedItem(itemID, index, listName) {
    console.log("itemID", itemID)
    console.log("index", index)
    console.log("listName", listName)
    let curList = document.getElementById("access").value;
    fetch(`http://localhost:3002/deleteFromList/${curList}`,
    { method: "DELETE",
      body: JSON.stringify({
      categories: listName,
      id: itemID
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
    })
    .then((res) => { return res.json() })
    .then((data) => {
      console.log("data", data)
      if (data.category === "Books") { 
        setBooksLists(booksLists.filter((item) => item !== data.itemID));
        fetchBooksObjects(curList);
      }
      else if (data.category === "Movies") {
        setMovieLists(movieLists.filter((item) => item !== data.itemID));
        fetchMoviesObjects(curList);
      }
      else if (data.category === "VideoGames") { 
        setVideoGameLists(videoGameLists.filter((item) => item !== data.itemID));
        fetchVideoGamesObjects(curList);
      }
    });
  }

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

  // function for creating a new list
  function createList() {
    let newList = document.getElementById("newList").value;

    // check if list is already exist, if yes, return an alert
    if (totalList.includes(newList)) { alert("List already exist, please use another name"); return; }

    fetch(`http://localhost:3002/addUser/${newList}`,
      { method: "POST",
        body: JSON.stringify({
        userID: username
      }),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    })
    .then((res) => { return res.json() })
    .then((data) => {
      console.log("check", data);
      setLists([...lists, data[0].tableID]);
      setTotalList([...totalList, data[0].tableID]);
    });
  }

  // function for deleting a list
  function deleteList() {
    let delList = document.getElementById("newList").value;

    // check if list is already exist, if not, return an alert
    if (!totalList.includes(delList)) { alert("List not exist"); return; }

    fetch(`http://localhost:3002/deleteList/${delList}`,
      { method: "DELETE",
        body: JSON.stringify({
        userID: username
      }),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    })
    .then((res) => {
      alert(`${delList} has been deleted`);
      setLists(lists.filter((item) => item !== delList));
      setTotalList(totalList.filter((item) => item !== delList));
      window.location.reload(false);
    });
  }
  
  function fetchBooksObjects(listName) {
    // fetch the likes book object from the list
    fetch(`http://localhost:3002/getObject/Books/${listName}`)
    .then((res) => { return res.json() })
    .then((data) => { setBooksObj(data); })
    .catch((error) => { console.log(error); });
  }

  function fetchMoviesObjects(listName) {
    // fetch the likes book object from the list
    fetch(`http://localhost:3002/getObject/Movies/${listName}`)
    .then((res) => { return res.json() })
    .then((data) => { setMovieObj(data); })
    .catch((error) => { console.log(error); });
  }

  function fetchVideoGamesObjects(listName) {
    // fetch the likes book object from the list
    fetch(`http://localhost:3002/getObject/VideoGames/${listName}`)
    .then((res) => { return res.json() })
    .then((data) => { setVideoGameObj(data); })
    .catch((error) => { console.log(error); });
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
      <input id="userName"></input>&ensp;
      <button className="Button" id="addUserB" onClick={addUser}>Add</button>&ensp;
      <button className="Button" id="delUserB" onClick={delUser}>Delete</button>

      <br></br>

      Create/Delete a list:&ensp;
      <input id="newList"></input>&ensp;
      <button className="Button" id="createListB" onClick={createList}>Create</button>&ensp;
      <button className="Button" id="deleteListB" onClick={deleteList}>Delete</button>

      <br></br>

      <select id="categories">
          <option value="Books">Books</option>
          <option value="Movies">Movies</option>
          <option value="VideoGames">Video Games</option> 
      </select>&ensp;
      <input id="id"></input>&ensp;
      <button className="Button" id="addFavItemB" onClick={addFavItem}>Add</button>

      <br></br>

      <HorizontalGrid gridItems={booksObj} listName="Books" gridTitle="Books" removalHandler={removeLikedItem}/>
      <HorizontalGrid gridItems={movieObj} listName="Movies" gridTitle="Movies" removalHandler={removeLikedItem}/>
      <HorizontalGrid gridItems={videoGameObj} listName="Video Games" gridTitle="Video Games" removalHandler={removeLikedItem}/>

    </div>
  );
}

export default SharedList;

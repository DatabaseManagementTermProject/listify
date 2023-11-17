import React from "react";
import { useState, useEffect } from 'react';

import NavBar from "../Components/NavBar/NavBar";
// import Grid from "../Components/Grid/Grid";

import './profile.css'

const SharedList = () => {
    function fetchLikes() {
      
    }

    // fetch the initial list from database
    const [lists, setLists] = useState([]);
    useEffect(() => {
      fetch(`http://localhost:3002/getAccessedLists/1`)
          .then((res) => { return res.json() })
          .then((data) => {
            let temp = [];
            data.forEach(element => {
              temp.push(element.tableID);
            });
            console.log(temp);
            setLists(temp);
          })
          .catch((error) => {
            console.log(error);
          });
    }, []);

    // fetch the initial likes from the initial list
    

    // output the pages
    return (
        <div>
            <NavBar />
            <select className="option" id="access" >{
                lists.map((item) => <option key={item}>{item}</option>)
            }</select>
            <h3 className="subheading">My Books</h3>
            <h3 className="subheading">My Movies</h3>
            <h3 className="subheading">My Video Games</h3>
        </div>

    );
}

export default SharedList;

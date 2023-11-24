import React, { useState } from "react";
import NavBar from "../Components/NavBar/NavBar";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import 'bootstrap/dist/css/bootstrap.min.css';
import Grid from "../Components/Grid/Grid";
import emptyBookmark from '../Components/Grid/Images/bookmark.png'
import Tooltip from 'react-bootstrap/Tooltip';

const Home = () => {

  return (
    <div>
      <NavBar />
      <h2>Home</h2>
    </div>
  );
}
export default Home;
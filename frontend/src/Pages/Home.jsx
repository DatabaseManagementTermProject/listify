import React, { useState } from "react";
import NavBar from "../Components/NavBar/NavBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css'


const Home = () => {

  return (
    <div>
      <NavBar />
      <div className="welcome-message">
      Welcome to Listify
    </div>
    </div>
  );
}
export default Home;
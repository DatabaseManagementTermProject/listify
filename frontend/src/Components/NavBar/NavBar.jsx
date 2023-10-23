import React from "react";
import './NavBar.css';
import logo from './logo.png';
import profileImg from './profile-img.png'

const NavBar = () => {
    return (
        <div className="NavBarContainer">
            
            <div className="profileImgContainer"><img src={profileImg} className="profile-img" /></div>
            <div className="logoImgContainer"><img src={logo} className="logo"/></div>

        </div>
    )
}

export default NavBar
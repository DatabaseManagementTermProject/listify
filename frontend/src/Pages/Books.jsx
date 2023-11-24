import React from "react";

import NavBar from "../Components/NavBar/NavBar";
import Grid from "../Components/Grid/Grid";


const Books = () => {
    return (
        <div>
            <NavBar />
            <h1 className='pageTitleContainer'>All Books</h1>
            <Grid list='Books'/>
        </div>

    );
}

export default Books;
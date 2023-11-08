import React from "react";

import NavBar from "../Components/NavBar/NavBar";
import Grid from "../Components/AllGrid/Grid";

const Books = () => {
    return (
        <div>
            <NavBar />
            <Grid list='books'/>
        </div>

    );
}

export default Books;
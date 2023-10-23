import React from "react";

import BookCards from "../Components/AllBooks/BookCards";
import '../Components/AllBooks/AllBooks.css'
import NavBar from "../Components/NavBar/NavBar";

const AllBooks = () => {
    return (
        <div>
            <NavBar />
            <h1>All Books</h1>
             <BookCards />
        </div>

    );
}

export default AllBooks;
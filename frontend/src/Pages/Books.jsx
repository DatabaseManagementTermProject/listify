import React from "react";

import BookCards from "../Components/AllBooks/BookCards";
import '../Components/AllBooks/AllBooks.css'
import NavBar from "../Components/NavBar/NavBar";

const AllBooks = () => {
    return (
        <div>
            <NavBar />
            <div className="pageTitleContainer">
                All Books
            </div>
             <BookCards />
        </div>

    );
}

export default AllBooks;
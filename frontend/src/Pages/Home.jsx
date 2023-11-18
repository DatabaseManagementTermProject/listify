import React, { useState } from "react";
import NavBar from "../Components/NavBar/NavBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import GridComponent from '../Components/Grid/Grid';


const Home = () => {

  const [books, setBooks] = useState([]);
  const [movies, setMovies] = useState([]);
  const [videoGames, setVideoGames] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('books');

   function HandleSearch(searchTerm, selectedCategory) {
    if (searchTerm !== "") {
        let url = "";

        switch(selectedCategory) {
            case 'books':
                url = `http://localhost:3002/search/books/${searchTerm}`;
                break;
            case 'movies':
                url = `http://localhost:3002/search/movies/${searchTerm}`;
                break;
            case 'videogames':
                url = `http://localhost:3002/search/videogames/${searchTerm}`;
                break;
            case 'users':
                url = `http://localhost:3002/search/users/${searchTerm}`;
                break;
            default: console.log("Error: Invalid category");
        }

        fetch(url)
            .then(response => response.json())
            .then(data => {
              switch(selectedCategory) {
                case 'books':
                    setBooks(data);
                    break;
                case 'movies':
                    setMovies(data);
                    break;
                case 'videogames':
                    setVideoGames(data);
                    break;
                case 'users':
                    setUsers(data);
                    break;
                default: console.log("Error: Couldn't set data");
            }})
            .catch(error => {
              console.error('Error fetching data:', error);
            });
    }
  }

  const getListForCategory = () => {
    switch (selectedCategory) {
      case 'books':
        return books;
      case 'movies':
        return movies;
      case 'videogames':
        return videoGames;
      case 'users':
        return users;
      default:
        return [];
    }
  };


    return (
      <div>
          <NavBar
              HandleSearch={HandleSearch} 
              selectedCategory={selectedCategory} 
              setSelectedCategory={setSelectedCategory}
          />
    <h1>Home Page</h1>
    <GridComponent list={getListForCategory()} />
    </div>
        );
    }

export default Home;
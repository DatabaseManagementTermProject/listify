import './App.css';
import React, { useState, useEffect } from 'react';

function App() {

    const [posts, setPosts] = useState([]);
    
    useEffect(() => {

        var url = "http://localhost:3002/movies";

        fetch(url)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setPosts(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    return (
        <div>
            <div className = "App-header">
                <div className = "App-logo">
                    <img src="https://i.ibb.co/dtbR9kL/i-m-bored-1.png"
                        alt= "logo"
                        style={{ width: '200px', height: 'auto' }}>
                    </img>
                </div>
                <nav className="nav">
                    <a href="#movies">Movies</a>
                    <a href="#videogames">Video Games</a>
                    <a href="#books">Books</a>
                </nav>
            </div>
            <div className="movies-container">
                {posts.map(post => {
                    return (
                        <div className="info" key={post.bookID}>
                            <p>{post.title}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}



export default App;

import './App.css';
import { Routes, Route } from "react-router-dom";

// import pages to be used in router
import Home from "./Pages/Home"; 
import Login from "./Pages/Login"; 
import Register from "./Pages/Register"; 
import Profile from './Pages/Profile';
import Grid from './Components/AllGrid/Grid';

function App() {

    return (
        <>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/allbooks" element={<Grid list='books'/>} />
                <Route path="/allmovies" element={<Grid list='movies' />} />
                <Route path="/allvideogames" element={<Grid list='videogames' />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </>

        // <div>
        //     <div className = "App-header">
        //         <div className = "App-logo">
        //             <img src="https://i.ibb.co/dtbR9kL/i-m-bored-1.png"
        //                 alt= "logo"
        //                 style={{ width: '200px', height: 'auto' }}>
        //             </img>
        //         </div>
        //         <div className = "registration-button">
        //             <UserRegistrationButton />
        //         </div>
        //         <nav className="nav">
        //             <a href="#movies">Movies</a>
        //             <a href="#videogames">Video Games</a>
        //             <a href="#books">Books</a>
        //         </nav>
        //     </div>
        //     <div className="movies-container">
        //         {posts.map(post => {
        //             return (
        //                 <div className="info" key={post.bookID}>
        //                     <p>{post.title}</p>
        //                 </div>
        //             )
        //         })}
        //     </div>
        // </div>
    )
}



export default App;

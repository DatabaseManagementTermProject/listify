import './App.css';
import { Routes, Route } from "react-router-dom";

// import pages to be used in router
import Home from "./Pages/Home"; 
import Login from "./Pages/Login"; 
import Register from "./Pages/Register"; 
import Profile from './Pages/Profile';
import Grid from './Components/AllGrid/Grid';
import AllMovies from './Pages/Movies';
import AllVideoGames from './Pages/VideoGames';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/allbooks" element={<Grid list='books'/>} />
                <Route path="/allmovies" element={<AllMovies />} />
                <Route path="/allvideogames" element={<AllVideoGames />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </>
    )
}

export default App;

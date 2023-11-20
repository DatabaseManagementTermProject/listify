import './App.css';
import { Routes, Route } from "react-router-dom";

// import pages to be used in router
import Home from "./Pages/Home"; 
import Login from "./Pages/Login"; 
import Register from "./Pages/Register"; 
import Profile from './Pages/Profile';
import Movies from './Pages/Movies';
import Books from './Pages/Books';
import VideoGames from './Pages/VideoGames';
import SearchResults from './Pages/SearchResults';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/Books" element={<Books />} />
                <Route path="/Movies" element={<Movies />} />
                <Route path="/VideoGames" element={<VideoGames />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/searchresults" element={<SearchResults />} />

            </Routes>
        </>
    )
}

export default App;

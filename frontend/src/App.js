import './App.css';
import { Routes, Route } from "react-router-dom";


// import pages to be used in router
import Home from "./Pages/Home"; 
import Login from "./Pages/Login"; 
import Register from "./Pages/Register"; 

function App() {

    // const [posts, setPosts] = useState([]);
    
    // useEffect(() => {

    //     var url = "http://localhost:3002/movies";

    //     fetch(url)
    //         .then((res) => {
    //             return res.json()
    //         })
    //         .then((data) => {
    //             setPosts(data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }, []);




    return (
        <>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
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

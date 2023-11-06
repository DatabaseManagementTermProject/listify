
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/esm/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import './BookCards.css'
import './AllBooks.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import filledBookmark from '../Profile/bookmarkfill.png'
import emptyBookmark from '../Profile/bookmark.png'
import Tooltip from 'react-bootstrap/Tooltip';
import NavBar from "../NavBar/NavBar";


import { useState, useEffect } from 'react';

// when I want to render a component, pass into the props which one you want to render ('books', 'movies', 'videogames')
function Grid(list) {

	console.log(list);
	
	//TODO: Change this entire Grid component to be dynamic based on the list passed in.
    const [books, setBooks] = useState([]);
    const [likes, setLikes] = useState([]);

    useEffect(() => {

        Promise.all(
          [
            fetch("http://localhost:3002/books"),
            fetch('http://localhost:3002/get/1/books/getArray/-1')
          ]
        ).then(([resBooks, resLikes]) => {
           return Promise.all([resBooks.json(), resLikes.json()])
        }).then(([dataBooks, dataLikes]) => {
          setBooks(dataBooks);
          setLikes(dataLikes);
        })

    }, []);

	var likesArray = [];

	likes.forEach(item => {
		likesArray.push(item.bookID)
	})

    function likedBook(id){
    
        // replace 1 with userID of person logged on
        var url = `http://localhost:3002/get/1/books/add/${id}`;
    
        fetch(url)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

	const renderTooltip = (props) => (
		<Tooltip id="button-tooltip" {...props}>
		  Save
		</Tooltip>
	  );

    return (
      <>
      <NavBar />
      <div className="pageTitleContainer">
          All Books
      </div>
        <div className='gridContainer'>
          <ul style={{display: 'inline-block'}}>
            {books.map((d, i) => (
            <div key={i} className='container'>
                <img src={require('./bookImages/' + i + '.jpg')} className='images'/>
                <div className='overlay'>  
                <div className='titleContainer'>{d.title}</div>
                <div className='categoryContainer'>{d.genre}</div>
                <div className='description'>{d.description}</div>
                <div className='buttonContainer'>
					<OverlayTrigger
					placement="bottom"
					delay={{ show: 0, hide: 100 }}
					overlay={renderTooltip}
					>
					<img src={emptyBookmark} className='bookmark' onClick={() => likedBook(d, i)} />
					</OverlayTrigger>
                </div>
              </div>
            </div>
            ))}
          </ul>
          </div>
      </>
      );
}

export default Grid


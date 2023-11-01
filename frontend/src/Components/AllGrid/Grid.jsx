
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/esm/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import './BookCards.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import filledBookmark from '../Profile/bookmarkfill.png'
import emptyBookmark from '../Profile/bookmark.png'
import Tooltip from 'react-bootstrap/Tooltip';


import { useState, useEffect } from 'react';

// 
function AllGrid() {

    const [books, setBooks] = useState([]);
    const [likes, setLikes] = useState([]);

    useEffect(() => {

		// important to get likes table as well...

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


		// okay for now... but need to replace with a call to the above.	
		// var url = `http://localhost:3002/books`;

		// fetch(url)
		// 	.then((res) => {
		// 		return res.json()
		// 	})
		// 	.then((data) => {
		// 		setBooks(data)
		// 	})
		// 	.catch((error) => {
		// 		console.log(error);
		// 	});

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

    // fetch liked lists and if likedID = idx, change state variable for the like button


    return (
		<div className='gridContainer'>
			<ul style={{display: 'inline-block'}}>
				{books.map((d, i) => (
				<div key={i} className='container'>
						<img src={require('../AllBooks/images/' + i + '.jpg')} className='images'/>
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
      );
}

export default AllGrid


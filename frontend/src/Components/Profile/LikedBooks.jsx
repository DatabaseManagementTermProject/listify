import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import 'bootstrap/dist/css/bootstrap.min.css';
import './likedItems.css'
import emptyBookmark from './bookmark.png'
import filledBookmark from './bookmarkfill.png'
import Tooltip from 'react-bootstrap/Tooltip';

import { useState, useEffect } from 'react';


function LikedBooks() {

    const [books, setBooks] = useState([]);
    
    useEffect(() => {

        var url = "http://localhost:3002/get/1/books/getArray/-1";

        fetch(url)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setBooks(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function likedBook(book, index){

        var id = book.bookID;
    
        // replace 1 with userID of person logged on
        var url = `http://localhost:3002/get/1/books/delete/${id}`;
    
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

        setBooks(oldValues => {
          return oldValues.filter((_, i) => i !== index)
        })
    }

	const renderTooltip = (props) => (
		<Tooltip id="button-tooltip" {...props}>
		  Remove
		</Tooltip>
	  );


    // fetch liked lists and if likedID = idx, change state variable for the like button

    return (
      <div style={{overflowX: 'scroll'}} className='scrollContainer'>
        <ul style={{display: 'inline', whiteSpace: 'nowrap', overflow: 'auto'}}>
          {books.map((d, i) => (
            <div key={i} className='container'>
            <img src={d.coverImg} className='images'/>
            <div className='overlay'>
            <div className='titleContainer'>{d.title}</div>
            <div className='categoryContainer'>{d.category}</div>
            <div className='description'>{d.description}</div>
            <div className='buttonContainer'>
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 0, hide: 100 }}
              overlay={renderTooltip}
              >
              <img src={filledBookmark} className='bookmark' onClick={() => likedBook(d, i)} />
            </OverlayTrigger>
				</div>
				</div>
            </div>
          ))}
        </ul>
      </div>
      );
}

export default LikedBooks


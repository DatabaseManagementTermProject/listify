import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import 'bootstrap/dist/css/bootstrap.min.css';
import './likedItems.css'
import emptyBookmark from './bookmark.png'
import filledBookmark from './bookmarkfill.png'
import Tooltip from 'react-bootstrap/Tooltip';

import { useState, useEffect } from 'react';
import { supabase } from '../../database';


function LikedBooks() {

    const [books, setBooks] = useState([]);
	const [UID, setUID] = useState();
    
    useEffect(() => {

		// fetch is within the getUser Promise since we can't get books until we have the userID
        supabase.auth.getUser().then((data) => {
			
			let url = `http://localhost:3002/getLikedBooks/${data.data.user.id}`;
			setUID(data.data.user.id)
			return url;

        }).then((url) => {

			fetch(url)
			.then((res) => {
				return res.json()
			})
			.then((data) => {
				setBooks(data);
				console.log(data)
			})
			.catch((error) => {
				console.log(error);
			});

        })

    }, []);

    function removeBook(bookID, index){
    
        // replace 1 with userID of person logged on
        var url = 'http://localhost:3002/removeLikedBook';
    
        fetch(url, {
			method: "POST",
			body: JSON.stringify({
				uid: UID,
				itemId: bookID
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		})
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            });

		// used to re-render the page without the books at 'index' after unliking something
		// This just makes it so you don't have to refresh the page to see a change
        setBooks(oldValues => {
          return oldValues.filter((_, i) => i !== index)
        })
    }

	const renderTooltip = (props) => (
		<Tooltip id="button-tooltip" {...props}>
		  Remove
		</Tooltip>
	  );

    return (
      <div style={{overflowX: 'scroll'}} className='scrollContainer'>
        <ul style={{display: 'inline', whiteSpace: 'nowrap', overflow: 'auto'}}>
          {books.map((d, i) => (
            <div key={i} className='container'>
				<img src={require('../Grid/booksImages/' + d.Books.id + '.jpg')} className='images'/>
				<div className='overlay'>
					<div className='titleContainer'>{d.Books.title}</div>
					<div className='categoryContainer'>{d.Books.genre}</div>
					<div className='description'>{d.Books.description}</div>
						<div className='buttonContainer'>
							<OverlayTrigger
							placement="bottom"
							delay={{ show: 0, hide: 100 }}
							overlay={renderTooltip}
							>
							<img src={filledBookmark} className='bookmark'  onClick={() => removeBook(d.Books.id, i)} /> 
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


import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
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

  console.log(list.list);
	
	//TODO: Change this entire Grid component to be dynamic based on the list passed in.
    const [item, setItem] = useState([]);
    const [likes, setLikes] = useState([]);

    useEffect(() => {

        Promise.all(
          [
            fetch(`http://localhost:3002/${list.list}`),
            fetch(`http://localhost:3002/get/1/${list.list}/getArray/-1`)
          ]
        ).then(([resItem, resLikes]) => {
           return Promise.all([resItem.json(), resLikes.json()])
        }).then(([dataItem, dataLikes]) => {
          setItem(dataItem);
          console.log(dataItem);
          setLikes(dataLikes);
        })

    }, []);

	var likesArray = [];

	likes.forEach(item => {
		likesArray.push(item.bookID)
	})

    function likedItem(id){
    
        // replace 1 with userID of person logged on
        var url = `http://localhost:3002/get/1/${list.list}/add/${id}`;
    
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
      <h1 className='pageTitleContainer'>All {list.list}</h1>
        <div className='gridContainer'>
          <ul style={{display: 'inline-block'}}>
            {item.map((d, i) => (
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
					<img src={emptyBookmark} className='bookmark' onClick={() => likedItem(d, i)} />
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


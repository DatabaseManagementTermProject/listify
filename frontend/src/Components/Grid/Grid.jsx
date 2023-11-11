import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import './Grid.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import filledBookmark from '../Profile/bookmarkfill.png'
import emptyBookmark from '../Profile/bookmark.png'
import Tooltip from 'react-bootstrap/Tooltip';
import { useState, useEffect } from 'react';

// Grid renders a grid of whatever parameter is passed in ('books', 'movies', 'videoGames')
function Grid(list) {

    // initialize state variables
    const [item, setItem] = useState([]);
    const [likes, setLikes] = useState([emptyBookmark]);
	

    useEffect(() => {

		// calls our backend to retrieve a full list of items and list of liked items within the current user's relevant liked list (to fill bookmark icons)
		// TODO: replace the second url once updated with Supabase
		// TODO: retrieve the id of current user to pass to second url
        Promise.all(
          [
            fetch(`http://localhost:3002/${list.list}`),
            fetch(`http://localhost:3002/get/1/${list.list}/getArray/-1`)
          ]
        ).then(([resItem, resLikes]) => {
           return Promise.all([resItem.json(), resLikes.json()])
        }).then(([dataItem, dataLikes]) => {
          setItem(dataItem);
          setLikes(dataLikes);
        })
    }, []);


	// TODO: This may not be useful anymore
	var likesArray = [];
	likes.forEach(item => {
		likesArray.push(item.bookID)
	})

	// adds an item to the users appropriate liked list when the bookmark is clicked
    function likedItem(id, index){
    
        // TODO: update this url once switched to Supabase
        var url = `http://localhost:3002/get/1/${list.list}/add/${id.id}`;
    
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

	// This adds a "save" tooltip that gets called when you hover over the bookmark icon
	const renderTooltip = (props) => (
		<Tooltip id="button-tooltip" {...props}>
		  Save
		</Tooltip>
	  );

	
    return (
      <>
        <div className='gridContainer'>
          <ul style={{display: 'inline-block'}}>
            {item.map((d, i) => (
            <div key={i} className='container'>
                <img src={ require('./' + list.list + 'Images/' + i + '.jpg') } className='images'/>
                <div className='overlay'>  
                <div className='titleContainer'>{d.title}</div>
                <div className='categoryContainer'>{d.author}</div>
                <div className='description'>{d.description}</div>
                <div className='buttonContainer'>
                  <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 0, hide: 100 }}
                  overlay={renderTooltip}
                  >
                    <img src={bookmarks[i]} className='bookmark' onClick={() => likedItem(d, i)} />
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


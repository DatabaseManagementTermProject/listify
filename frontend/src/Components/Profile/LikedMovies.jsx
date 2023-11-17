import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./likedItems.css"
import bookmark from './bookmark.png'
import filledBookmark from './bookmarkfill.png'
import Tooltip from 'react-bootstrap/Tooltip';

import { useState, useEffect } from 'react';
import { supabase } from '../../database';

function LikedMovies() {

  const [movies, setMovies] = useState([]);
	const [UID, setUID] = useState();
    
    useEffect(() => {

		// fetch is within the getUser Promise since we can't get books until we have the userID
		supabase.auth.getUser().then((data) => {
					
			let url = `http://localhost:3002/getLikedMovies/${data.data.user.id}`;
			setUID(data.data.user.id)
			return url;

		}).then((url) => {

        fetch(url)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            setMovies(data);
            console.log(data)
        })
        .catch((error) => {
            console.log(error);
        });
		})

    }, []);


    function removeLikedMovie(movie, index){
	
		var url = 'http://localhost:3002/removeLikedMovies';
		
		fetch(url, {
			method: "POST",
			body: JSON.stringify({
				uid: UID,
				itemId: movie
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

          setMovies(oldValues => {
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
          {movies.map((d, i) => (
            <div className='container'>
            <img src={require('../Grid/MoviesImages/' + d.Movies.id + '.jpg')} className='images'/>
            <div className='overlay'>
            <div className='titleContainer'>{d.Movies.title}</div>
            <div className='categoryContainer'>{d.Movies.director}</div>
            <div className='description'>{d.Movies.description}</div>
            <div className='buttonContainer'>
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 0, hide: 100 }}
                overlay={renderTooltip}
                >
                <img src={filledBookmark} className='bookmark' onClick={() => removeLikedMovie(d.Movies.id, i)} />
              </OverlayTrigger>
            </div>
            </div>
                </div>
          ))}
        </ul>
      </div>
      );
}

export default LikedMovies


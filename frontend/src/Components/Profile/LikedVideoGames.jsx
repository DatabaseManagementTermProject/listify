import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./likedItems.css"
import emptyBookmark from './bookmark.png'
import filledBookmark from './bookmarkfill.png'
import Tooltip from 'react-bootstrap/Tooltip';

import { useState, useEffect } from 'react';
import { supabase } from '../../database';

function LikedVideoGames() {

    const [videogames, setVideoGames] = useState([]);
    const [liked, setLiked] = useState([]);
	const [UID, setUID] = useState();
    
    useEffect(() => {

        supabase.auth.getUser().then((data) => {
			
			let url = `http://localhost:3002/getLikedVideoGames/${data.data.user.id}`;
			setUID(data.data.user.id)
			return url;

        }).then((url) => {

			fetch(url)
			.then((res) => {
				return res.json()
			})
			.then((data) => {
				setVideoGames(data);
				console.log(data)
			})
			.catch((error) => {
				console.log(error);
			});

        })
    }, []);

    function removeLikedVideoGame(videoGame, index){


		var url = 'http://localhost:3002/removeLikedVideoGames';
		
		fetch(url, {
			method: "POST",
			body: JSON.stringify({
				uid: UID,
				itemId: videoGame
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

          // set state variable for automatic re-render... probably a better way of doing this
          setVideoGames(oldValues => {
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
          {videogames.map((d, i) => (
            <div key={i} className='container'>
            <img src={require('../Grid/VideoGamesImages/' + d.VideoGames.id + '.jpg')} className='images'/>
            <div className='overlay'>
            <div className='titleContainer'>{d.VideoGames.title}</div>
            <div className='categoryContainer'>{d.VideoGames.author}</div>
            <div className='description'>{d.VideoGames.description}</div>
            <div className='buttonContainer'>
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 0, hide: 100 }}
                overlay={renderTooltip}
                >
                <img src={liked ? filledBookmark : emptyBookmark} className='bookmark' onClick={() => removeLikedVideoGame(d.VideoGames.id, i)} />
              </OverlayTrigger>
            </div>
            </div>
                </div>
          ))}
        </ul>
      </div>
      );
}

export default LikedVideoGames


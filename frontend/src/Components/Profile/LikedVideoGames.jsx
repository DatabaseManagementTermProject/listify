import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/esm/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./likedItems.css"
import bookmark from './bookmark.png'
import filledBookmark from './bookmarkfill.png'
import Tooltip from 'react-bootstrap/Tooltip';

import { useState, useEffect } from 'react';

function LikedVideoGames() {

    const [videogames, setVideoGames] = useState([]);
    
    useEffect(() => {

        var url = "http://localhost:3002/get/1/videoGames/getArray/-1";

        fetch(url)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setVideoGames(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function likeVideoGame(videoGame){


      var id = videoGame.videoGameID;
  
      // replace 1 with userID of person logged on
      var url = `http://localhost:3002/get/1/videoGames/delete/${id}`;
  
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
        Remove
      </Tooltip>
      );

    return (
      <div style={{overflowX: 'scroll'}} className='scrollContainer'>
        <ul style={{display: 'inline', whiteSpace: 'nowrap', overflow: 'auto'}}>
          {videogames.map((d, i) => (
            <div className='container'>
              <img src={d.coverImg} className='images'/>
              <div className='overlay'>
                <div className='description'>{d.description}</div>
                <OverlayTrigger
					placement="bottom"
					delay={{ show: 0, hide: 100 }}
					overlay={renderTooltip}
					>
					<img src={filledBookmark} className='bookmark' />
                </OverlayTrigger>
                </div>
            </div>
          ))}
        </ul>
      </div>
      );
}

export default LikedVideoGames


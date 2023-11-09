import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./likedItems.css"
import bookmark from './bookmark.png'
import filledBookmark from './bookmarkfill.png'
import Tooltip from 'react-bootstrap/Tooltip';

import { useState, useEffect } from 'react';

function LikedMovies() {

    const [movies, setMovies] = useState([]);
    
    useEffect(() => {

        var url = "http://localhost:3002/get/1/movies/getArray/-1";

        fetch(url)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setMovies(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    function likeMovie(movie, index){


      var id = movie.movieID;
  
      // replace 1 with userID of person logged on
      var url = `http://localhost:3002/get/1/movies/delete/${id}`;
  
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
            <img src={require('../Grid/moviesImages/' + d.movieID + '.jpg')} className='images'/>
            <div className='overlay'>
            <div className='titleContainer'>{d.title}</div>
            <div className='categoryContainer'>{d.director}</div>
            <div className='description'>{d.description}</div>
            <div className='buttonContainer'>
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 0, hide: 100 }}
                overlay={renderTooltip}
                >
                <img src={filledBookmark} className='bookmark' onClick={() => likeMovie(d, i)} />
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


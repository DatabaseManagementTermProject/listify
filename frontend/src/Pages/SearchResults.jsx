import React, { useState, useEffect } from "react";
import NavBar from "../Components/NavBar/NavBar";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import 'bootstrap/dist/css/bootstrap.min.css';
import emptyBookmark from '../Components/Grid/Images/bookmark.png'
import Tooltip from 'react-bootstrap/Tooltip';
import { useNavigate } from "react-router-dom";
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../database';
import './SearchResults.css';
import ProfileImage from '../Components/NavBar/profile.png';

// I did all this before the grid would have worked with the search page, due to the difference
// in getting the images, I am leaving it as is for now, but it could be refactored
const SearchResults = () => {

  const navigate = useNavigate();

  const [info, setInfo] = useState([]);
  const [searchParams] = useSearchParams();
  // gets the search parameters from the url established in the navbar
  const mediaType = searchParams.get('mediaType');
  const searchTerm = searchParams.get('query');


  useEffect(() => {

    const url = `http://localhost:3002/search/${mediaType}/${searchTerm}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setInfo(data);
      })
      .catch(error => console.error('Error fetching data:', error));

  }, [searchParams]);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Save
    </Tooltip>
    );

  // to get the appropraite capitalization for the media type when using it for the endpoint
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  function addLikedItem(id){
    // capitalize first letter of media type
    const capitalizedMediaType = capitalizeFirstLetter(mediaType);

    supabase.auth.getUser().then((data) => {
      var userId = data.data.user.id;
      return userId;
    }).then((userId) => {

    var url = `http://localhost:3002/addLiked${capitalizedMediaType}`

      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          uid: userId,
          itemId: id
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then((error) => {
        console.log(error)
      })

    })
  }

  // function to render the content on the search page
  // did this when all the images were retrieved in different ways, could be refactored
  const renderContent = (d, i) => {
    switch (mediaType) {
      case 'movies':
      case 'videoGames':
        return (
          <div key={i} className='container'>
            <img src={d.coverImg} className='images'/>
            <div className='overlay'>
              <div className='titleContainer'>{d.title}</div>
              <div className='categoryContainer'>{mediaType === 'movies' ? d.author : d.genre}</div>
              <div className='description'>{d.description}</div>
              <div className='buttonContainer'>
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip}
                >
                  <img src={emptyBookmark} className='bookmark' onClick={() => addLikedItem(d.id)}/>
                </OverlayTrigger>
              </div>
            </div>
          </div>
        );
      case 'books':
        return (
          <div key={i} className='container'>
            <img src={d.coverImg} className='images'/>
            <div className='overlay'>
              <div className='titleContainer'>{d.title}</div>
              <div className='categoryContainer'>{d.genre}</div>
              <div className='description'>{d.description}</div>
              <div className='buttonContainer'>
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip}
                >
                  <img src={emptyBookmark} className='bookmark' onClick={() => addLikedItem(d.id)}/>
                </OverlayTrigger>
              </div>
            </div>
          </div>
        );
      case 'users':
        return (
          <div key={i} className="userBox" onClick={() => navigate(`/Profile/${d.id}`)}>
          <img src={ProfileImage} alt={`${d.username}'s profile`} className="profileImage" />
          <span className="userName">{d.username}</span>
          </div>
        );
      default:
        return <div>Unsupported media type</div>;
    }
  };

  return (
    <div>
    <NavBar />
    <h1>Search Results</h1>
    {mediaType === 'users' ? (
      <div>
        {info.map((d, i) => renderContent(d, i))}
      </div>
    ) : (
      <div className="gridContainer">
        <ul style={{display: 'inline-block'}}>
          {info.map((d, i) => renderContent(d, i))}
        </ul>
      </div>
    )}
  </div>
  );
}

export default SearchResults;
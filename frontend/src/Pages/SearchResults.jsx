import React, { useState, useEffect } from "react";
import NavBar from "../Components/NavBar/NavBar";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import 'bootstrap/dist/css/bootstrap.min.css';
import Grid from "../Components/Grid/Grid";
import emptyBookmark from '../Components/Grid/Images/bookmark.png'
import Tooltip from 'react-bootstrap/Tooltip';
import { useNavigate } from "react-router-dom";
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../database';



const SearchResults = () => {

  const navigate = useNavigate();

  const [info, setInfo] = useState([]);
  const [searchParams] = useSearchParams();
  // gets the search parameters from the url established in the navbar
  const mediaType = searchParams.get('mediaType');
  const searchTerm = searchParams.get('query');


  useEffect(() => {
    const url = `http://localhost:3002/search/${mediaType}/${searchTerm}`;
    console.log(url);
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

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  function addLikedItem(id){
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
  const renderContent = (d, i) => {
    switch (mediaType) {
      case 'movies':
        return (
          <div className='container'>
            <img src={d.coverImg} className='images'/>
            <div className='overlay'>
              <div className='titleContainer'>{d.title}</div>
              <div className='categoryContainer'>{d.author}</div>
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
        console.log(d);
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
        case 'videoGames' :
          return (
          <div className='container'>
            <img src={d.coverImg} className='images'/>
            <div className='overlay'>
              <div className='titleContainer'>{d.title}</div>
              <div className='categoryContainer'>{d.author}</div>
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
        case 'users' :
          return (
            <div className='container' key={i}>
            <div className='userContainer'>
              <div className='userName' onClick={() => navigate(`/Profile/${d.id}`)}>
                {d.name}
              </div>
            </div>
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
      <div className="gridContainer">
        <ul style={{display: 'inline-block'}}>
          {info.map((d, i) => renderContent(d, i))}
        </ul>
      </div>
    </div>
  );
}

export default SearchResults;
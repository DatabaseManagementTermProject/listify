import React, { useState, useEffect } from "react";
import NavBar from "../Components/NavBar/NavBar";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import 'bootstrap/dist/css/bootstrap.min.css';
import Grid from "../Components/Grid/Grid";
import emptyBookmark from '../Components/Profile/bookmark.png'
import Tooltip from 'react-bootstrap/Tooltip';
import { useNavigate } from "react-router-dom";
import { useSearchParams } from 'react-router-dom';
import '../Components/Profile/likedItems.css'


const SearchResults = () => {

    const navigate = useNavigate();

    const [info, setInfo] = useState([]);
    const [searchParams] = useSearchParams();
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

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Save
    </Tooltip>
    );

    const renderContent = (d, i) => {
      switch (mediaType) {
        case 'movies':
          return (
            <div className='container'>
              <img src={d[' coverImg']} className='images'/>
              <div className='overlay'>
                <div className='titleContainer'>{d.title}</div>
                <div className='categoryContainer'>{d.author}</div>
                <div className='description'>{d.description}</div>
                <div className='buttonContainer'>
                </div>
              </div>
            </div>
          );
        case 'books':
              return (
                <div className='container'>
                  <img src={require('../Components/Grid/BooksImages/' + d.Books.id + '.jpg')} className='images'/>
                  <div className='overlay'>
                    <div className='titleContainer'>{d.Books.title}</div>
                    <div className='categoryContainer'>{d.Books.author}</div>
                    <div className='description'>{d.Books.description}</div>
                    <div className='buttonContainer'>
                      <OverlayTrigger
                        placement="bottom"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip}
                      >
                      {/*  <img src={filledBookmark} className='bookmark' onClick={() => removeLikedBook(d.Movies.id)} /> */}
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
        <div style={{overflowX: 'scroll'}} className='scrollContainer'>
    <ul style={{display: 'inline', whiteSpace: 'nowrap', overflow: 'auto'}}>
      {info.map((d, i) => renderContent(d, i))}
    </ul>
  </div>
</div>
  );
}

export default SearchResults;
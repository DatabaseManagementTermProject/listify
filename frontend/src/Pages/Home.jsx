import React, { useState } from "react";
import NavBar from "../Components/NavBar/NavBar";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import 'bootstrap/dist/css/bootstrap.min.css';
import Grid from "../Components/Grid/Grid";
import emptyBookmark from '../Components/Profile/bookmark.png'
import Tooltip from 'react-bootstrap/Tooltip';

const Home = () => {

    const [info, setInfo] = useState([])
    const [mediaType, setMediaType] = useState('books');
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchInputChange = (event) => {
      setSearchTerm(event.target.value);
  };

    const handleMediaTypeChange = (event) => { 
        setMediaType(event.target.value);
    }

    const handleSearch = (event) => {
      event.preventDefault();
      const url = `http://localhost:3002/search/${mediaType}/${searchTerm}`;

      fetch(url)
          .then(response => response.json())
          .then(data => {
              setInfo(data);
            })
          .catch(error => console.error('Error fetching data:', error));
    };

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const renderTooltip = (props) => (
      <Tooltip id="button-tooltip" {...props}>
        Save
      </Tooltip>
      );

    return (
      <div>
          <NavBar searchDatabase={handleSearch} 
                  handleMediaTypeChange={handleMediaTypeChange}
                  handleSearchInputChange={handleSearchInputChange}
          />
          <h1>Home Page</h1>
      </div>
    );
}


export default Home;
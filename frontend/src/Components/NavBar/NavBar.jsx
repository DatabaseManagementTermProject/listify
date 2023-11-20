// import React from "react";
import './NavBar.css';
import {useNavigate} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";

function NavBar(props) {

  const navigate = useNavigate();

  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const [localMediaType, setLocalMediaType] = useState('books'); 

  // Update the local state on search input change
  const handleSearchInputChange = (event) => {
    setLocalSearchTerm(event.target.value);
  };

  const handleMediaTypeChange = (event) => {
    setLocalMediaType(event.target.value);
  };

  // Handle search form submission
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Navigate to the SearchResults page with search parameters
    navigate(`/searchresults?mediaType=${localMediaType}&query=${encodeURIComponent(localSearchTerm)}`);
  };

  return (
    <div>
    <Navbar bg="dark" data-bs-theme="dark" className='sticky-top'>
        <Container fluid>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                    <Nav.Link className='navLink' onClick={() => navigate('/home')}>Home</Nav.Link>
                    <Nav.Link className='navLink' onClick={() => navigate('/profile')}>My Lists</Nav.Link>
                    <NavDropdown className='navDropDown' title="Browse" id="navbarScrollingDropdown">
                        <NavDropdown.Item onClick={() => navigate('/books')}>Books</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => navigate('/movies')}>Movies</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => navigate('/videogames')}>Video Games</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Form className="d-flex" onSubmit={handleSearchSubmit}>
                    <select className="me-2" onChange={handleMediaTypeChange}>
                        <option value="books">Books</option>
                        <option value="movies">Movies</option>
                        <option value="videoGames">Video Games</option>
                        <option value="users">Users</option>
                    </select>
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        onChange={handleSearchInputChange}
                    />
                </Form>
            </Navbar.Collapse>
        </Container>
    </Navbar>
</div>
  );
}

export default NavBar;
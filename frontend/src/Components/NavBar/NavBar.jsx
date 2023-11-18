// import React from "react";
import './NavBar.css';
import {useNavigate} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

function NavBar({ HandleSearch, selectedCategory, setSelectedCategory }) {

  const navigate = useNavigate();

  return (
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
              {}
              <NavDropdown.Item onClick={() => navigate('/videogames')}>Video Games</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <select className="me-2" onChange={setSelectedCategory} value={selectedCategory}>
                <option value="books">Books</option>
                <option value="movies">Movies</option>
                <option value="videogames">Video Games</option>
                <option value="users">Other Users</option>
            </select>
            <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={HandleSearch}
            />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
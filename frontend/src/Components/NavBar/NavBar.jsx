// import React from "react";
import './NavBar.css';
import logo from './logo.png';
// import profileImg from './profile-img.png'
import { Link } from "react-router-dom";
import house from './house.png'
import profile from './profile.png'
import bookmark from '../Profile/bookmark.png'
import { NavLink } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function NavBar(props) {

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
              {/* <NavDropdown.Divider /> */}
              <NavDropdown.Item onClick={() => navigate('/videogames')}>Video Games</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={props.searchDatabase}
            />
            {/* <Button variant="outline-success" >Search</Button> */}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
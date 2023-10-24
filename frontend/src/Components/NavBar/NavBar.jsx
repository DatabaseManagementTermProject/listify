// import React from "react";
import './NavBar.css';
import logo from './logo.png';
// import profileImg from './profile-img.png'
import { Link } from "react-router-dom";
import house from './house.png'
import profile from './profile.png'

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function NavBar() {
  return (
    <Navbar bg="dark" data-bs-theme="dark" className='navBarContainer'>
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link className='navLink'><Link to="/home"><img src={house} style={{width: 30}}/></Link></Nav.Link>
            <Nav.Link className='navLink'><Link to='/profile'><img src={profile} style={{width: 30}} /></Link></Nav.Link>
            <NavDropdown className='navLink' title="Categories" id="navbarScrollingDropdown">
              <NavDropdown.Item><Link to="/allbooks" style={{ textDecoration: 'none' }}>Books</Link></NavDropdown.Item>
              <NavDropdown.Item><Link to="/allmovies" style={{ textDecoration: 'none' }}>Movies</Link></NavDropdown.Item>
              {/* <NavDropdown.Divider /> */}
              <NavDropdown.Item><Link to="/allvideogames" style={{ textDecoration: 'none' }}>Video Games</Link></NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
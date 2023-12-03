import './NavBar.css';
import {useNavigate} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

function NavBar() {

  const navigate = useNavigate();

  const [selectedSearchItem, setSelectedSearchItem] = useState("Item To Search")
  const [searchTerm, setSearchTerm] = useState('');

  // updates the searchterm state variable as the user types in the search bar
  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // handles search form submission
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // navigate to the SearchResults page with search parameters
    navigate(`/searchresults?mediaType=${selectedSearchItem}&query=${encodeURIComponent(searchTerm)}`);
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
            <Nav.Link className='navLink' onClick={() => navigate('/SharedList')}>Shared List</Nav.Link>
            <Nav.Link className='navLink' onClick={() => navigate('/Test')}>Test</Nav.Link>
            <NavDropdown className='navDropDown' title="Browse" id="navbarScrollingDropdown">
              <NavDropdown.Item onClick={() => navigate('/books')}>Books</NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate('/movies')}>Movies</NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate('/videogames')}>Video Games</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex" onSubmit={handleSearchSubmit}>
          <InputGroup className="mb-3">
				<DropdownButton
				variant="outline-secondary"
				title={selectedSearchItem}
				id="input-group-dropdown-1"
				>
				<Dropdown.Item onClick={() => setSelectedSearchItem("books")}>Books</Dropdown.Item>
				<Dropdown.Item onClick={() => setSelectedSearchItem("movies")}>Movies</Dropdown.Item>
				<Dropdown.Item onClick={() => setSelectedSearchItem("videoGames")}>Video Games</Dropdown.Item>
				<Dropdown.Item onClick={() => setSelectedSearchItem("users")}>Users</Dropdown.Item>
				</DropdownButton>
				<Form.Control
				type="search"
				placeholder="Search"
				className="me-2"
				aria-label="Search"
				onChange={handleSearchInputChange}
				/>
			</InputGroup>
 
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
</div>
  );
}

export default NavBar;
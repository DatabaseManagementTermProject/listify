import React, { useState } from "react";
import NavBar from "../Components/NavBar/NavBar";

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/esm/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import 'bootstrap/dist/css/bootstrap.min.css';


const Home = (props) => {

    const [books, setBooks] = useState([])
    const [likes, setLikes] = useState([]);

   function HandleSearch(event) {
        var url = `http://localhost:3002/home/search/${event.target.value}`

        if (event.target.value != ""){
            Promise.all(
              [
                fetch(url),
                fetch('http://localhost:3002/get/1/books/getArray/-1')
              ]
            ).then(([resBooks, resLikes]) => {
              return Promise.all([resBooks.json(), resLikes.json()])
            }).then(([dataBooks, dataLikes]) => {
              setBooks(dataBooks);
              setLikes(dataLikes);
            })
        }
    }
    

	var likesArray = [];
	likes.forEach(item => {
		likesArray.push(item.bookID)
	})


    return (
      <div>
          <NavBar searchDatabase={HandleSearch} />
          <h1>Home Page</h1>

          <Row xs={1} md={7}>
          {Array.from({ length: books.length }).map((_, idx) => (
            <Col key={idx} style={{display: "inline-block", width: 100}} className="mx-4 my-2">
              <Card>
                {/* after a user likes an item, change it to a solid heart and make a post request to the server to add to liked list */}
                <Button className='likeButton'>{ likesArray.includes(idx) ? "♥" : "♡" }</Button>
                <OverlayTrigger trigger='hover' placement="auto" overlay={
                        <Popover id="popover-basic">
                        <Popover.Header as="h3">{books[idx].title}</Popover.Header>
                        <Popover.Header as="p">{books[idx].author}</Popover.Header>
                        <Popover.Body>
                            {books[idx].description}
                        </Popover.Body>
                        </Popover>
                }>
                  <Card.Img variant="top" src={books[idx].coverImg} style={{width: 100, height: 150}} className='itemImage'/>
                </OverlayTrigger>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
}

export default Home;
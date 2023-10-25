import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/esm/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import './BookCards.css'
import 'bootstrap/dist/css/bootstrap.min.css';




import { useState, useEffect } from 'react';



function BookCards() {

    const [books, setBooks] = useState([]);
    const [likes, setLikes] = useState([]);

    useEffect(() => {
        Promise.all(
          [
            fetch("http://localhost:3002/books"),
            fetch('http://localhost:3002/get/1/books/getArray/-1')
          ]
        ).then(([resBooks, resLikes]) => {
           return Promise.all([resBooks.json(), resLikes.json()])
        }).then(([dataBooks, dataLikes]) => {
          setBooks(dataBooks);
          setLikes(dataLikes);
        })

    }, []);

	var likesArray = [];
	likes.forEach(item => {
		likesArray.push(item.bookID)
	})

    function likedBook(id){
    
        // replace 1 with userID of person logged on
        var url = `http://localhost:3002/get/1/books/add/${id}`;
    
        fetch(url)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // fetch liked lists and if likedID = idx, change state variable for the like button


    return (
        <Row xs={1} md={7}>
          {Array.from({ length: books.length }).map((_, idx) => (
            <Col key={idx} style={{display: "inline-block", width: 100}} className="mx-4 my-2">
              <Card>
                {/* after a user likes an item, change it to a solid heart and make a post request to the server to add to liked list */}
                <Button className='likeButton' onClick={() => likedBook(idx)}>{ likesArray.includes(idx) ? "♥" : "♡" }</Button>
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
      );
}

export default BookCards


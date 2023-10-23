import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './BookCards.css'

import { useState, useEffect } from 'react';

function BookCards() {

    const [books, setBooks] = useState([]);
    
    useEffect(() => {

        var url = "http://localhost:3002/books";

        fetch(url)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setBooks(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <Row xs={1} md={2}>
          {Array.from({ length: books.length }).map((_, idx) => (
            <Col key={idx} style={{display: "inline-block"}} className='mt-4'>
              <Card>
                <Card.Img variant="top" src={books[idx].coverImg} style={{width: 100, height: 150}}/>
                <Card.Body>
                  <Card.Text>

                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      );
}

export default BookCards


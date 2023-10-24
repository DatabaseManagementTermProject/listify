import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/esm/Button';
import './MovieCards.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { useState, useEffect } from 'react';



function MovieCards() {

    const [movies, setMovies] = useState([]);
    
    useEffect(() => {

        var url = "http://localhost:3002/movies";

        fetch(url)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setMovies(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function AddBook() {

    }

    return (
        <Row xs={1} md={7}>
          {Array.from({ length: movies.length }).map((_, idx) => (
            <Col key={idx} style={{display: "inline-block", width: 100}} className="mx-4 my-2">
              <Card>
                {/* after a user likes an item, change it to a solid heart and make a post request to the server to add to liked list */}
                <Button className='likeButton' onClick={() => AddBook()}>♡</Button>
                <Card.Img variant="top" src={movies[idx].coverImg} style={{width: 100, height: 150}} className='itemImage'/>
              </Card>
            </Col>
          ))}
        </Row>
      );
}

export default MovieCards

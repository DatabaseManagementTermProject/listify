import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/esm/Button';
import './VideoGameCards.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { useState, useEffect } from 'react';

function VideoGameCards() {

    const [videogames, setVideoGames] = useState([]);
    
    useEffect(() => {

        var url = "http://localhost:3002/videogames";

        fetch(url)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setVideoGames(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function AddBook() {

    }

    return (
        <Row xs={1} md={7}>
          {Array.from({ length: videogames.length }).map((_, idx) => (
            <Col key={idx} style={{display: "inline-block", width: 100}} className="mx-4 my-2">
              <Card>
                {/* after a user likes an item, change it to a solid heart and make a post request to the server to add to liked list */}
                <Button className='likeButton' onClick={() => AddBook()}>♡</Button>
                <Card.Img variant="top" src={videogames[idx].coverImg} style={{width: 100, height: 150}} className='itemImage'/>
              </Card>
            </Col>
          ))}
        </Row>
      );
}

export default VideoGameCards


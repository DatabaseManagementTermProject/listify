import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/esm/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./likedItems.css"

import { useState, useEffect } from 'react';

function LikedVideoGames() {

    const [videogames, setVideoGames] = useState([]);
    
    useEffect(() => {

        var url = "http://localhost:3002/get/1/videoGames/getArray/-1";

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

    function likeVideoGame(videoGame){


      var id = videoGame.videoGameID;

      console.log(id)
  
      // replace 1 with userID of person logged on
      var url = `http://localhost:3002/get/1/videoGames/add/${id}`;
  
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

    return (
        <Row xs={1} md={7}>
          {Array.from({ length: videogames.length }).map((_, idx) => (
            <Col key={idx} style={{display: "inline-block", width: 100}} className="mx-4 my-2">
              <Card>
                {/* after a user likes an item, change it to a solid heart and make a post request to the server to add to liked list */}
                <Button className='likeButton' onClick={() => likeVideoGame()}>♥︎</Button>
                <OverlayTrigger trigger='hover' placement="auto" overlay={
                        <Popover id="popover-basic">
                        <Popover.Header as="h3">{videogames[idx].title} ({videogames[idx].yearMade})</Popover.Header>
                        <Popover.Header as="p">{videogames[idx].genre}</Popover.Header>
                        <Popover.Body>
                        </Popover.Body>
                        </Popover>
                }>
                <Card.Img variant="top" src={videogames[idx].coverImg} style={{width: 100, height: 150}} className='itemImage'/>
                </OverlayTrigger>
              </Card>
            </Col>
          ))}
        </Row>
      );
}

export default LikedVideoGames


import React from "react";
import {
    Card
} from "react-bootstrap"

const Card = () => {
    return (
        <Card>
            {/* after a user likes an item, change it to a solid heart and make a post request to the server to add to liked list */}
            <Button className='likeButton' onClick={() => likedBook(idx)}>{ likesArray.includes(idx) ? "♥" : "♡" }</Button>
            <Card.Img variant="top" src={books[idx].coverImg} style={{width: 100, height: 150}} className='itemImage'/>
        </Card>
    )
}

export default Card
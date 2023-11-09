import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import './Grid.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import filledBookmark from '../Profile/bookmarkfill.png'
import emptyBookmark from '../Profile/bookmark.png'
import Tooltip from 'react-bootstrap/Tooltip';
import { useState, useEffect } from 'react';

function Grid(list) {

    const [item, setItem] = useState([]);
    const [likes, setLikes] = useState([]);

    useEffect(() => {

        Promise.all(
          [
            fetch(`http://localhost:3002/${list.list}`),
            fetch(`http://localhost:3002/get/1/${list.list}/getArray/-1`)
          ]
        ).then(([resItem, resLikes]) => {
           return Promise.all([resItem.json(), resLikes.json()])
        }).then(([dataItem, dataLikes]) => {
          setItem(dataItem);
          console.log(dataItem);
          setLikes(dataLikes);
        })

    }, []);

	var likesArray = [];

	likes.forEach(item => {
		likesArray.push(item.bookID)
	})

    function likedItem(id, index){
    
        // replace 1 with userID of person logged on
        var url = `http://localhost:3002/get/1/${list.list}/add/${id.id}`;
    
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

	const renderTooltip = (props) => (
		<Tooltip id="button-tooltip" {...props}>
		  Save
		</Tooltip>
	  );

    return (
      <>
        <div className='gridContainer'>
          <ul style={{display: 'inline-block'}}>
            {item.map((d, i) => (
            <div key={i} className='container'>
                <img src={require('./' + list.list + 'Images/' + i + '.jpg')} className='images'/>
                <div className='overlay'>  
                <div className='titleContainer'>{d.title}</div>
                <div className='categoryContainer'>{d.author}</div>
                <div className='description'>{d.description}</div>
                <div className='buttonContainer'>
                  <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 0, hide: 100 }}
                  overlay={renderTooltip}
                  >
                    <img src={emptyBookmark} className='bookmark' onClick={() => likedItem(d, i)} />
                  </OverlayTrigger>
                </div>
              </div>
            </div>
            ))}
          </ul>
          </div>
      </>
      );
}

export default Grid


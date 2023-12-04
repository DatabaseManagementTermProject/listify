import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import './Grid.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import filledBookmark from './Images/bookmarkfill.png'
import emptyBookmark from './Images/bookmark.png'
import Tooltip from 'react-bootstrap/Tooltip';
import { useState, useEffect } from 'react';
import { supabase } from '../../database';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';




// Grid renders a grid of whatever parameter is passed in ('books', 'movies', 'videoGames')
function Grid(list) {

    // initialize state variables
    const [item, setItem] = useState([]);
	const [selectedItem, setSelectedItem] = useState();
    const [likes, setLikes] = useState([emptyBookmark]);
	const [modalShow, setModalShow] = useState(false);

    useEffect(() => {

		// calls our backend to retrieve a full list of items and list of liked items within the current user's relevant liked list (to fill bookmark icons)
		supabase.auth.getUser().then((data) => {
					
			let userId = data.data.user.id;
			return userId;

		}).then((userId) => {

        Promise.all(
          [
            fetch(`http://localhost:3002/${list.list}`),
            fetch(`http://localhost:3002/getLiked${list.list}/${userId}`)
          ]
        ).then(([resItem, resLikes]) => {
           return Promise.all([resItem.json(), resLikes.json()])
        }).then(([dataItem, dataLikes]) => {
          setItem(dataItem);
          setLikes(dataLikes);
        })

      })
    }, []);


	// TODO: This may not be useful anymore
	var likesArray = [];
	likes.forEach(item => {
		likesArray.push(item.bookID)
	})

	// adds an item to the users appropriate liked list when the bookmark is clicked
    function addLikedItem(id, index){

		supabase.auth.getUser().then((data) => {
			
		var userId = data.data.user.id;
		return userId;

		}).then((userId) => {

			var url = `http://localhost:3002/addLiked${list.list}`

			fetch(url, {
				method: "POST",
				body: JSON.stringify({
					uid: userId,
					itemId: index
				}),
				headers: {
					"Content-type": "application/json; charset=UTF-8"
				}
			})
			.then((error) => {
				console.log(error)
			})

		})
    }

	function MyVerticallyCenteredModal(props) {
		return (
		  <Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered

		  >
			<Modal.Header style={{backgroundColor: 'black'}}>
			  <Modal.Title id="contained-modal-title-vcenter">
				<p className='modalTitle'>{selectedItem?.title}</p>
				<p className='modalGenre'>{selectedItem?.author}</p>
				<p className='modalGenre'>{selectedItem?.publishedYear}</p>
				{selectedItem?.genre ? <p className='modalGenre'>{selectedItem?.genre}</p> : ""}
			  </Modal.Title>
			</Modal.Header>
			<Modal.Body style={{backgroundColor: 'black', overflow: 'auto', display: 'block'}}>
				<img src={selectedItem?.coverImg} alt="" style={{width: '200px', height: '300px'}}/>
			  	<p className='modalDescription'>

				
					{selectedItem?.description}
				</p>
			</Modal.Body>
			<Modal.Footer style={{backgroundColor: 'black'}}>
			  <Button onClick={props.onHide}>Close</Button>
			</Modal.Footer>
		  </Modal>
		);
	  }



	// This adds a "save" tooltip that gets called when you hover over the bookmark icon
	const renderTooltip = (props) => (
		<Tooltip id="button-tooltip" {...props}>
		  Save
		</Tooltip>
	  );

	const populateModal = (item) => {
		setSelectedItem(item);
		setModalShow(true);
		console.log(item);
	}

	
    return (
      <>
        <div className='gridContainer'>
          <ul style={{display: 'inline-block'}}>
            {item.map((d, i) => (
            <div key={i} className='container'>
                <img src={ d.coverImg } className='images'/>
                <div className='overlay'>  
                <div className='titleContainer' onClick={() => populateModal(d)}>{d.title}</div>
                <div className='categoryContainer' onClick={() => populateModal(d)}>{d.author}</div>
                <div className='description' onClick={() => populateModal(d)}>{d.description}</div>
                <div className='buttonContainer'>
                  <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 0, hide: 100 }}
                  overlay={renderTooltip}
                  >
                    <img src={emptyBookmark} alt='itemImage' className='bookmark' onClick={() => addLikedItem(d, i)} />
                  </OverlayTrigger>
                </div>
              </div>
            </div>
            ))}
          </ul>
          </div>

		  <MyVerticallyCenteredModal
			show={modalShow}
			onHide={() => setModalShow(false)}
			/>
      </>
      );
}

export default Grid


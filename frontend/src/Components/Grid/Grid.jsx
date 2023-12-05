import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import './Grid.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import filledBookmark from './Images/bookmarkfill.png'
import emptyBookmark from './Images/bookmark.png'
import Tooltip from 'react-bootstrap/Tooltip';
import { useState, useEffect } from 'react';
import { supabase } from '../../database';
import Pagination from 'react-bootstrap/Pagination';
import Modal from 'react-bootstrap/Modal';




// Grid renders a grid of whatever parameter is passed in ('books', 'movies', 'videoGames')
function Grid(list) {

    // initialize state variables
    const [item, setItem] = useState([]);
	const [selectedItem, setSelectedItem] = useState();
    const [likes, setLikes] = useState([]);
	const [modalShow, setModalShow] = useState(false);
	const [bookmarkState, setBookmarkState] = useState(false);
	const [UID, setUID] = useState();
	const [pageNumber, setPageNumber] = useState(1);

	// change 7 to be the number of pages required to display each page
	var pageNumbers = [...Array(9).keys()].map(foo => foo + 1)
	

    useEffect(() => {

		getBooks();

    }, []);

	const getBooks = (pageNumberSelected) => {

		if (pageNumbers.includes(pageNumberSelected)){
			setPageNumber(pageNumberSelected);
		} else {
			pageNumberSelected = 1;
		}
		
		// calls our backend to retrieve a full list of items and list of liked items within the current user's relevant liked list (to fill bookmark icons)
		supabase.auth.getUser().then((data) => {
					
			let userId = data.data.user.id;
			setUID(userId);
			return userId;

		}).then((userId) => {

        Promise.all(
          [
			// pass the pagination number
            fetch(`http://localhost:3002/${list.list}/${pageNumberSelected}`),
            fetch(`http://localhost:3002/getLiked${list.list}/${userId}`)
          ]
        ).then(([resItem, resLikes]) => {
           return Promise.all([resItem.json(), resLikes.json()])
        }).then(([dataItem, dataLikes]) => {
          setItem(dataItem);
		  var likesArray = [];
          dataLikes.forEach(item => {
			likesArray.push(item.itemId)
		  })
		  setLikes(likesArray);
        })

      })
	}


	// TODO: This may not be useful anymore

	// adds an item to the users appropriate liked list when the bookmark is clicked
    const addLikedItem = () => {

		setBookmarkState(!bookmarkState)
		setLikes([...likes, selectedItem?.id]);

		supabase.auth.getUser().then((data) => {
			
		var userId = data.data.user.id;
		return userId;

		}).then((userId) => {

			var url = `http://localhost:3002/addLiked${list.list}`

			fetch(url, {
				method: "POST",
				body: JSON.stringify({
					uid: userId,
					itemId: selectedItem?.id
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

	const renderTooltip = (props) => (
		<Tooltip id="button-tooltip" {...props}>
		  {bookmarkState ? "Remove" : "Add"}
		</Tooltip>
	);

	const bookmark = () => {

		if (likes.includes(selectedItem?.id)){
			setBookmarkState(true);
		} else {
			setBookmarkState(false);
		}

		return (
			<>
				<OverlayTrigger
				placement="bottom"
				delay={{ show: 0, hide: 100 }}
				overlay={renderTooltip}
				>
					<img src={bookmarkState ? filledBookmark : emptyBookmark} className='bookmark' alt="" onClick={bookmarkState ? removeLikedItem : addLikedItem}/>
				</OverlayTrigger>
			</>

		)
	}

	const removeLikedItem = () => {

		setLikes(oldLikes => {
            return oldLikes.filter(likes => likes !== selectedItem?.id)
        })

		var url = `http://localhost:3002/removeLiked${list.list}`;
		
		fetch(url, {
			method: "POST",
			body: JSON.stringify({
				uid: UID,
				itemId: selectedItem?.id
			}),
			headers: {
			"Content-type": "application/json; charset=UTF-8"
				}
			})
          .then((res) => {
              return res.json()
          })
          .then((data) => {
              //console.log(data);
          })
          .catch((error) => {
              //console.log(error);
          });
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
			<Modal.Body>
				<img src={selectedItem?.coverImg} alt="" className='modalImage'/>
			  	<p className='modalDescription'>
					{selectedItem?.description}
				</p>
			</Modal.Body>
			<Modal.Footer>
					<div className='modalBookmark'>
						{bookmark()}
					</div>
			</Modal.Footer>
		  </Modal>
		);
	  }

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
                <div className='overlay' onClick={() => populateModal(d)}>  
                <div className='titleContainer'>{d.title}</div>
                <div className='categoryContainer'>{d.author}</div>
                <div className='description'>{d.description}</div>
                <div className='buttonContainer'>
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
		<div style={{alignItems: 'center', width: '100%'}}>
			<Pagination bg="dark" data-bs-theme="dark">
				<Pagination.Prev onClick={() => getBooks(pageNumber - 1)} />
				{pageNumbers.map((number, index) => (
					<Pagination.Item key={number} active={number == pageNumber} onClick={() => getBooks(number)}>{number}</Pagination.Item>
				))}
				<Pagination.Next onClick={() => getBooks(pageNumber + 1)} />
			</Pagination>
		</div>
      </>
	  
      );
}

export default Grid


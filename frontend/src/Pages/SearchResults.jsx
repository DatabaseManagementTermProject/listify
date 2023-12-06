import React, { useState, useEffect } from "react";
import NavBar from "../Components/NavBar/NavBar";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import 'bootstrap/dist/css/bootstrap.min.css';
import filledBookmark from '../Components/Grid/Images/bookmarkfill.png'
import emptyBookmark from '../Components/Grid/Images/bookmark.png'
import Tooltip from 'react-bootstrap/Tooltip';
import { useNavigate } from "react-router-dom";
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../database';
import './SearchResults.css';
import ProfileImage from '../Components/NavBar/profile.png';
import Modal from 'react-bootstrap/Modal';

// I did all this before the grid would have worked with the search page, due to the difference
// in getting the images, I am leaving it as is for now, but it could be refactored
const SearchResults = () => {

  const navigate = useNavigate();

  const [info, setInfo] = useState([]);
  const [searchParams] = useSearchParams();
  const [modalShow, setModalShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [likes, setLikes] = useState([]);
  const [bookmarkState, setBookmarkState] = useState(false);
	const [UID, setUID] = useState();
  // gets the search parameters from the url established in the navbar
  const mediaType = searchParams.get('mediaType');
  const searchTerm = searchParams.get('query');


  useEffect(() => {
    supabase.auth.getUser().then((data) => {
      let userId = data.data.user.id;
      setUID(userId);
      return userId;
    }).then((userId) => {
      if (mediaType !== 'users') {
        Promise.all([
          fetch(`http://localhost:3002/search/${mediaType}/${searchTerm}`),
          fetch(`http://localhost:3002/getLiked${mediaType}/${userId}`)
        ])
        .then(([resResults, resLikes]) => {
          return Promise.all([resResults.json(), resLikes.json()])
        })
        .then(([dataResults, dataLikes]) => {
          setInfo(dataResults);
          var likesArray = [];
          dataLikes.forEach(item => {
            likesArray.push(item.itemId)
          })
          setLikes(likesArray);
        })
        .catch(error => console.error('Error fetching data:', error));
      } else {
        fetch(`http://localhost:3002/search/${mediaType}/${searchTerm}`)
        .then(resResults => resResults.json())
        .then(dataResults => {
          setInfo(dataResults);
        })
        .catch(error => console.error('Error fetching data:', error));
      }
    })
  }, [searchParams, mediaType, searchTerm]);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Save
    </Tooltip>
    );

  function addLikedItem(){
	setBookmarkState(!bookmarkState)
	setLikes([...likes, selectedItem?.id]);

    supabase.auth.getUser().then((data) => {
      var userId = data.data.user.id;
      return userId;
    }).then((userId) => {

    var url = `http://localhost:3002/addLiked${mediaType}`

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

  // function to render the content on the search page
  // did this when all the images were retrieved in different ways, could be refactored
  const renderContent = (d, i) => {
    switch (mediaType) {
      case 'movies':
      case 'videoGames':
        return (
          <div key={i} className='container'>
            <img src={d.coverImg} className='images'/>
            <div className='overlay' onClick={() => populateModal(d)}>
              <div className='titleContainer'>{d.title}</div>
              <div className='categoryContainer'>{mediaType === 'movies' ? d.author : d.genre}</div>
              <div className='description'>{d.description}</div>
              <div className='buttonContainer'>
              </div>
            </div>
          </div>
        );
      case 'books':
        return (
          <div key={i} className='container'>
            <img src={d.coverImg} className='images'/>
            <div className='overlay' onClick={() => populateModal(d)}>
              <div className='titleContainer'>{d.title}</div>
              <div className='categoryContainer'>{d.author}</div>
              <div className='description'>{d.description}</div>
              <div className='buttonContainer'>
              </div>
            </div>
          </div>
        );
      case 'users':
        return (
          <div key={i} className="userBox" onClick={() => navigate(`/Profile/${d.id}`)}>
          <img src={ProfileImage} alt={`${d.username}'s profile`} className="profileImage" />
          <span className="userName">{d.username}</span>
          </div>
        );
      default:
        return <div>Unsupported media type</div>;
    }
  };

  // useEffect(() => {
  //   setBookmarkState(likes.includes(selectedItem?.id));
  // }, [likes, selectedItem, setBookmarkState]);

  const bookmark = () => {

    setBookmarkState(likes.includes(selectedItem?.id));

    return (
      <>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 0, hide: 100 }}
          overlay={renderTooltip}
        >
          <img 
            src={bookmarkState ? filledBookmark : emptyBookmark} className='bookmark' alt="" onClick={bookmarkState ? removeLikedItem : addLikedItem}
          />
        </OverlayTrigger>
      </>
    )
  };

	const populateModal = (item) => {
		setSelectedItem(item);
		setModalShow(true);
		console.log(item);
	}

	const removeLikedItem = () => {

		setLikes(oldLikes => {
            return oldLikes.filter(likes => likes !== selectedItem?.id)
        })

		var url = `http://localhost:3002/removeLiked${mediaType}`;
		
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

  return (
    <div>
    <NavBar />
    <h1 className="searchResultTitle">Search Results</h1>
    {mediaType === 'users' ? (
      <div>
        {info.map((d, i) => renderContent(d, i))}
      </div>
    ) : (
      <div className="gridContainer">
        <ul style={{display: 'inline-block'}}>
          {info.map((d, i) => renderContent(d, i))}
        </ul>
      </div>
    )}

      <MyVerticallyCenteredModal
      show={modalShow}
      onHide={() => setModalShow(false)}
      />
  </div>
  );
}

export default SearchResults;
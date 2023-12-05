import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HorizontalGrid.css'
import emptyBookmark from '../Grid/Images/bookmark.png'
import filledBookmark from '../Grid/Images/bookmarkfill.png'
import Tooltip from 'react-bootstrap/Tooltip';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';

// gridItems: the JSON array returned by supabase
// listName: used to locate images and also remove likes from the appropriate table.
// gridTitle: the title that shows above the horizontal grid
// removalHandler: this must be passed if you have a list where it makes sense for something to be removed. this is called when the bookmark image is clicked
function HorizontalGrid({gridItems, listName, gridTitle, removalHandler}) {

    const [selectedItem, setSelectedItem] = useState();
    const [modalShow, setModalShow] = useState(false);
    const [selectedItemIndex, setSelectedItemIndex] = useState()

    const renderTooltip = (props) => (
		<Tooltip id="button-tooltip" {...props}>
		  Remove
		</Tooltip>
	);

    const handleRemoval = () => {
        setModalShow(false);
        removalHandler(selectedItem?.id, selectedItemIndex, listName);
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
					<div className='modalBookmark' onClick={props.onHide}>
                    <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 0, hide: 100 }}
                    overlay={renderTooltip}
                    >
                        <img src={filledBookmark} className='bookmark' alt="" onClick={handleRemoval}/>
                    </OverlayTrigger>
					</div>
			</Modal.Footer>
		  </Modal>
		);
	  }

    const populateModal = (item, index) => {
        setSelectedItemIndex(index);
		setSelectedItem(item);
		setModalShow(true);
	}

    return (
        <>
            <h3 className="subheading">My {gridTitle}</h3>
            <div style={{overflowX: 'scroll'}} className='scrollContainer'>
                <ul style={{display: 'inline', whiteSpace: 'nowrap', overflow: 'auto'}}>
                {gridItems.map((d, i) => (
                    <div key={i} className='container'>
                        <img src={d.coverImg} className='images'/>
                        <div className='overlay' onClick={() => populateModal(d, i)}>
                            <div className='titleContainer'>{d.title}</div>
                            <div className='categoryContainer'>{d.author}</div>
                            <div className='description'>{d.description}</div>
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
// onClick={() => removeBook(d.Books.id, i)} 
export default HorizontalGrid;
import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HorizontalGrid.css'
import emptyBookmark from '../../Images/bookmark.png'
import filledBookmark from '../../Images/bookmarkfill.png'
import Tooltip from 'react-bootstrap/Tooltip';

function HorizontalGrid({gridItems, listName, gridTitle, removalHandler}) {

	const renderTooltip = (props) => (
		<Tooltip id="button-tooltip" {...props}>
		  Remove
		</Tooltip>
	);

    return (
        <>
            <h3 className="subheading">My {gridTitle}</h3>
            <div style={{overflowX: 'scroll'}} className='scrollContainer'>
                <ul style={{display: 'inline', whiteSpace: 'nowrap', overflow: 'auto'}}>
                {gridItems.map((d, i) => (
                    <div key={i} className='container'>
                        <img src={require('../../Images/' + listName + '/' + d[listName].id + '.jpg')} className='images'/>
                        <div className='overlay'>
                            <div className='titleContainer'>{d[listName].title}</div>
                            <div className='categoryContainer'>{d[listName].genre}</div>
                            <div className='description'>{d[listName].description}</div>
                                <div className='buttonContainer'>
                                    <OverlayTrigger
                                    placement="bottom"
                                    delay={{ show: 0, hide: 100 }}
                                    overlay={renderTooltip}
                                    >
                                    <img src={filledBookmark} className='bookmark' onClick={() => removalHandler(d[listName].id, i, listName)} /> 
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
// onClick={() => removeBook(d.Books.id, i)} 
export default HorizontalGrid;
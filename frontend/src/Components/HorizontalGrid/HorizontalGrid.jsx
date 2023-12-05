import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HorizontalGrid.css'
import emptyBookmark from '../Grid/Images/bookmark.png'
import filledBookmark from '../Grid/Images/bookmarkfill.png'
import Tooltip from 'react-bootstrap/Tooltip';

// gridItems: the JSON array returned by supabase
// listName: used to locate images and also remove likes from the appropriate table.
// gridTitle: the title that shows above the horizontal grid
// removalHandler: this must be passed if you have a list where it makes sense for something to be removed. this is called when the bookmark image is clicked
function HorizontalGrid({gridItems, listName, gridTitle, removalHandler}) {

    return (
        <>
            <h3 className="subheading">My {gridTitle}</h3>
            <div style={{overflowX: 'scroll'}} className='scrollContainer'>
                <ul style={{display: 'inline', whiteSpace: 'nowrap', overflow: 'auto'}}>
                {gridItems.map((d, i) => (
                    <div key={i} className='container'>
                        <img src={d.coverImg} className='images'/>
                        <div className='overlay'>
                            <div className='titleContainer'>{d.title}</div>
                            <div className='categoryContainer'>{d.genre}</div>
                            <div className='description'>{d.description}</div>
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
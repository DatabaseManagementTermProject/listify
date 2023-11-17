import React, { useEffect, useState } from 'react';
import { supabase } from '../../database';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import "./likedItems.css";
import bookmark from './bookmark.png'
import filledBookmark from './bookmarkfill.png'

function SharedLikedItems({ loggedInUserID, viewedUserID, contentType }) {
    const [commonLikedItems, setCommonLikedItems] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchCommonLikedItems() {
            try {

                // trying to perform a natural join with the content table (based on the content type)
                // writing this is hurting my brain
                // I'll come back to it later
                const { data: commonLikedItemsData, error: joinError } = await supabase
                    .from(`liked${contentType}`)
                    .select(`liked${contentType}.*, ${contentType}.*`)
                    .eq(`liked${contentType}.userID`, loggedInUserID)
                    .eq(`liked${contentType}.userID`, viewedUserID);

                // throws the error if the join doesn't work
                if (joinError) {
                    throw joinError;
                }

                setCommonLikedItems(commonLikedItemsData);
            } catch (err) {
                setError(err);
            }
        }

        fetchCommonLikedItems();
    }, [loggedInUserID, viewedUserID, contentType]);

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Remove
        </Tooltip>
    );

    if (error) {
        throw error;
    }

    return (
        <div style={{ overflowX: 'scroll' }} className="scrollContainer">
            <ul style={{ display: 'inline', whiteSpace: 'nowrap', overflow: 'auto' }}>
                {commonLikedItems.map((item, index) => (
                    <div key={index} className="container">
                        <img src={require(`../Grid/${contentType}Images/${item[contentType].id}.jpg`)} className="images" />
                        <div className="overlay">
                            <div className="titleContainer">{item[contentType].title}</div>
                            <div className="categoryContainer">{item[contentType].author}</div>
                            <div className="description">{item[contentType].description}</div>
                            <div className="buttonContainer">
                                <OverlayTrigger placement="bottom" delay={{ show: 0, hide: 100 }} overlay={renderTooltip}>
                                    <img
                                        src={liked ? filledBookmark : bookmark}
                                        className="bookmark"
                                    />
                                </OverlayTrigger>
                            </div>
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default SharedLikedItems;
import React, { useEffect, useState } from 'react';
import { supabase } from '../../database';
import "./likedItems.css";
import HorizontalGrid from '../HorizontalGrid/HorizontalGrid';

function SharedLikedItems({ viewedUserId, loggedInUserId, contentType }) {
    const [commonLikedItems, setCommonLikedItems] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchCommonLikedItems() {
            try {
                let data, error;

                switch (contentType) {
                    case 'Books':
                        ({ data, error } = await supabase.rpc('get_shared_liked_books', {
                            logged_in_user_id: loggedInUserId,
                            viewed_user_id: viewedUserId,
                        }));
                        break;
                    case 'Movies':
                        ({ data, error } = await supabase.rpc('get_shared_liked_movies', {
                            logged_in_user_id: loggedInUserId,
                            viewed_user_id: viewedUserId,
                        }));
                        break;
                    case 'VideoGames':
                        ({ data, error } = await supabase.rpc('get_shared_liked_videogames', {
                            logged_in_user_id: loggedInUserId,
                            viewed_user_id: viewedUserId,
                        }));
                        break;
                    default:
                        throw new Error(`Unsupported content type: ${contentType}`);
                }

                if (error) {
                    console.error('Error fetching data:', error);
                    setError(error);
                    return;
                }

                setCommonLikedItems(data);
                console.log("Fetched data:", data);
            } catch (err) {
                console.error('Error:', err);
                setError(err);
            }
        }
    
        fetchCommonLikedItems();
    }, [viewedUserId, loggedInUserId, contentType]);
    
    if (error) {
        return <div>Error loading data</div>;
    }

    if (commonLikedItems.length === 0) {
        return <div>No shared liked {contentType} found.</div>;
    }

    return (
        <>
            <div style={{ overflowX: 'scroll' }} className="scrollContainer">
                <HorizontalGrid
                    gridItems={commonLikedItems}
                    listName={contentType}
                    gridTitle={`Mutual ${contentType}`}
                />
            </div>
        </>
    );
}

export default SharedLikedItems;
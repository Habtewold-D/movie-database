import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getWatchlist, addToWatchlist, removeFromWatchlist } from '../services/watchlistService';
import AuthContext from '../context/AuthContext';

const WatchlistIcon = ({ movieId }) => {
    const [isInWatchlist, setIsInWatchlist] = useState(false);
    const { user, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const checkWatchlist = async () => {
            if (isAuthenticated() && user?.id) {
                try {
                    const watchlist = await getWatchlist(user.id);
                    setIsInWatchlist(watchlist.some(item => item.movie_id === movieId));
                } catch (error) {
                    console.error('Error checking watchlist:', error);
                }
            }
        };

        checkWatchlist();
    }, [movieId, user, isAuthenticated]);

    const handleWatchlist = async () => {
        if (!isAuthenticated()) {
            alert('Please log in to add to watchlist.');
            navigate('/login');
            return;
        }

        try {
            if (isInWatchlist) {
                await removeFromWatchlist(user.id, movieId); // Remove from watchlist
                alert('Movie removed from watchlist!');
            } else {
                await addToWatchlist(user.id, movieId); // Add to watchlist
                alert('Movie added to watchlist!');
            }
            setIsInWatchlist(!isInWatchlist); // Toggle watchlist state
        } catch (error) {
            console.error('Error updating watchlist:', error);
        }
    };

    return (
        <button onClick={handleWatchlist} className="watchlist-icon">
            {isInWatchlist ? '✅' : '➕'}
        </button>
    );
};

export default WatchlistIcon;
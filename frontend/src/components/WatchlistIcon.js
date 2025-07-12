import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getWatchlist, addToWatchlist, removeFromWatchlist } from '../services/watchlistService';
import AuthContext from '../context/AuthContext';

const WatchlistIcon = ({ movieId }) => {
    const [isInWatchlist, setIsInWatchlist] = useState(false);
    const [watchlistMongoId, setWatchlistMongoId] = useState(null);
    const [loading, setLoading] = useState(false);
    const { user, token, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const checkWatchlist = async () => {
            if (isAuthenticated() && user?._id) {
                try {
                    const watchlist = await getWatchlist(user._id);
                    const found = watchlist.find(item => item.movie_id && item.movie_id.tmdb_id === movieId);
                    setIsInWatchlist(!!found);
                    setWatchlistMongoId(found ? found.movie_id._id : null);
                } catch {
                    setIsInWatchlist(false);
                    setWatchlistMongoId(null);
                }
            } else {
                setIsInWatchlist(false);
                setWatchlistMongoId(null);
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
        if (loading) return;
        setLoading(true);
        try {
            if (isInWatchlist) {
                await removeFromWatchlist(user._id, watchlistMongoId, token);
                setIsInWatchlist(false);
                setWatchlistMongoId(null);
            } else {
                await addToWatchlist(user._id, movieId, token);
                setIsInWatchlist(true);
            }
        } catch {
            // Optionally show an error message
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleWatchlist}
            className="watchlist-icon"
            style={{ color: isInWatchlist ? '#1976d2' : '#888', fontSize: '1.5em', background: 'none', border: 'none', cursor: 'pointer', marginLeft: '0.5em' }}
            aria-label={isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
            disabled={loading}
            title={isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
        >
            {isInWatchlist ? '📑' : '🔖'}
        </button>
    );
};

export default WatchlistIcon;
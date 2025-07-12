import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFavorites, addFavorite, removeFavorite } from '../services/favoriteService';
import AuthContext from '../context/AuthContext';

const FavoriteIcon = ({ movieId }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [favoriteMongoId, setFavoriteMongoId] = useState(null);
    const [loading, setLoading] = useState(false);
    const { user, token, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const checkFavorite = async () => {
            if (isAuthenticated() && user?._id) {
                try {
                    const favorites = await getFavorites(user._id);
                    const found = favorites.find(fav => fav.movie_id && fav.movie_id.tmdb_id === movieId);
                    setIsFavorite(!!found);
                    setFavoriteMongoId(found ? found.movie_id._id : null);
                } catch (error) {
                    setIsFavorite(false);
                    setFavoriteMongoId(null);
                }
            } else {
                setIsFavorite(false);
                setFavoriteMongoId(null);
            }
        };
        checkFavorite();
    }, [movieId, user, isAuthenticated]);

    const handleFavorite = async () => {
        if (!isAuthenticated()) {
            alert('Please log in to add favorites.');
            navigate('/login');
            return;
        }
        if (loading) return;
        setLoading(true);
        try {
            if (isFavorite) {
                await removeFavorite(user._id, favoriteMongoId, token);
                setIsFavorite(false);
                setFavoriteMongoId(null);
            } else {
                await addFavorite(user._id, movieId, token);
                setIsFavorite(true);
            }
        } catch (error) {
            // Optionally show an error message
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleFavorite}
            className="favorite-icon"
            style={{ color: isFavorite ? 'red' : 'gray', fontSize: '1.5em', background: 'none', border: 'none', cursor: 'pointer' }}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            disabled={loading}
        >
            {isFavorite ? '❤️' : '🤍'}
        </button>
    );
};

export default FavoriteIcon;
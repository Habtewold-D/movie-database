import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFavorites, addFavorite, removeFavorite } from '../services/favoriteService';
import AuthContext from '../context/AuthContext';

const FavoriteIcon = ({ movieId }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const { user, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const checkFavorite = async () => {
            if (isAuthenticated() && user?.id) {
                try {
                    const favorites = await getFavorites(user.id);
                    setIsFavorite(favorites.some(fav => fav.movie_id === movieId));
                } catch (error) {
                    console.error('Error checking favorite:', error);
                }
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

        try {
            if (isFavorite) {
                await removeFavorite(user.id, movieId); // Remove from favorites
                alert('Movie removed from favorites!');
            } else {
                await addFavorite(user.id, movieId); // Add to favorites
                alert('Movie added to favorites!');
            }
            setIsFavorite(!isFavorite); // Toggle favorite state
        } catch (error) {
            console.error('Error updating favorite:', error);
        }
    };

    return (
        <button onClick={handleFavorite} className="favorite-icon">
            {isFavorite ? '❤️' : '🤍'}
        </button>
    );
};

export default FavoriteIcon;
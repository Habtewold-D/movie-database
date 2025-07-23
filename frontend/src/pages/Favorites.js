import React, { useEffect, useState, useContext } from 'react';
import { getFavorites } from '../services/favoriteService';
import AuthContext from '../context/AuthContext';
import MovieList from '../components/MovieList';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const { user, isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        const loadFavorites = async () => {
            if (isAuthenticated() && user?.id) {
                try {
                    const data = await getFavorites(user.id);
                    setFavorites(data);
                } catch (error) {
                    console.error('Error fetching favorites:', error);
                }
            }
        };

        loadFavorites();
    }, [user, isAuthenticated]);

    return (
        <div className="favorites-page">
            <h1>Your Favorites</h1>
            <MovieList movies={favorites} />
        </div>
    );
};

export default Favorites;
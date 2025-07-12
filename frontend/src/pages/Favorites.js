import React, { useEffect, useState, useContext } from 'react';
import { getFavorites } from '../services/favoriteService';
import AuthContext from '../context/AuthContext';
import MovieList from '../components/MovieList';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { user, isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        const loadFavorites = async () => {
            setIsLoading(true);
            setError('');
            if (isAuthenticated() && user?._id) {
                try {
                    const data = await getFavorites(user._id);
                    setFavorites(data);
                } catch (error) {
                    setError('Failed to load favorites.');
                    setFavorites([]);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setFavorites([]);
                setIsLoading(false);
            }
        };

        loadFavorites();
    }, [user, isAuthenticated]);

    // Map favorites to movie objects for MovieList, ensuring rating, formatted date, and correct id/tmdb_id
    const favoriteMovies = favorites.map(fav => {
        const movie = fav.movie_id;
        return {
            ...movie,
            vote_average: movie.vote_average || movie.rating || '',
            release_date: movie.release_date ? movie.release_date.slice(0, 10) : '',
            tmdb_id: movie.tmdb_id,
            id: movie.tmdb_id, // for routing
        };
    });

    return (
        <div className="favorites-page">
            <h1>Your Favorites</h1>
            {isLoading ? (
                <div className="loading-spinner">Loading...</div>
            ) : error ? (
                <div className="error-message">{error}</div>
            ) : (
                <MovieList movies={favoriteMovies} />
            )}
        </div>
    );
};

export default Favorites;
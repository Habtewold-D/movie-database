import React, { useEffect, useState, useContext } from 'react';
import { getFavorites } from '../services/favoriteService';
import { getWatchlist } from '../services/watchlistService';
import AuthContext from '../context/AuthContext';
import MovieList from '../components/MovieList';

const Profile = () => {
    const [favorites, setFavorites] = useState([]);
    const [watchlist, setWatchlist] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            setError('');
            try {
                if (user) {
                    const favoritesData = await getFavorites(user.id);
                    const watchlistData = await getWatchlist(user.id);
                    setFavorites(favoritesData);
                    setWatchlist(watchlistData);
                }
            } catch (error) {
                console.error('Error loading profile data:', error);
                setError('Failed to load profile data. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [user]);

    return (
        <div className="profile">
            <h1>Your Profile</h1>
            {isLoading ? (
                <div className="loading-spinner">Loading...</div>
            ) : error ? (
                <div className="error-message">{error}</div>
            ) : (
                <>
                    <h2>Favorites</h2>
                    <MovieList movies={favorites} />
                    <h2>Watchlist</h2>
                    <MovieList movies={watchlist} />
                </>
            )}
        </div>
    );
};

export default Profile;
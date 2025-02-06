import React, { useContext, useEffect, useState } from 'react';
import { getWatchlist } from '../services/api';
import AuthContext from '../context/AuthContext';
import MovieList from '../components/MovieList';

const Watchlist = () => {
    const [watchlist, setWatchlist] = useState([]);
    const { user, isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        const loadWatchlist = async () => {
            if (isAuthenticated() && user?.id) {
                try {
                    const data = await getWatchlist(user.id);
                    setWatchlist(data);
                } catch (error) {
                    console.error('Error fetching watchlist:', error);
                }
            }
        };

        loadWatchlist();
    }, [user, isAuthenticated]);

    return (
        <div className="watchlist-page">
            <h1>Your Watchlist</h1>
            <MovieList movies={watchlist} />
        </div>
    );
};

export default Watchlist;
import React, { useEffect, useState, useContext } from 'react';
import { getWatchlist } from '../services/watchlistService';
import AuthContext from '../context/AuthContext';
import MovieList from '../components/MovieList';

const Watchlist = () => {
    const [watchlist, setWatchlist] = useState([]);
    const { user, isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        const loadWatchlist = async () => {
            if (isAuthenticated() && user?._id) {
                try {
                    const data = await getWatchlist(user._id);
                    setWatchlist(data);
                } catch (error) {
                    console.error('Error fetching watchlist:', error);
                }
            }
        };

        loadWatchlist();
    }, [user, isAuthenticated]);

    // Map watchlist to movie objects for MovieList, ensuring tmdb_id, id, rating, and formatted date
    const watchlistMovies = watchlist.map(item => {
        const movie = item.movie_id;
        return {
            ...movie,
            tmdb_id: movie.tmdb_id,
            id: movie.tmdb_id, // for routing
            vote_average: movie.vote_average || movie.rating || '',
            release_date: movie.release_date ? movie.release_date.slice(0, 10) : '',
        };
    });

    return (
        <div className="watchlist-page">
            <h1>Your Watchlist</h1>
            <MovieList movies={watchlistMovies} iconType="watchlist" />
        </div>
    );
};

export default Watchlist;
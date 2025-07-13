import React from 'react';
import { Link } from 'react-router-dom';
import FavoriteIcon from './FavoriteIcon';
import WatchlistIcon from './WatchlistIcon';

const MovieCard = ({ movie, iconType }) => {
    const movieId = movie.tmdb_id || movie.id;
    return (
        <div className="movie-card">
            <Link to={`/movie/${movieId}`}>
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="movie-poster"
                />
            </Link>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.release_date}</p>
                <p>Rating: {movie.vote_average}</p>
                <div style={{ display: 'flex', gap: '0.75em', alignItems: 'center', marginTop: '0.5em', justifyContent: 'center', width: '100%' }}>
                    {(!iconType || iconType === 'favorite') && <FavoriteIcon movieId={movieId} />}
                    {(!iconType || iconType === 'watchlist') && <WatchlistIcon movieId={movieId} />}
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
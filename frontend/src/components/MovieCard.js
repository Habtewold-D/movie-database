import React from 'react';
import { Link } from 'react-router-dom';
import FavoriteIcon from './FavoriteIcon';

const MovieCard = ({ movie }) => {
    return (
        <div className="movie-card">
            <Link to={`/movie/${movie.id}`}>
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
                <FavoriteIcon movieId={movie.id} />
            </div>
        </div>
    );
};

export default MovieCard;
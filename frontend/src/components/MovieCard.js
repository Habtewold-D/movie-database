// src/components/MovieCard.js
import React from 'react';

const MovieCard = ({ movie }) => {
    return (
        <div className="movie-card">
            <img src={movie.poster_path} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
        </div>
    );
};

export default MovieCard;

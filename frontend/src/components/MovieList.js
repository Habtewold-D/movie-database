import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies }) => {
    return (
        <div className="movie-list">
            {movies.map((movie) => (
                <MovieCard key={movie.tmdb_id || movie.id || movie._id} movie={movie} />
            ))}
        </div>
    );
};

export default MovieList;
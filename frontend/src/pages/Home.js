// src/pages/Home.js
import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';

const Home = () => {
    const [movies, setMovies] = useState([]); // State to hold the movie list

    return (
        <div className="home-page">
            <h1>Movie Database</h1>
            <SearchBar setMovies={setMovies} /> {/* Pass setMovies to SearchBar */}
            
            {/* Display the list of movies */}
            <div className="movie-list">
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <div key={movie.id} className="movie-card">
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                            <h3>{movie.title}</h3>
                        </div>
                    ))
                ) : (
                    <p>No movies found</p> // Show a message if no movies found
                )}
            </div>
        </div>
    );
};

export default Home;

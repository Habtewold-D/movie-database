// src/pages/Home.js
import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import { fetchMovies } from '../services/api';

const Home = () => {
    const [movies, setMovies] = useState([]);

    const handleSearch = async (query) => {
        const data = await fetchMovies(query);
        setMovies(data.results);
    };

    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            <MovieList movies={movies} />
        </div>
    );
};

export default Home;

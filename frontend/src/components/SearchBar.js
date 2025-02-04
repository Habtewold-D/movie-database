// src/components/SearchBar.js
import React, { useState } from 'react';
import { fetchMovies } from '../services/api';

const SearchBar = ({ setMovies }) => {
    const [query, setQuery] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        if (query.trim()) {
            const data = await fetchMovies(query);
            setMovies(data.results); // Pass results to parent component
        }
    };

    return (
        <form onSubmit={handleSearch} className="search-bar">
            <input
                type="text"
                placeholder="Search for a movie..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;

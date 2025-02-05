// src/pages/Home.js
import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import { fetchMovies } from '../services/api';
import Pagination from '../components/Pagination';

const Home = () => {
    const [movies, setMovies] = useState([]); // State to hold the movie list
    const [currentPage, setCurrentPage] = useState(1); // Current page number
    const [totalPages, setTotalPages] = useState(1); // Total number of pages
    const [query, setQuery] = useState(''); // Search query
    const [isLoading, setIsLoading] = useState(false); // Track loading state
    const [errorMessage, setErrorMessage] = useState(''); // Track error message

    const handleSearch = async (searchQuery) => {
        setQuery(searchQuery);
        setIsLoading(true); // Set loading to true when starting the fetch
        setErrorMessage(''); // Clear any previous error messages

        try {
            const data = await fetchMovies(searchQuery, currentPage);
            if (data.results.length === 0) {
                setErrorMessage('No movies found.');
            }
            setMovies(data.results);
            setTotalPages(data.total_pages);
        } catch (error) {
            console.error('Error fetching movies:', error);
            setErrorMessage('An error occurred while fetching the movies.');
        } finally {
            setIsLoading(false); // Set loading to false once fetch is complete
        }
    };

    const handlePageChange = async (newPage) => {
        setCurrentPage(newPage);
        setIsLoading(true); // Set loading to true when starting the fetch
        setErrorMessage(''); // Clear any previous error messages

        try {
            const data = await fetchMovies(query, newPage);
            setMovies(data.results);
        } catch (error) {
            console.error('Error fetching movies:', error);
            setErrorMessage('An error occurred while fetching the movies.');
        } finally {
            setIsLoading(false); // Set loading to false once fetch is complete
        }
    };

    return (
        <div className="home-page">
            <h1>Movie Database</h1>
            <SearchBar setMovies={handleSearch} />
            
            {/* Show loading spinner while fetching data */}
            {isLoading && <div className="spinner"></div>}

            {/* Show error message if fetching fails */}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            
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
                    <p>No movies found</p>
                )}
            </div>
            
            {/* Pagination controls */}
            {movies.length > 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
};

export default Home;

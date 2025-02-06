import React, { useState, useEffect } from 'react';
import { fetchPopularMovies, searchMovies } from '../services/api';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import Pagination from '../components/Pagination';

const Home = () => {
    const [movies, setMovies] = useState([]); // All movies fetched
    const [currentPage, setCurrentPage] = useState(1); // Current page number
    const [totalPages, setTotalPages] = useState(1); // Total pages
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [error, setError] = useState(''); // Error message
    const moviesPerPage = 12; // Number of movies to display per page

    useEffect(() => {
        loadPopularMovies();
    }, []);

    // Fetch popular movies (10 pages)
    const loadPopularMovies = async () => {
        setIsLoading(true);
        setError('');
        try {
            let allMovies = [];
            for (let page = 1; page <= 10; page++) {
                const data = await fetchPopularMovies(page);
                allMovies = [...allMovies, ...data.results];
            }
            setMovies(allMovies);
            setTotalPages(Math.ceil(allMovies.length / moviesPerPage)); // Calculate total pages
        } catch (error) {
            console.error('Error loading popular movies:', error);
            setError('Failed to load movies. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Handle search
    const handleSearch = async (query) => {
        setIsLoading(true);
        setError('');
        try {
            const data = await searchMovies(query);
            setMovies(data.results);
            setTotalPages(Math.ceil(data.results.length / moviesPerPage)); // Calculate total pages
            setCurrentPage(1); // Reset to first page after search
        } catch (error) {
            console.error('Error searching movies:', error);
            setError('Failed to search movies. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Get movies for the current page
    const getMoviesForCurrentPage = () => {
        const startIndex = (currentPage - 1) * moviesPerPage;
        const endIndex = startIndex + moviesPerPage;
        return movies.slice(startIndex, endIndex);
    };

    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            {isLoading ? (
                <div className="loading-spinner">Loading...</div>
            ) : error ? (
                <div className="error-message">{error}</div>
            ) : (
                <>
                    <MovieList movies={getMoviesForCurrentPage()} />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </>
            )}
        </div>
    );
};

export default Home;
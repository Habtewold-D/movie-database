// src/services/api.js
import axios from 'axios';

const fetchMovies = async (query, page = 1) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_MOVIE_DATABASE_API_URL}/search/movie`, {
            params: {
                api_key: process.env.REACT_APP_MOVIE_DATABASE_API_KEY,
                query: query,
                page: page,
                language: 'en-US'
            }
        });
        return response.data;  // Return the full data (including the page and total_results)
    } catch (error) {
        console.error("Error fetching movies:", error);
        return { results: [] };  // Return an empty array in case of error
    }
};

export { fetchMovies };

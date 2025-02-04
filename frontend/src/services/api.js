// src/services/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_MOVIE_DATABASE_API_URL;
const API_KEY = process.env.REACT_APP_MOVIE_DATABASE_API_KEY;

export const fetchMovies = async (query) => {
    try {
        const response = await axios.get(`${API_URL}/search/movie`, {
            params: { query, api_key: API_KEY },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching movies:', error);
        return { results: [] }; // Return empty results in case of error
    }
};

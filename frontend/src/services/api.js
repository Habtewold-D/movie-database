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
        
        // Log the response data for debugging purposes
        console.log("API Response:", response.data);
        
        return response.data;
    } catch (error) {
        // Log the error to the console if something goes wrong
        console.error("Error fetching movies:", error);
        return { results: [] };  // Return empty results if error occurs
    }
};

export { fetchMovies };

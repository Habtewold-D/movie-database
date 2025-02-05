// src/services/api.js
import axios from 'axios';

// Modify fetchMovies function to hit the backend API
const fetchMovies = async (query, page = 1) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/movies/search`, {
            params: {
                query: query,
                page: page,
            }
        });
        
        // Log the response data for debugging purposes
        console.log("API Response:", response.data);
        
        return response.data; // Return movie results from backend
    } catch (error) {
        console.error("Error fetching movies:", error);
        return { results: [] };  // Return empty results if error occurs
    }
};

export { fetchMovies };

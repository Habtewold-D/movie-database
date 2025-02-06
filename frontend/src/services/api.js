import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Your backend URL
const MOVIE_API_KEY = process.env.REACT_APP_MOVIE_DATABASE_API_KEY; // Ensure this is in your .env file
const MOVIE_API_URL = process.env.REACT_APP_MOVIE_DATABASE_API_URL; // Ensure this is in your .env file

// Fetch popular movies from TMDB
export const fetchPopularMovies = async (page = 1) => {
    try {
        const response = await axios.get(`${MOVIE_API_URL}/movie/popular`, {
            params: {
                api_key: MOVIE_API_KEY,
                language: 'en-US',
                page: page,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        throw error;
    }
};

// Search movies
export const searchMovies = async (query) => {
    try {
        const response = await axios.get(`${MOVIE_API_URL}/search/movie`, {
            params: {
                api_key: MOVIE_API_KEY,
                query,
                language: 'en-US',
                page: 1,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error searching movies:', error);
        throw error;
    }
};

// Fetch movie details
export const fetchMovieDetails = async (movieId) => {
    try {
        const response = await axios.get(`${MOVIE_API_URL}/movie/${movieId}`, {
            params: {
                api_key: MOVIE_API_KEY,
                language: 'en-US',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        throw error;
    }
};

// User registration
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

// User login
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
        return response.data; // Ensure this returns { token, user }
    } catch (error) {
        console.error('Error logging in:', error);
        throw error.response?.data || { message: 'Login failed. Please try again.' };
    }
};

// Add movie to favorites
export const addFavorite = async (userId, movieId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/favorites`, { user_id: userId, movie_id: movieId });
        return response.data;
    } catch (error) {
        console.error('Error adding to favorites:', error);
        throw error;
    }
};

// Remove movie from favorites
export const removeFavorite = async (userId, movieId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/favorites`, {
            data: { user_id: userId, movie_id: movieId }, // Send data in the request body
        });
        return response.data;
    } catch (error) {
        console.error('Error removing favorite:', error);
        throw error;
    }
};

// Get user’s favorite movies
export const getFavorites = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/favorites/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching favorites:', error);
        throw error;
    }
};

// Add movie to watchlist
export const addToWatchlist = async (userId, movieId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/watchlist`, { user_id: userId, movie_id: movieId });
        return response.data;
    } catch (error) {
        console.error('Error adding to watchlist:', error);
        throw error;
    }
};

// Remove movie from watchlist
export const removeFromWatchlist = async (userId, movieId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/watchlist`, {
            data: { user_id: userId, movie_id: movieId }, // Send data in the request body
        });
        return response.data;
    } catch (error) {
        console.error('Error removing from watchlist:', error);
        throw error;
    }
};

// Get user’s watchlist
export const getWatchlist = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/watchlist/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching watchlist:', error);
        throw error;
    }
};

// Add comment to movie
export const addComment = async (userId, movieId, comment) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/comments`, { user_id: userId, movie_id: movieId, comment });
        return response.data;
    } catch (error) {
        console.error('Error adding comment:', error);
        throw error;
    }
};

// Get comments for a movie
export const getComments = async (movieId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/comments/${movieId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
    }
};
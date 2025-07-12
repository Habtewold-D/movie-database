import axios from 'axios';
import API_BASE_URL from './api';

export const fetchPopularMovies = async (page = 1) => {
    const response = await axios.get(`${API_BASE_URL}/movies/movies`, { params: { page } });
    return response.data;
};

export const searchMovies = async (query) => {
    const response = await axios.get(`${API_BASE_URL}/movies/search`, { params: { query } });
    return response.data;
};

export const fetchMovieDetailsByTmdbId = async (tmdbId) => {
    const response = await axios.get(`${API_BASE_URL}/movies/tmdb/${tmdbId}`);
    return response.data;
}; 
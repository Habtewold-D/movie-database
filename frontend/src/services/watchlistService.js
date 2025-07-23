import axios from 'axios';
import API_BASE_URL from './api';

export const getWatchlist = async (userId) => {
    const response = await axios.get(`${API_BASE_URL}/watchlist/${userId}`);
    return response.data;
};

export const addToWatchlist = async (userId, tmdbId) => {
    const response = await axios.post(`${API_BASE_URL}/watchlist`, { user_id: userId, tmdb_id: tmdbId });
    return response.data;
};

export const removeFromWatchlist = async (userId, movieId) => {
    const response = await axios.delete(`${API_BASE_URL}/watchlist`, {
        data: { user_id: userId, movie_id: movieId }
    });
    return response.data;
}; 
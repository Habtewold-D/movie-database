import axios from 'axios';
import API_BASE_URL from './api';

export const getFavorites = async (userId) => {
    const response = await axios.get(`${API_BASE_URL}/favorites/${userId}`);
    return response.data;
};

export const addFavorite = async (userId, tmdbId, token) => {
    const response = await axios.post(
        `${API_BASE_URL}/favorites`,
        { user_id: userId, tmdb_id: tmdbId },
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
};

export const removeFavorite = async (userId, movieId, token) => {
    const response = await axios.delete(
        `${API_BASE_URL}/favorites`,
        {
            data: { user_id: userId, movie_id: movieId },
            headers: { Authorization: `Bearer ${token}` }
        }
    );
    return response.data;
}; 
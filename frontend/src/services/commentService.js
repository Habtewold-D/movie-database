import axios from 'axios';
import API_BASE_URL from './api';

export const getComments = async (movieId) => {
    const response = await axios.get(`${API_BASE_URL}/comments/${movieId}`);
    return response.data;
};

export const addComment = async (userId, tmdbId, comment, token) => {
    const response = await axios.post(
        `${API_BASE_URL}/comments`,
        { user_id: userId, tmdb_id: tmdbId, comment },
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
}; 
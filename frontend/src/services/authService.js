import axios from 'axios';
import API_BASE_URL from './api';

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error.response?.data || { message: 'Registration failed. Please try again.' };
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
        return response.data; // { token, user }
    } catch (error) {
        console.error('Error logging in:', error);
        throw error.response?.data || { message: 'Login failed. Please try again.' };
    }
}; 
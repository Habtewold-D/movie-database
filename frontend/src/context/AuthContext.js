import React, { createContext, useState, useEffect } from 'react';
import { loginUser } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    // Login function
    const login = async (credentials) => {
        try {
            const { token, user } = await loginUser(credentials);
            localStorage.setItem('token', token); // Store token in localStorage
            setToken(token);
            setUser(user); // Set the user state
        } catch (error) {
            console.error('Login failed:', error);
            throw error; // Propagate the error to the component
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    // Check if the user is authenticated
    const isAuthenticated = () => {
        return !!token;
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
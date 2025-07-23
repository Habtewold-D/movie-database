import React, { createContext, useState, useEffect } from 'react';
import { loginUser, registerUser } from '../services/authService';

const AuthContext = createContext();

function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch {
        return null;
    }
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    // Check token expiry and auto-logout
    useEffect(() => {
        if (token) {
            const payload = parseJwt(token);
            if (payload && payload.exp) {
                const expiry = payload.exp * 1000;
                const now = Date.now();
                if (now >= expiry) {
                    logout();
                } else {
                    const timeout = expiry - now;
                    const timer = setTimeout(() => {
                        logout();
                    }, timeout);
                    return () => clearTimeout(timer);
                }
            }
        }
    }, [token]);

    // Login function
    const login = async (credentials) => {
        try {
            const { token, user } = await loginUser(credentials);
            localStorage.setItem('token', token); // Store token in localStorage
            localStorage.setItem('user', JSON.stringify(user)); // Store user in localStorage
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
        localStorage.removeItem('user');
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
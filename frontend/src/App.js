import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import MovieDetails from './pages/MovieDetails';
import Profile from './pages/Profile';
import Favorites from './pages/Favorites';
import Watchlist from './pages/Watchlist';
import Navbar from './components/Navbar';
import './App.css';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/movie/:id" element={<MovieDetails />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/watchlist" element={<Watchlist />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
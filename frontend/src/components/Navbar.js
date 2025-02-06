import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
    const { user, isAuthenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <span className="logo">🎬 Movies</span> {/* Logo on the left */}
            </div>
            <div className="navbar-right">
                <Link to="/" className="navbar-link">Home</Link>
                <Link to="/favorites" className="navbar-link">Favorites</Link>
                <Link to="/watchlist" className="navbar-link">Watchlist</Link>
                <Link to="/profile" className="navbar-link">Profile</Link>
                {isAuthenticated() ? (
                    <button onClick={handleLogout} className="navbar-link">Logout</button>
                ) : (
                    <Link to="/login" className="navbar-link">Login</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
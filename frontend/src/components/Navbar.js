import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
    const { user, isAuthenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const iconRef = useRef(null);

    const handleLogout = () => {
        logout();
        setShowMenu(false);
        navigate('/login');
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (iconRef.current && !iconRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleIconClick = () => {
        if (isAuthenticated()) {
            setShowMenu((prev) => !prev);
        } else {
            navigate('/login');
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <span className="logo">🎬 Movies</span>
            </div>
            <div className="navbar-right">
                <Link to="/" className="navbar-link">Home</Link>
                <Link to="/favorites" className="navbar-link">Favorites</Link>
                <Link to="/watchlist" className="navbar-link">Watchlist</Link>
                <div ref={iconRef} style={{ position: 'relative', display: 'inline-block' }}>
                    <button
                        onClick={handleIconClick}
                        className="navbar-link"
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '1.15em', // smaller
                            padding: '0 0.5em',
                            verticalAlign: 'middle',
                            color: '#fff', // white icon
                        }}
                        aria-label={isAuthenticated() ? 'User menu' : 'Login'}
                        title={isAuthenticated() ? 'User menu' : 'Login'}
                    >
                        {/* Person icon (Unicode) */}
                        <span role="img" aria-label="person">👤</span>
                    </button>
                    {isAuthenticated() && showMenu && (
                        <div
                            style={{
                                position: 'absolute',
                                right: 0,
                                top: '2.2em',
                                background: '#fff',
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                minWidth: '180px',
                                zIndex: 1000,
                                padding: '1em',
                                textAlign: 'left',
                            }}
                        >
                            <div style={{ fontWeight: 'bold', marginBottom: '0.25em' }}>{user.username}</div>
                            <div style={{ color: '#555', marginBottom: '0.75em', fontSize: '0.95em' }}>{user.email}</div>
                            <button
                                onClick={handleLogout}
                                style={{
                                    width: '100%',
                                    background: '#f44336',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '4px',
                                    padding: '0.5em',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                }}
                            >
                                Logout
                            </button>
                        </div>
                )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
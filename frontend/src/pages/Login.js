import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { registerUser } from '../services/authService';

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

const Login = () => {
    const [isLogin, setIsLogin] = useState(true); // Toggle between login and register
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const { login, token } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        if (token) {
            // Decode token to get user info
            const user = parseJwt(token);
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            // Optionally update AuthContext state if needed
            window.location.replace('/'); // Reload to update context and redirect
        }
    }, [location]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        try {
            if (isLogin) {
                await login({ email, password }); // Call login from AuthContext
                navigate('/'); // Redirect to home after login
            } else {
                // Handle registration
                await registerUser({ username, email, password });
                setIsLogin(true); // Switch to login form after registration
            }
        } catch (error) {
            setError(error.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <div className="login-page">
            <h1>{isLogin ? 'Login' : 'Register'}</h1>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                    />
                )}
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
            </form>
            <button
                className="google-login-btn"
                style={{
                    marginTop: '1em',
                    width: '100%',
                    background: '#fff',
                    color: 'rgba(0,0,0,0.54)',
                    fontWeight: '500',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    padding: '8px',
                    height: '40px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1em',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
                    transition: 'background 0.2s',
                    gap: '0.5em',
                }}
                onClick={() => window.location.href = 'http://localhost:5000/api/auth/google'}
            >
                <svg width="20" height="20" viewBox="0 0 48 48" style={{ display: 'inline', verticalAlign: 'middle' }}>
                    <g>
                        <path fill="#4285F4" d="M24 9.5c3.54 0 6.09 1.53 7.49 2.81l5.54-5.39C33.99 3.61 29.46 1.5 24 1.5 14.98 1.5 7.06 7.73 3.88 15.44l6.44 5.01C12.13 14.01 17.61 9.5 24 9.5z"/>
                        <path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.01l7.19 5.59C43.93 37.13 46.1 31.36 46.1 24.55z"/>
                        <path fill="#FBBC05" d="M10.32 28.45c-1.01-2.9-1.01-6.01 0-8.91l-6.44-5.01C1.56 18.36 0 21.97 0 25.99c0 4.02 1.56 7.63 3.88 10.46l6.44-5.01z"/>
                        <path fill="#EA4335" d="M24 47.5c6.46 0 11.89-2.14 15.85-5.82l-7.19-5.59c-2 1.34-4.56 2.14-8.66 2.14-6.39 0-11.87-4.51-13.68-10.49l-6.44 5.01C7.06 40.27 14.98 47.5 24 47.5z"/>
                        <path fill="none" d="M0 0h48v48H0z"/>
                    </g>
                </svg>
                Continue with Google
            </button>
            <p>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'Register' : 'Login'}
                </button>
            </p>
        </div>
    );
};

export default Login;
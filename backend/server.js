require('dotenv').config();  // Load environment variables

const express = require('express');
const sequelize = require('./config/database');  // Import sequelize instance
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/authRoutes');  // Import routes for user authentication
const movieRoutes = require('./routes/movieRoutes');  // Import movie routes
const favoriteRoutes = require('./routes/favoriteRoutes');  // Import favorite movie routes
const watchlistRoutes = require('./routes/watchlistRoutes');  // Import watchlist routes
const commentRoutes = require('./routes/commentRoutes');  // Import comment routes

// Import all the models
const User = require('./models/User');
const Movie = require('./models/Movie');
const Favorite = require('./models/Favorite');
const Watchlist = require('./models/Watchlist');
const Comment = require('./models/Comment');

// Import middlewares
const authenticateToken = require('./middlewares/authMiddleware');  // For JWT Authentication
const errorHandler = require('./middlewares/errorMiddleware');  // For Error Handling
const syncDatabase = require('./config/syncDatabase');  // To Sync Database Models

const app = express();

// Middleware
app.use(cors());  // Enable CORS (Cross-Origin Resource Sharing)
app.use(bodyParser.json());  // Parse JSON bodies

// Sync Sequelize models with the database (including new models)
syncDatabase();  // Synchronize database models

// Test the database connection
sequelize.authenticate()
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

// Routes
app.use('/api/auth', userRoutes);  // Define routes for user authentication
app.use('/api/movies', movieRoutes);  // Use the movie routes for movie-related API
app.use('/api/favorites', favoriteRoutes);  // Define routes for movie favorites
app.use('/api/watchlist', watchlistRoutes);  // Define routes for movie watchlist
app.use('/api/comments', commentRoutes);  // Define routes for movie comments

// Error Handling Middleware
app.use(errorHandler);  // This should be last, catching any unhandled errors

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

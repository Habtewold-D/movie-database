require('dotenv').config();  // Load environment variables

const express = require('express');
const connectDB = require('./config/database');  // Import Mongoose connection
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/authRoutes');  // Import routes for user authentication
const movieRoutes = require('./routes/movieRoutes');  // Import movie routes
const favoriteRoutes = require('./routes/favoriteRoutes');  // Import favorite movie routes
const watchlistRoutes = require('./routes/watchlistRoutes');  // Import watchlist routes
const commentRoutes = require('./routes/commentRoutes');  // Import comment routes
const chatbotRoutes = require('./routes/chatbotRoutes');

// Import all the models (Mongoose will register them)
require('./models/User');
require('./models/Movie');
require('./models/Favorite');
require('./models/Watchlist');
require('./models/Comment');

// Import middlewares
const authenticateToken = require('./middlewares/authMiddleware');  // For JWT Authentication
const errorHandler = require('./middlewares/errorMiddleware');  // For Error Handling

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());  // Enable CORS (Cross-Origin Resource Sharing)
app.use(bodyParser.json());  // Parse JSON bodies

// Routes
app.use('/api/auth', userRoutes);  // Define routes for user authentication
app.use('/api/movies', movieRoutes);  // Use the movie routes for movie-related API
app.use('/api/favorites', favoriteRoutes);  // Define routes for movie favorites
app.use('/api/watchlist', watchlistRoutes);  // Define routes for movie watchlist
app.use('/api/comments', commentRoutes);  // Define routes for movie comments
app.use('/api/chatbot', chatbotRoutes);

// Error Handling Middleware
app.use(errorHandler);  // This should be last, catching any unhandled errors

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

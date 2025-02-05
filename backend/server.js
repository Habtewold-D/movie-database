require('dotenv').config();  // Load environment variables

const express = require('express');
const sequelize = require('./config/database');  // Import sequelize instance
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/authRoutes');  // Import routes for user authentication
const movieRoutes = require('./routes/movieRoutes');  // Import movie routes

const app = express();

// Middleware
app.use(cors());  // Enable CORS (Cross-Origin Resource Sharing)
app.use(bodyParser.json());  // Parse JSON bodies

// Test the database connection
sequelize.authenticate()
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

// Sync Sequelize models with the database
sequelize.sync()  // This will create the tables based on the models
    .then(() => {
        console.log("Database synced successfully");
    })
    .catch((error) => {
        console.error("Error syncing the database:", error);
    });

// Routes
app.use('/api/auth', userRoutes);  // Define routes for user authentication
app.use('/api/movies', movieRoutes);  // Use the movie routes for movie-related API

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

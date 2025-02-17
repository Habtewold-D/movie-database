const { Sequelize } = require('sequelize');

// Sequelize configuration
const sequelize = new Sequelize(
    process.env.DB_NAME,     // Database name
    process.env.DB_USER,     // User
    process.env.DB_PASSWORD, // Password
    {
        host: process.env.DB_HOST,  // Database host (e.g., localhost)
        dialect: process.env.DB_DIALECT, // Dialect for the database
        logging: false,             // Optionally disable SQL logging
    }
);

module.exports = sequelize;

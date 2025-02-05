const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,     // Database name
    process.env.DB_USER,     // User
    process.env.DB_PASSWORD, // Password
    {
        host: process.env.DB_HOST,  // Database host (e.g., localhost)
        dialect: 'mysql',           // Dialect for the database
        logging: false,             // Optionally disable SQL logging
    }
);

sequelize.authenticate()
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

module.exports = sequelize;

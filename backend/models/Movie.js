// backend/models/Movie.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // Import sequelize instance

const Movie = sequelize.define('Movie', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    overview: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    release_date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    poster_path: {
        type: DataTypes.STRING,
        allowNull: true
    },
    rating: {
        type: DataTypes.DECIMAL,
        allowNull: true
    }
});

module.exports = Movie;

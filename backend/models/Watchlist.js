// backend/models/Watchlist.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Movie = require('./Movie');

const Watchlist = sequelize.define('Watchlist', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    movie_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Movie,
            key: 'id'
        }
    }
});

module.exports = Watchlist;

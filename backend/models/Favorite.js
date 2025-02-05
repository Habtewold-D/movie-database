const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Movie = require('./Movie');

const Favorite = sequelize.define('Favorite', {
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
    },
});

module.exports = Favorite;

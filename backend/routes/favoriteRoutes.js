const express = require('express');
const favoriteController = require('../controllers/favoriteController');
const authenticateToken = require('../middlewares/authMiddleware');
const router = express.Router();

// Add movie to favorites
router.post('/', authenticateToken, favoriteController.addFavorite);

// Remove movie from favorites
router.delete('/', authenticateToken, favoriteController.removeFavorite);

// Get user’s favorite movies
router.get('/:user_id', favoriteController.getFavorites);

module.exports = router;
const express = require('express');
const favoriteController = require('../controllers/favoriteController'); // Import controller
const router = express.Router();

// Add movie to favorites
router.post('/', favoriteController.addFavorite);

// Get user’s favorite movies
router.get('/:user_id', favoriteController.getFavorites);

module.exports = router;

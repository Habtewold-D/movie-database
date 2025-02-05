const express = require('express');
const watchlistController = require('../controllers/watchlistController'); // Import controller
const router = express.Router();

// Add movie to watchlist
router.post('/', watchlistController.addWatchlist);

// Get user’s watchlist
router.get('/:user_id', watchlistController.getWatchlist);

module.exports = router;

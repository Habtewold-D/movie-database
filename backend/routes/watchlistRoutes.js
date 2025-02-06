const express = require('express');
const watchlistController = require('../controllers/watchlistController');
const authenticateToken = require('../middlewares/authMiddleware');
const router = express.Router();

// Add movie to watchlist
router.post('/', authenticateToken, watchlistController.addToWatchlist);

// Remove movie from watchlist
router.delete('/', authenticateToken, watchlistController.removeFromWatchlist);

// Get user’s watchlist
router.get('/:user_id', watchlistController.getWatchlist);

module.exports = router;
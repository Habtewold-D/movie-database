const express = require('express');
const commentController = require('../controllers/commentController');
const authenticateToken = require('../middlewares/authMiddleware');
const router = express.Router();

// Add comment to movie
router.post('/', authenticateToken, commentController.addComment);

// Get comments for a movie
router.get('/:movie_id', commentController.getComments);

module.exports = router;
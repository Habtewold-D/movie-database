const express = require('express');
const commentController = require('../controllers/commentController'); // Import controller
const router = express.Router();

// Add comment to movie
router.post('/', commentController.addComment);

// Get comments for a movie
router.get('/:movie_id', commentController.getComments);

module.exports = router;

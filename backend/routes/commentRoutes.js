const express = require('express');
const Comment = require('../models/Comment');
const router = express.Router();

// Add comment to movie
router.post('/', async (req, res) => {
    const { user_id, movie_id, comment } = req.body;
    try {
        const newComment = await Comment.create({ user_id, movie_id, comment });
        res.status(201).json(newComment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to add comment' });
    }
});

// Get comments for a movie
router.get('/:movie_id', async (req, res) => {
    const movieId = req.params.movie_id;
    try {
        const comments = await Comment.findAll({ where: { movie_id: movieId } });
        res.json(comments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch comments' });
    }
});

module.exports = router;

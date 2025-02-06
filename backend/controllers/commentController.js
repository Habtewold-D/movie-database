const Comment = require('../models/Comment');
const User = require('../models/User');
const Movie = require('../models/Movie');

// Add comment to movie
exports.addComment = async (req, res) => {
    const { user_id, movie_id, comment } = req.body;

    // Check if movie and user exist
    const user = await User.findByPk(user_id);
    const movie = await Movie.findByPk(movie_id);

    if (!user || !movie) {
        return res.status(400).json({ message: 'User or Movie not found' });
    }

    try {
        const newComment = await Comment.create({ user_id, movie_id, comment });
        res.status(201).json(newComment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to add comment' });
    }
};

// Get comments for a movie
exports.getComments = async (req, res) => {
    const movieId = req.params.movie_id;
    try {
        const comments = await Comment.findAll({ where: { movie_id: movieId } });
        res.json(comments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch comments' });
    }
};
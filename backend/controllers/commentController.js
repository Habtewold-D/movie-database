const Comment = require('../models/Comment');
const User = require('../models/User');
const Movie = require('../models/Movie');
const axios = require('axios');
const mongoose = require('mongoose');

const MOVIE_API_KEY = process.env.MOVIE_DATABASE_API_KEY;
const MOVIE_API_URL = process.env.MOVIE_DATABASE_API_URL;

// Add comment to movie
exports.addComment = async (req, res) => {
    const { user_id, tmdb_id, comment } = req.body;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
        return res.status(400).json({ message: 'Invalid user_id' });
    }
    if (!tmdb_id || isNaN(Number(tmdb_id))) {
        return res.status(400).json({ message: 'Invalid tmdb_id' });
    }

    // Check if user exists
    const user = await User.findById(user_id);
    if (!user) return res.status(400).json({ message: 'User not found' });

    // Check if movie exists in local DB
    let movie = await Movie.findOne({ tmdb_id: Number(tmdb_id) });
    if (!movie) {
        // Fetch from TMDB
        try {
            const tmdbRes = await axios.get(`${MOVIE_API_URL}/movie/${tmdb_id}`, {
                params: { api_key: MOVIE_API_KEY, language: 'en-US' }
            });
            // Save to local DB
            movie = await Movie.create({
                tmdb_id: Number(tmdb_id),
                title: tmdbRes.data.title,
                overview: tmdbRes.data.overview,
                release_date: tmdbRes.data.release_date,
                poster_path: tmdbRes.data.poster_path,
                rating: tmdbRes.data.vote_average
            });
        } catch (err) {
            return res.status(500).json({ message: 'Failed to fetch movie from TMDB' });
        }
    }

    try {
        const newComment = await Comment.create({ user_id, movie_id: movie._id, comment });
        res.status(201).json(newComment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to add comment' });
    }
};

// Get comments for a movie
exports.getComments = async (req, res) => {
    const movieId = req.params.movie_id;
    if (!mongoose.Types.ObjectId.isValid(movieId)) {
        return res.status(400).json({ message: 'Invalid movie_id' });
    }
    try {
        // Populate user and movie details
        const comments = await Comment.find({ movie_id: movieId }).populate('user_id').populate('movie_id');
        res.json(comments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch comments' });
    }
};
const Favorite = require('../models/Favorite');
const User = require('../models/User');
const Movie = require('../models/Movie');
const axios = require('axios');
const mongoose = require('mongoose');

const MOVIE_API_KEY = process.env.MOVIE_DATABASE_API_KEY;
const MOVIE_API_URL = process.env.MOVIE_DATABASE_API_URL;

// Add movie to favorites
exports.addFavorite = async (req, res) => {
    const { user_id, tmdb_id } = req.body; // Accept tmdb_id from frontend

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

    // Check if already in favorites
    const existingFavorite = await Favorite.findOne({ user_id, movie_id: movie._id });
    if (existingFavorite) {
        return res.status(400).json({ message: 'Movie already in favorites' });
    }

    // Add to favorites
    const favorite = await Favorite.create({ user_id, movie_id: movie._id });
    res.status(201).json(favorite);
};

// Remove movie from favorites
exports.removeFavorite = async (req, res) => {
    const { user_id, movie_id } = req.body;

    if (!mongoose.Types.ObjectId.isValid(user_id) || !mongoose.Types.ObjectId.isValid(movie_id)) {
        return res.status(400).json({ message: 'Invalid user_id or movie_id' });
    }

    try {
        const favorite = await Favorite.findOne({ user_id, movie_id });

        if (!favorite) {
            return res.status(404).json({ message: 'Favorite not found' });
        }

        await Favorite.deleteOne({ user_id, movie_id });
        res.status(200).json({ message: 'Favorite removed successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to remove favorite' });
    }
};

// Get user’s favorite movies
exports.getFavorites = async (req, res) => {
    const userId = req.params.user_id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user_id' });
    }
    try {
        // Populate movie details
        const favorites = await Favorite.find({ user_id: userId }).populate('movie_id');
        res.json(favorites);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch favorites' });
    }
};
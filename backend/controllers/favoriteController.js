const Favorite = require('../models/Favorite');
const User = require('../models/User');
const Movie = require('../models/Movie');

// Add movie to favorites
exports.addFavorite = async (req, res) => {
    const { user_id, movie_id } = req.body;

    // Check if movie and user exist
    const user = await User.findById(user_id);
    const movie = await Movie.findById(movie_id);

    if (!user || !movie) {
        return res.status(400).json({ message: 'User or Movie not found' });
    }

    try {
        // Check if the movie is already in favorites
        const existingFavorite = await Favorite.findOne({ user_id, movie_id });

        if (existingFavorite) {
            return res.status(400).json({ message: 'Movie already in favorites' });
        }

        const favorite = await Favorite.create({ user_id, movie_id });
        res.status(201).json(favorite);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to add to favorites' });
    }
};

// Remove movie from favorites
exports.removeFavorite = async (req, res) => {
    const { user_id, movie_id } = req.body;

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
    try {
        const favorites = await Favorite.find({ user_id: userId });
        res.json(favorites);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch favorites' });
    }
};
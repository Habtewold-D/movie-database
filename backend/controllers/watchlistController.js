const Watchlist = require('../models/Watchlist');
const User = require('../models/User');
const Movie = require('../models/Movie');

// Add movie to watchlist
exports.addWatchlist = async (req, res) => {
    const { user_id, movie_id } = req.body;

    // Check if movie and user exist
    const user = await User.findByPk(user_id);
    const movie = await Movie.findByPk(movie_id);

    if (!user || !movie) {
        return res.status(400).json({ message: 'User or Movie not found' });
    }

    try {
        const watchlistItem = await Watchlist.create({ user_id, movie_id });
        res.status(201).json(watchlistItem);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to add to watchlist' });
    }
};

// Get user’s watchlist
exports.getWatchlist = async (req, res) => {
    const userId = req.params.user_id;
    try {
        const watchlist = await Watchlist.findAll({ where: { user_id: userId } });
        res.json(watchlist);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch watchlist' });
    }
};

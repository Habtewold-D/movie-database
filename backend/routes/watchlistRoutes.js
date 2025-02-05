const express = require('express');
const Watchlist = require('../models/Watchlist');
const router = express.Router();

// Add movie to watchlist
router.post('/', async (req, res) => {
    const { user_id, movie_id } = req.body;
    try {
        const watchlistItem = await Watchlist.create({ user_id, movie_id });
        res.status(201).json(watchlistItem);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to add to watchlist' });
    }
});

// Get user’s watchlist
router.get('/:user_id', async (req, res) => {
    const userId = req.params.user_id;
    try {
        const watchlist = await Watchlist.findAll({ where: { user_id: userId } });
        res.json(watchlist);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch watchlist' });
    }
});

module.exports = router;

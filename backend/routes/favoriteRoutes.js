const express = require('express');
const Favorite = require('../models/Favorite');
const router = express.Router();

// Add movie to favorites
router.post('/', async (req, res) => {
    const { user_id, movie_id } = req.body;
    try {
        const favorite = await Favorite.create({ user_id, movie_id });
        res.status(201).json(favorite);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to add to favorites' });
    }
});

// Get user’s favorite movies
router.get('/:user_id', async (req, res) => {
    const userId = req.params.user_id;
    try {
        const favorites = await Favorite.findAll({ where: { user_id: userId } });
        res.json(favorites);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch favorites' });
    }
});

module.exports = router;

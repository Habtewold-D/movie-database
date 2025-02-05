const express = require('express');
const axios = require('axios');
const router = express.Router();

const MOVIE_API_KEY = process.env.MOVIE_DATABASE_API_KEY;
const MOVIE_API_URL = process.env.MOVIE_DATABASE_API_URL;

// Fetch popular movies from TMDB
router.get('/movies', async (req, res) => {
    try {
        const response = await axios.get(`${MOVIE_API_URL}/movie/popular`, {
            params: {
                api_key: MOVIE_API_KEY,
                language: 'en-US',
                page: 1
            }
        });

        const movies = response.data.results;
        res.json(movies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch movies' });
    }
});

// Search movies
router.get('/search', async (req, res) => {
    const query = req.query.query;

    if (!query) {
        return res.status(400).json({ message: 'Search query is required' });
    }

    try {
        const response = await axios.get(`${MOVIE_API_URL}/search/movie`, {
            params: {
                api_key: MOVIE_API_KEY,
                query,
                language: 'en-US',
                page: 1,
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error searching movies:', error);
        res.status(500).json({ error: 'Failed to search movies' });
    }
});

module.exports = router;

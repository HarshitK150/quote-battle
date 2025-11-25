const express = require('express');
const router = express.Router();
const quoteController = require('../controllers/quoteController');

// GET /api/quotes/random-pair
router.get('/random-pair', quoteController.getRandomPair);

// POST /api/quotes/vote
router.post('/vote', quoteController.vote);

// GET /api/quotes/leaderboard
router.get('/leaderboard', quoteController.getLeaderboard);

// POST /api/quotes/
router.post('/', quoteController.addQuote);

module.exports = router;
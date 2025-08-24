const { readQuotes, writeQuotes } = require('../utils/fileHandler');
const { v4: uuidv4 } = require('uuid');

// GET /api/quotes/random-pair
exports.getRandomPair = (req, res) => {
  const quotes = readQuotes();

  if (quotes.length < 2) {
    return res.status(400).json({ error: 'Not enough quotes to generate a pair.' });
  }

  const shuffled = quotes.sort(() => 0.5 - Math.random());
  const pair = shuffled.slice(0, 2);
  res.json(pair);
};

// POST /api/quotes/vote
exports.vote = (req, res) => {
  const { winnerId, loserId } = req.body;

  if (!winnerId || !loserId) {
    return res.status(400).json({ error: 'Both winnerId and loserId are required.' });
  }

  const quotes = readQuotes();
  const winner = quotes.find(q => q.id === winnerId);
  const loser = quotes.find(q => q.id === loserId);

  if (!winner || !loser) {
    return res.status(404).json({ error: 'Quote not found.' });
  }

  winner.wins = (winner.wins || 0) + 1;
  loser.losses = (loser.losses || 0) + 1;

  writeQuotes(quotes);
  res.json({ success: true });
};

// GET /api/quotes/leaderboard
exports.getLeaderboard = (req, res) => {
  const quotes = readQuotes();

  const sorted = quotes
    .map(q => ({
      ...q,
      ratio: (q.wins || 0) / ((q.wins || 0) + (q.losses || 0) || 1),
    }))
    .sort((a, b) => b.ratio - a.ratio)
    .slice(0, 10); // top 10

  res.json(sorted);
};

// POST /api/quotes
exports.addQuote = (req, res) => {
  const { text } = req.body;

  if (!text || text.trim() === '') {
    return res.status(400).json({ error: 'Quote text is required.' });
  }

  const quotes = readQuotes();

  const newQuote = {
    id: uuidv4(),
    text: text.trim(),
    wins: 0,
    losses: 0,
  };

  quotes.push(newQuote);
  writeQuotes(quotes);

  res.status(201).json({ success: true, id: newQuote.id });
};

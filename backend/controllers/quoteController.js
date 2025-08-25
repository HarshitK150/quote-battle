const { readQuotes, writeQuote, updateQuotes } = require('../utils/dbHandler');
const { v4: uuidv4 } = require('uuid');

// GET /api/quotes/random-pair
exports.getRandomPair = async (req, res) => {
  try {
    const quotes = await readQuotes();

    if (quotes.length < 2) {
      return res.status(400).json({ error: 'Not enough quotes to generate a pair.' });
    }

    const shuffled = quotes.sort(() => 0.5 - Math.random());
    const pair = shuffled.slice(0, 2);
    res.json(pair);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch quotes.' });
  }
};

// POST /api/quotes/vote
exports.vote = async (req, res) => {
  const { winnerId, loserId } = req.body;

  if (!winnerId || !loserId) {
    return res.status(400).json({ error: 'Both winnerId and loserId are required.' });
  }

  try {
    const quotes = await readQuotes();

    const winner = quotes.find(q => q.id === winnerId);
    const loser = quotes.find(q => q.id === loserId);

    if (!winner || !loser) {
      return res.status(404).json({ error: 'Quote not found.' });
    }

    winner.wins = (winner.wins || 0) + 1;
    loser.losses = (loser.losses || 0) + 1;

    await updateQuotes([winner, loser]);

    res.json({ success: true });
  } catch (err) {
    console.error('Error inserting quote:', err);
    res.status(500).json({ error: err.message });
  }
};

// GET /api/quotes/leaderboard
exports.getLeaderboard = async (req, res) => {
  try {
    const quotes = await readQuotes();

    const sorted = quotes
      .map(q => ({
        ...q,
        ratio: (q.wins || 0) / ((q.wins || 0) + (q.losses || 0) || 1),
      }))
      .sort((a, b) => b.ratio - a.ratio)
      .slice(0, 10); // top 10

    res.json(sorted);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load leaderboard.' });
  }
};

// POST /api/quotes
exports.addQuote = async (req, res) => {
  const { text } = req.body;

  if (!text || text.trim() === '') {
    return res.status(400).json({ error: 'Quote text is required.' });
  }

  const newQuote = {
    id: uuidv4(),
    text: text.trim(),
    wins: 0,
    losses: 0,
  };

  try {
    await writeQuote(newQuote);
    res.status(201).json({ success: true, id: newQuote.id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add quote.' });
  }
};
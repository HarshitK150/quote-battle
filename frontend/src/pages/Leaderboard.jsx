import { useEffect, useState } from 'react';
import axios from '../lib/axios';

const Leaderboard = () => {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    axios.get('/api/quotes/leaderboard')
      .then(res => setQuotes(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="flex flex-col items-center justify-start min-h-[60vh]">
      <h2 className="text-3xl font-bold mb-6">🏆 Top Quotes</h2>
      <ul className="space-y-4 w-full max-w-2xl">
        {quotes.map((q, index) => (
          <li
            key={q.id}
            className="bg-gray-800 p-4 rounded-lg shadow-md"
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold text-purple-300">#{index + 1}</span>
              <span className="text-sm text-gray-400">Win Rate: {((q.ratio || 0) * 100).toFixed(1)}%</span>
            </div>
            <p className="mt-2 text-lg italic">“{q.text}”</p>
            <p className="text-sm text-gray-500 mt-1">
              Wins: {q.wins} | Losses: {q.losses}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
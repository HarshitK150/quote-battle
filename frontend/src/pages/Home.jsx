import { useEffect, useState } from 'react';
import QuoteCard from '../components/QuoteCard';
import axios from '../lib/axios';

const Home = () => {
  const [pair, setPair] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPair = async () => {
    try {
      const res = await axios.get('/api/quotes/random-pair');
      setPair(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPair();
  }, []);

  const handleVote = async (winnerId) => {
    const loserId = pair.find(q => q.id !== winnerId).id;
    await axios.post('/api/quotes/vote', { winnerId, loserId });
    fetchPair();
  };

  if (loading || pair.length < 2) return <p className="text-center">Loading quotes...</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h2 className="text-3xl font-bold mb-8">🔥 Which quote is better?</h2>
      <div className="flex flex-col md:flex-row gap-6 justify-center">
        {pair.map(q => (
          <QuoteCard key={q.id} quote={q} onClick={handleVote} />
        ))}
      </div>
    </div>
  );
};

export default Home;
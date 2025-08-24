import { useState } from 'react';
import axios from 'axios';

const SubmitQuote = () => {
  const [text, setText] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      await axios.post('/api/quotes', { text });
      setMessage('✅ Quote added!');
      setText('');
    } catch {
      setMessage('❌ Failed to add quote.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">➕ Submit a Quote</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            rows="4"
            placeholder="Enter your legendary quote..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 transition p-3 rounded-md font-semibold"
          >
            Submit Quote
          </button>
          {message && <p className="text-center mt-2">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default SubmitQuote;
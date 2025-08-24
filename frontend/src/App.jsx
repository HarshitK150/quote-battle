import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import SubmitQuote from './pages/SubmitQuote';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <nav className="backdrop-blur-md bg-gray-900/80 shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex-shrink-0">
                <a href="/" className="text-2xl font-bold text-purple-400 hover:text-purple-300 transition duration-300">
                  🧠 QuoteBattle
                </a>
              </div>
              <div className="flex flex-row space-x-6 text-white text-lg">
                <a href="/" className="hover:text-purple-400 transition">Home</a>
                <a href="/leaderboard" className="hover:text-purple-400 transition">Leaderboard</a>
                <a href="/submit" className="hover:text-purple-400 transition">Submit</a>
              </div>
            </div>
          </div>
        </nav>


        <main className="flex-1 flex flex-col items-center justify-start p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/submit" element={<SubmitQuote />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
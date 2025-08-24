const QuoteCard = ({ quote, onClick }) => (
    <div
      onClick={() => onClick(quote.id)}
      className="bg-gray-800 hover:bg-purple-700 hover:scale-105 transition-all text-white p-6 rounded-xl shadow-lg cursor-pointer max-w-md w-full m-4"
    >
      <p className="text-lg italic">“{quote.text}”</p>
    </div>
  );
  
  export default QuoteCard;
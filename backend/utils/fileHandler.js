const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/quotes.json');

exports.readQuotes = () => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]', 'utf-8');
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

exports.writeQuotes = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};
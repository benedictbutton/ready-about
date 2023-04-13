const mongoose = require('mongoose');

const WordSchema = new mongoose.Schema({
  id: { type: String },
  text: {
    type: String,
  },
  created: { type: Date, default: Date.now },
});

const Word = mongoose.model('Word', WordSchema);
module.exports = Word;

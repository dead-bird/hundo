const mongoose = require('mongoose');

let schema = new mongoose.Schema({
  words: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Words', schema);

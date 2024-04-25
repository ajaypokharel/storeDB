const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  user_id: String,
  query: String,
  file_used: String,
  result: Object,
});

module.exports = mongoose.model('Session', sessionSchema);

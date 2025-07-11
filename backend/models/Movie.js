const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  tmdb_id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  overview: { type: String },
  release_date: { type: Date },
  poster_path: { type: String },
  rating: { type: Number },
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);

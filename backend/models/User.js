const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  username: { type: String, required: true },
  googleId: { type: String }, // Optional, for Google OAuth users
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  image: String,
  rating: { type: Number, default: 0 },
  playedCount: { type: Number, default: 0 }
});

module.exports = mongoose.model("Category", categorySchema);

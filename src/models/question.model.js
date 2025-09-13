const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
  text: String,
  options: [String],
  correctIndex: Number
});

module.exports = mongoose.model("Question", questionSchema);

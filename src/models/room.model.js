const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomCode: { type: String, unique: true },
  host: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  scores: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      points: { type: Number, default: 0 }
    }
  ],
  status: { type: String, enum: ["waiting", "ongoing", "finished"], default: "waiting" }
});

module.exports = mongoose.model("Room", roomSchema);

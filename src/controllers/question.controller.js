const Question = require("../models/question.model");
const Room = require("../models/room.model");

exports.addQuestion = async (req, res) => {
  const { roomId, text, options, correctIndex } = req.body;
  const question = new Question({ room: roomId, text, options, correctIndex });
  await question.save();

  const room = await Room.findById(roomId);
  room.questions.push(question._id);
  await room.save();

  res.json({ message: "Question added" });
};

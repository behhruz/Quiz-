const { Server } = require("socket.io");
const Room = require("./models/room.model");
const Question = require("./models/question.model");

function socketSetup(server) {
  const io = new Server(server, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join-room", async ({ roomCode, userId }) => {
      socket.join(roomCode);
      io.to(roomCode).emit("user-joined", { userId });
    });

    socket.on("start-quiz", (roomCode) => {
      io.to(roomCode).emit("quiz-started");
    });

    socket.on("submit-answer", async ({ roomCode, userId, questionId, answerIndex }) => {
      const question = await Question.findById(questionId);
      const room = await Room.findOne({ roomCode });

      if (!question || !room) return;

      let correct = false;
      if (question.correctIndex === answerIndex) {
        correct = true;
        const scoreObj = room.scores.find(s => s.user.toString() === userId);
        if (scoreObj) {
          scoreObj.points += 10;
        }
        await room.save();
      }

      io.to(roomCode).emit("answer-result", { userId, correct });
    });

    socket.on("get-leaderboard", async (roomCode) => {
      const room = await Room.findOne({ roomCode }).populate("scores.user", "username");
      if (!room) return;
      const leaderboard = room.scores
        .sort((a, b) => b.points - a.points)
        .map((s, i) => ({
          place: i + 1,
          user: s.user.username,
          points: s.points
        }));
      io.to(roomCode).emit("leaderboard", leaderboard);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
}

module.exports = socketSetup;

const Room = require("../models/room.model");

exports.createRoom = async (req, res) => {
  const { hostId } = req.body;
  const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
  const room = new Room({ host: hostId, roomCode });
  await room.save();
  res.json({ roomCode });
};

exports.joinRoom = async (req, res) => {
  const { userId, roomCode } = req.body;
  const room = await Room.findOne({ roomCode });
  if (!room) return res.status(404).json({ error: "Room not found" });

  if (!room.participants.includes(userId)) {
    room.participants.push(userId);
    room.scores.push({ user: userId, points: 0 });
    await room.save();
  }

  res.json({ message: "Joined", roomId: room._id });
};

exports.getLeaderboard = async (req, res) => {
  const { roomCode } = req.params;
  const room = await Room.findOne({ roomCode }).populate("scores.user", "username");
  if (!room) return res.status(404).json({ error: "Room not found" });

  const leaderboard = room.scores
    .sort((a, b) => b.points - a.points)
    .map((s, i) => ({
      place: i + 1,
      user: s.user.username,
      points: s.points
    }));

  res.json(leaderboard);
};

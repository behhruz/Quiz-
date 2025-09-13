const express = require("express");
const { createRoom, joinRoom, getLeaderboard } = require("../controllers/room.controller");
const router = express.Router();

router.post("/create", createRoom);
router.post("/join", joinRoom);
router.get("/:roomCode/leaderboard", getLeaderboard);

module.exports = router;

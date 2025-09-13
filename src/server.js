const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const roomRoutes = require("./routes/room.routes");
const questionRoutes = require("./routes/question.routes");
const socketSetup = require("./socket");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/room", roomRoutes);
app.use("/question", questionRoutes);

mongoose.connect("mongodb+srv://bsotimboyev10_db_user:PTS8F9VjGoXSvlBH@cluster0.d5fhs8j.mongodb.net/")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const server = http.createServer(app);
socketSetup(server);

server.listen(5000, () => console.log("Server running on port 5000"));


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const authRoutes = require("./routes/auth.routes");
const roomRoutes = require("./routes/room.routes");
const questionRoutes = require("./routes/question.routes");

const app = express();
app.use(express.json());
app.use(cors());

// Swagger
const swaggerDocument = YAML.load(__dirname + "/docs/swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/auth", authRoutes);
app.use("/room", roomRoutes);
app.use("/question", questionRoutes);

const PORT = process.env.PORT || 5000;

// MongoDB ulash
mongoose

    .connect( "mongodb+srv://bsotimboyev10_db_user:Ub0ervsVvTOotGAk@cluster0.oczjloo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("✅ MongoDB connected");
        app.listen(PORT, () =>
            console.log(`🚀 Server running on http://localhost:${PORT}`)
        );
    })
    .catch((err) => console.error("❌ MongoDB connection error:", err.message));



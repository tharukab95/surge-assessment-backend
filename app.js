const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// const db = require("./models");
const authRoutes = require("./src/routes/authRoutes");
const laureatesRoutes = require("./src/routes/laureatesRoutes");
const commentsRoutes = require("./src/routes/commentsRoutes");
// const mongodbConnect = require("./config/db");
require("dotenv").config();

const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

app.use(express.json());

mongoose.connect(
  "mongodb+srv://tharukabandara95:Dragon102824@cluster0.fybweur.mongodb.net/assessment",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB Atlas");
});

app.use(express.urlencoded({ extended: true }));

// db.sequelize
//   .sync({ force: true })
//   .then(() => {
//     console.log("Synced database.");
//   })
//   .catch((err) => {
//     console.log("Failed to sync database: " + err.message);
//   });

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/api", laureatesRoutes);
app.use("/api", commentsRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

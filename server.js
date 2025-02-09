require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");
const taskRoutes = require("./src/routes/taskRoutes");
const userRoutes = require("./src/routes/userRoutes");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello there");
});
app.use("/tasks", taskRoutes);
app.use("/user", userRoutes);
const PORT = process.env.PORT || 5000;
connectDB();
app.listen(PORT, () => {
  console.log(`Server Started successfully and running on port ${PORT}`);
});

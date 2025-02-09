const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.userId });
    return res.status(200).json(tasks);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const data = req.body;
    data.userId = req.user.userId;
    const task = await Task.create(data);
    return res.status(201).json(task);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found!" });
    }
    const data = req.body;
    Object.keys(data).forEach((key) => {
      if (data[key] === null) delete data[key];
      else task[key] = data[key];
    });
    await task.save();
    return res.status(200).json(task);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });
    return res.status(200).json({ message: "Data deleted successfully" });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});
module.exports = router;

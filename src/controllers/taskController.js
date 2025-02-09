const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.userId });
    return res.status(200).json(tasks);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const createTask = async (req, res) => {
  try {
    const data = req.body;
    data.userId = req.user.userId;
    const task = await Task.create(data);
    return res.status(201).json(task);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found!" });
    }
    const data = req.body;
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null) task[key] = value;
    });
    await task.save();
    return res.status(200).json(task);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
module.exports = { getAllTasks, createTask, updateTask, deleteTask };

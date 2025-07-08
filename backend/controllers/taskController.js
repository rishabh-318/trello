const Task = require("../models/Task");

// ✅ Get all tasks for a specific board
exports.getTasksByBoard = async (req, res) => {
  try {
    const { id } = req.params; // board ID
    const tasks = await Task.find({ boardId: id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Create a task for a specific board
exports.createTask = async (req, res) => {
  try {
    const { id } = req.params; // board ID
    const taskData = { ...req.body, boardId: id };
    const task = new Task(taskData);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Update a task by task ID
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params; // task ID
    const task = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Delete a task by task ID
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params; // task ID
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

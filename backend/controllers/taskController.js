const Task = require("../models/Task");

// ✅ Fetch all tasks for a specific board
exports.getTasksByBoard = async (req, res) => {
  try {
    const { id } = req.params; // board ID
    const tasks = await Task.find({ boardId: id }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    console.error("❌ Error fetching tasks:", error);
    res.status(500).json({ error: "Server error while fetching tasks." });
  }
};

// ✅ Create a new task under a board
exports.createTask = async (req, res) => {
  try {
    const { id } = req.params; // board ID
    const taskData = { ...req.body, boardId: id };

    const task = new Task(taskData);
    await task.save();

    res.status(201).json(task);
  } catch (error) {
    console.error("❌ Error creating task:", error);
    res.status(400).json({ error: "Failed to create task. Check inputs." });
  }
};

// ✅ Update a task by its task ID
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params; // task ID
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found." });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("❌ Error updating task:", error);
    res.status(400).json({ error: "Failed to update task. Check inputs." });
  }
};

// ✅ Delete a task by its task ID
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params; // task ID
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found." });
    }

    res.status(200).json({ message: "Task deleted successfully." });
  } catch (error) {
    console.error("❌ Error deleting task:", error);
    res.status(500).json({ error: "Server error while deleting task." });
  }
};

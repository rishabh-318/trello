const express = require("express");
const router = express.Router();
const {
  getTasksByBoard,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router.get("/boards/:id/tasks", getTasksByBoard);
router.post("/boards/:id/tasks", createTask);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

module.exports = router;

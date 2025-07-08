// src/api/tasks.js
const API_BASE = "http://localhost:5000";

export const fetchTasksForBoard = async (boardId) => {
  const res = await fetch(`${API_BASE}/boards/${boardId}/tasks`);
  return res.json();
};

export const createTask = async (boardId, taskData) => {
  const res = await fetch(`${API_BASE}/boards/${boardId}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(taskData),
  });
  return res.json();
};

export const updateTask = async (taskId, updatedData) => {
  const res = await fetch(`${API_BASE}/tasks/${taskId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  return res.json();
};

export const deleteTask = async (taskId) => {
  await fetch(`${API_BASE}/tasks/${taskId}`, { method: "DELETE" });
};

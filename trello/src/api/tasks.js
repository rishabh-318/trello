const API_BASE = process.env.REACT_APP_BASE_URL;

// Centralized response checker
const checkResponse = async (res) => {
  if (!res.ok) {
    let errorData = {};
    try {
      errorData = await res.json();
    } catch {
      errorData.error = "Unknown error";
    }
    throw new Error(errorData.error || "API request failed");
  }

  try {
    return await res.json();
  } catch {
    return {}; // fallback for DELETE with no body
  }
};

// GET all tasks for a board
export const fetchTasksForBoard = async (boardId) => {
  const res = await fetch(`${API_BASE}/boards/${boardId}/tasks`);
  return checkResponse(res);
};

// POST a new task to a board
export const createTask = async (boardId, taskData) => {
  const res = await fetch(`${API_BASE}/boards/${boardId}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(taskData),
  });
  return checkResponse(res);
};

// PUT update task by ID
export const updateTask = async (taskId, updatedData) => {
  const res = await fetch(`${API_BASE}/tasks/${taskId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  return checkResponse(res);
};

// DELETE task by ID
export const deleteTask = async (taskId) => {
  const res = await fetch(`${API_BASE}/tasks/${taskId}`, {
    method: "DELETE",
  });
  return checkResponse(res); // returns {} if no JSON body
};

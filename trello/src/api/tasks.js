const API_BASE = process.env.REACT_APP_BASE_URL;

const checkResponse = async (res) => {
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: "Unknown error" }));
    throw new Error(error?.error || "API request failed");
  }
  return res.json();
};

export const fetchTasksForBoard = async (boardId) => {
  const res = await fetch(`${API_BASE}/boards/${boardId}/tasks`);
  return checkResponse(res);
};

export const createTask = async (boardId, taskData) => {
  const res = await fetch(`${API_BASE}/boards/${boardId}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });
  return checkResponse(res);
};

export const updateTask = async (taskId, updatedData) => {
  const res = await fetch(`${API_BASE}/tasks/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });
  return checkResponse(res);
};

export const deleteTask = async (taskId) => {
  const res = await fetch(`${API_BASE}/tasks/${taskId}`, {
    method: "DELETE",
  });
  return checkResponse(res);
};

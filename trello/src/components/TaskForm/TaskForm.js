// src/components/TaskForm/TaskForm.js
import React, { useState } from "react";
import { createTask } from "../../api/tasks";
import "../../styles/task.css";

const TaskForm = ({ boardId, onTaskCreated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    status: "To Do",
    priority: "Medium",
    assignedTo: "",
    dueDate: "",
  });

  const handleSubmit = async () => {
    if (!taskData.title.trim()) return;
    const newTask = await createTask(boardId, taskData);
    onTaskCreated(newTask);
    setTaskData({
      title: "",
      description: "",
      status: "To Do",
      priority: "Medium",
      assignedTo: "",
      dueDate: "",
    });
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button className="btn btn-success" onClick={() => setIsOpen(true)}>
        + Add New Task
      </button>
    );
  }

  return (
    <div className="form-container">
      <input
        type="text"
        placeholder="Title"
        value={taskData.title}
        onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
      />
      <textarea
        placeholder="Description"
        value={taskData.description}
        onChange={(e) =>
          setTaskData({ ...taskData, description: e.target.value })
        }
      />
      <select
        value={taskData.status}
        onChange={(e) => setTaskData({ ...taskData, status: e.target.value })}
      >
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <select
        value={taskData.priority}
        onChange={(e) => setTaskData({ ...taskData, priority: e.target.value })}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <input
        type="text"
        placeholder="Assigned to"
        value={taskData.assignedTo}
        onChange={(e) =>
          setTaskData({ ...taskData, assignedTo: e.target.value })
        }
      />
      <input
        type="date"
        value={taskData.dueDate}
        onChange={(e) => setTaskData({ ...taskData, dueDate: e.target.value })}
      />
      <div className="form-actions">
        <button className="btn btn-primary" onClick={handleSubmit}>
          Create
        </button>
        <button className="btn btn-secondary" onClick={() => setIsOpen(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TaskForm;

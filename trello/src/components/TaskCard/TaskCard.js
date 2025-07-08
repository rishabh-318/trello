// src/components/TaskCard/TaskCard.js
import React, { useState } from "react";
import { updateTask, deleteTask } from "../../api/tasks";
import { useDraggable } from "@dnd-kit/core";
import "../../styles/task.css";

const PRIORITY_COLORS = {
  Low: "#28a745",
  Medium: "#ffc107",
  High: "#dc3545",
};

const TaskCard = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...task });

  const { attributes, listeners, setNodeRef, transform, transition } =
    useDraggable({ id: task._id });

  const dragStyle = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    transition,
  };

  const handleSave = async () => {
    const updated = await updateTask(task._id, editData);
    onUpdate(updated);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (window.confirm("Delete this task?")) {
      await deleteTask(task._id);
      onDelete(task._id);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      if (!taskId || !newStatus) {
        throw new Error("Invalid task ID or status.");
      }

      await updateTask(taskId, { status: newStatus });

      // Optionally update local state if you're managing tasks manually
      console.log(`✅ Task ${taskId} status updated to ${newStatus}`);
    } catch (error) {
      console.error("❌ Failed to update task:", error.message);
      alert("Something went wrong while updating the task. Try again.");
    }
  };

  if (isEditing) {
    return (
      <div className="task editing">
        <input
          type="text"
          value={editData.title}
          onChange={(e) => setEditData({ ...editData, title: e.target.value })}
        />
        <textarea
          value={editData.description}
          onChange={(e) =>
            setEditData({ ...editData, description: e.target.value })
          }
        />
        <select
          value={editData.priority}
          onChange={(e) =>
            setEditData({ ...editData, priority: e.target.value })
          }
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <input
          type="text"
          placeholder="Assigned to"
          value={editData.assignedTo}
          onChange={(e) =>
            setEditData({ ...editData, assignedTo: e.target.value })
          }
        />
        <input
          type="date"
          value={editData.dueDate?.split("T")[0]}
          onChange={(e) =>
            setEditData({ ...editData, dueDate: e.target.value })
          }
        />
        <div className="form-actions">
          <button className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="task"
      ref={setNodeRef}
      style={dragStyle}
      {...listeners}
      {...attributes}
    >
      <div className="task-header">
        <h4>{task.title}</h4>
        <span
          className="badge"
          style={{ backgroundColor: PRIORITY_COLORS[task.priority] }}
        >
          {task.priority}
        </span>
      </div>
      {task.description && <p>{task.description}</p>}
      {task.assignedTo && <p>👤 {task.assignedTo}</p>}
      {task.dueDate && <p>📅 {new Date(task.dueDate).toLocaleDateString()}</p>}
      <div className="task-controls">
        <select
          value={task.status}
          onChange={(e) => handleStatusChange(e.target.value)}
        >
          <option>To Do</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
        <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;

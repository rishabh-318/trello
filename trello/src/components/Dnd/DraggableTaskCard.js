import React from "react";
import { useDraggable } from "@dnd-kit/core";

const DraggableTaskCard = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: task._id });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="task"
    >
      <div className="task-header">
        <h4>{task.title}</h4>
        <span className={`priority ${task.priority.toLowerCase()}`}>
          {task.priority}
        </span>
      </div>
      {task.description && <p>{task.description}</p>}
    </div>
  );
};

export default DraggableTaskCard;

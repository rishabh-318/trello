import React from "react";
import { useDroppable } from "@dnd-kit/core";
import DraggableTaskCard from "./DraggableTaskCard";

export const DroppableColumn = ({ id, title, tasks }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div className="column" ref={setNodeRef}>
      <h3>{title}</h3>
      <div className="tasks">
        {tasks.map((task) => (
          <DraggableTaskCard key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
};

// src/components/Column/Column.js
import React from "react";
import TaskCard from "../TaskCard/TaskCard";
import { useDroppable } from "@dnd-kit/core";
import "../../styles/task.css";

const Column = ({ title, tasks, onUpdateTask, onDeleteTask }) => {
  const { setNodeRef } = useDroppable({ id: title });

  return (
    <div className="column" ref={setNodeRef}>
      <h3>{title}</h3>
      <div className="tasks">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onUpdate={onUpdateTask}
            onDelete={onDeleteTask}
          />
        ))}
      </div>
    </div>
  );
};

export default Column;

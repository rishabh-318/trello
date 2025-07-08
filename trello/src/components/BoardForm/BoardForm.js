// src/components/BoardForm/BoardForm.js
import React, { useState } from "react";
import { createBoard } from "../../api/boards";
import "../../styles/board.css";

const BoardForm = ({ onBoardCreated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [boardData, setBoardData] = useState({ name: "", description: "" });

  const handleSubmit = async () => {
    if (!boardData.name.trim()) return;
    const newBoard = await createBoard(boardData);
    onBoardCreated(newBoard);
    setBoardData({ name: "", description: "" });
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        className="btn btn-primary full-width"
        onClick={() => setIsOpen(true)}
      >
        + New Board
      </button>
    );
  }

  return (
    <div className="form-container">
      <input
        type="text"
        placeholder="Board name"
        value={boardData.name}
        onChange={(e) => setBoardData({ ...boardData, name: e.target.value })}
      />
      <textarea
        placeholder="Board description"
        value={boardData.description}
        onChange={(e) =>
          setBoardData({ ...boardData, description: e.target.value })
        }
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

export default BoardForm;

// src/components/BoardList/BoardItem.js
import React from "react";
import "../../styles/board.css";

const BoardItem = ({ board, onSelect, isSelected }) => {
  return (
    <div
      className={`board-item ${isSelected ? "selected" : ""}`}
      onClick={() => onSelect(board)}
    >
      <h4>{board.name}</h4>
      {board.description && <p>{board.description}</p>}
    </div>
  );
};

export default BoardItem;

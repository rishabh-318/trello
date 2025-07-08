// src/components/BoardList/BoardList.js
import React from "react";
import BoardItem from "./BoardItem";

const BoardList = ({ boards, onSelect, selectedBoard }) => (
  <div className="boards-list">
    {boards.map((board) => (
      <BoardItem
        key={board._id}
        board={board}
        onSelect={onSelect}
        isSelected={selectedBoard?._id === board._id}
      />
    ))}
  </div>
);

export default BoardList;

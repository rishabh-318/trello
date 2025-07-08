import React, { useEffect, useState } from "react";
import BoardList from "../components/BoardList/BoardList";
import TaskForm from "../components/TaskForm/TaskForm";
import Column from "../components/Column/Column";
import BoardForm from "../components/BoardForm/BoardForm";
import { DndContext, closestCenter } from "@dnd-kit/core";
// import { arrayMove } from "@dnd-kit/sortable"; // keep only if you plan to use it
import { fetchBoards } from "../api/boards";
import { fetchTasksForBoard, updateTask } from "../api/tasks";
import "../styles/styles.css";

const TeamCollaborationBoard = () => {
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const loadBoards = async () => {
      const boards = await fetchBoards();
      setBoards(boards);
      if (boards.length > 0 && !selectedBoard) setSelectedBoard(boards[0]);
    };
    loadBoards();
  }, [selectedBoard]);

  useEffect(() => {
    const loadTasks = async () => {
      if (!selectedBoard) return;
      const data = await fetchTasksForBoard(selectedBoard._id);
      setTasks(data);
    };
    loadTasks();
  }, [selectedBoard]);

  const handleBoardCreated = (newBoard) => {
    setBoards([newBoard, ...boards]);
    setSelectedBoard(newBoard);
  };

  const handleTaskCreated = (newTask) => setTasks([newTask, ...tasks]);

  const handleTaskUpdate = (updatedTask) =>
    setTasks(tasks.map((t) => (t._id === updatedTask._id ? updatedTask : t)));

  const handleTaskDelete = (taskId) =>
    setTasks(tasks.filter((task) => task._id !== taskId));

  const filteredTasks = (status) =>
    tasks.filter((task) => task.status === status);

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over || !active || active.id === over.id) return;

    const taskId = active.id;
    const newStatus = over.id;

    const task = tasks.find((t) => t._id === taskId);
    if (!task || task.status === newStatus) return;

    const updated = await updateTask(taskId, { status: newStatus });
    handleTaskUpdate(updated);
  };

  return (
    <div className="app">
      <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          {sidebarOpen && <h2>Boards</h2>}

          <button
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? "←" : "→"}
          </button>
        </div>

        {sidebarOpen && (
          <div className="sidebar-content">
            <BoardForm onBoardCreated={handleBoardCreated} />

            <BoardList
              boards={boards}
              onSelect={setSelectedBoard}
              selectedBoard={selectedBoard}
            />
          </div>
        )}
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="main-content">
          {selectedBoard ? (
            <>
              <div className="board-header">
                <h1>{selectedBoard.name}</h1>
                {selectedBoard.description && (
                  <p>{selectedBoard.description}</p>
                )}
                <TaskForm
                  boardId={selectedBoard._id}
                  onTaskCreated={handleTaskCreated}
                />
              </div>

              <div className="board-columns">
                {["To Do", "In Progress", "Done"].map((status) => (
                  <Column
                    key={status}
                    title={status}
                    tasks={filteredTasks(status)}
                    onUpdateTask={handleTaskUpdate}
                    onDeleteTask={handleTaskDelete}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="no-board">
              <h2>Welcome to Team Collaboration Board</h2>
              <p>
                Select a board from the sidebar or create a new one to get
                started!
              </p>
            </div>
          )}
        </div>
      </DndContext>
    </div>
  );
};

export default TeamCollaborationBoard;

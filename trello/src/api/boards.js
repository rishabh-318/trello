const API_BASE = process.env.REACT_APP_API_BASE;

export const fetchBoards = async () => {
  const res = await fetch(`${API_BASE}/boards`);
  const data = await res.json();
  return data;
};

export const createBoard = async (boardData) => {
  const res = await fetch(`${API_BASE}/boards`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(boardData),
  });
  return res.json();
};

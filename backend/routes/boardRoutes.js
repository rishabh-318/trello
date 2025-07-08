const express = require("express");
const router = express.Router();
const { getBoards, createBoard } = require("../controllers/boardController");

router.get("/", getBoards);
router.post("/", createBoard);

module.exports = router;

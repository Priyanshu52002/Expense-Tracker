const express = require("express");
const { addExpense, getExpenses, updateExpense, deleteExpense } = require("../controllers/expense");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.post("/", authMiddleware, addExpense);
router.get("/", authMiddleware, getExpenses);
router.put("/:id", authMiddleware, updateExpense);
router.delete("/:id", authMiddleware, deleteExpense);  

module.exports = router;
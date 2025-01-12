const Expense = require("../models/Expense");


const addExpense = async (req, res) => {
  try {
    const { amount, category, description, date } = req.body;
    const newExpense = new Expense({ userId: req.user, amount, category, description, date });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user }).populate("userId", "name email");

    const formattedData = expenses.map(exp => ({
      _id: exp._id,
      category: exp.category,
      amount: exp.amount,
      description: exp.description,
      date: exp.date
    }));

    res.status(200).json({ expenses, formattedData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateExpense = async (req, res) => {
  try {
    const { amount, category, description, date } = req.body;
    const updatedExpense = await Expense.findOneAndUpdate(
      { _id: req.params.id, userId: req.user },
      { amount, category, description, date },
      { new: true }
    );

    if (!updatedExpense) return res.status(404).json({ msg: "Expense not found" });

    res.status(200).json(updatedExpense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const deleteExpense = async (req, res) => {
  try {
    const deletedExpense = await Expense.findOneAndDelete({ _id: req.params.id, userId: req.user });

    if (!deletedExpense) return res.status(404).json({ msg: "Expense not found" });

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports={deleteExpense,addExpense,getExpenses,updateExpense}
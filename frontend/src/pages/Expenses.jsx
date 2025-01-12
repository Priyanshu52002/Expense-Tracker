import { useState, useEffect, useContext, useCallback } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import ExpenseItem from "../component/ExpenseItem";
import ExpenseChart from "../component/ExpenseChart";
import { Link ,useNavigate} from "react-router-dom";
import { useSnackbar } from "notistack";
const Expenses = () => {
  const { token, logout } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();
  const name=localStorage.getItem('name');
  const {enqueueSnackbar}=useSnackbar();

  const fetchExpenses = useCallback(async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/expenses`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (response.data && response.data.formattedData) {
        const formattedExpenses = response.data.formattedData.map((expense) => ({
          id: expense._id,
          category: expense.category,
          amount: `₹${expense.amount.toFixed(2)}`,
          description: expense.description,
          date: new Date(expense.date).toLocaleDateString(),
        }));
        console.log(formattedExpenses);
        setExpenses(formattedExpenses);
      }
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  }, [token]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this expense?");
    if (!confirmDelete) return;
    try {

      const res=await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/expenses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if(res){
        enqueueSnackbar('Expense Deleted Successfully',{variant:"success"})
      }
      setExpenses((prev) => prev.filter((expense) => expense.id !== id));
    } catch (error) {
      console.error("Error deleting expense:", error);
      enqueueSnackbar('Expense Delete Failed',{variant:"error"})
    }
  };

  const handleLogout = () => {
    logout();
    enqueueSnackbar('Logged Out Successfully',{variant:"success"})
    navigate("/login"); 
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl text-blue-500 font-bold mb-4">
        Welcome, {name}! 🎉 To SpendWise
        </h2>
        <div className="flex gap-2">
          <Link to="/add" className="bg-green-500 text-white p-4 rounded">
            Add Expense
          </Link>
          <button className="bg-blue-500 text-white p-4 rounded" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <ExpenseChart />
      <table className="min-w-full table-auto border-collapse border border-gray-300 mt-4">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-6 py-3 text-left border-b">DATE</th>
            <th className="px-6 py-3 text-left border-b">Category</th>
            <th className="px-6 py-3 text-left border-b">Description</th>
            <th className="px-6 py-3 text-left border-b">Amount</th>
            <th className="px-6 py-3 text-left border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <ExpenseItem key={expense.id} expense={expense} onDelete={handleDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Expenses;
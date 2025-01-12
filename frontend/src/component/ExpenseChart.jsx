import { useState, useEffect, useContext, useMemo } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import PieChart from "./PieChart";
import BarGraph from "./BarGraph";

const ExpenseChart = () => {
  const { token } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/expenses`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setExpenses(res.data.formattedData))
      .catch((err) => console.error(err));
  }, [token]);

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // Memoizing category data for the PieChart
  const categoryData = useMemo(() => {
    return expenses.reduce((acc, expense) => {
      const amount = expense.amount;
      acc[expense.category] = (acc[expense.category] || 0) + amount;
      return acc;
    }, {});
  }, [expenses]);

  // Memoizing monthly data for the BarGraph 
  const monthlyData = useMemo(() => {
    return expenses.reduce((acc, expense) => {
      const amount = expense.amount;
      const monthIndex = new Date(expense.date).getMonth(); 
      const monthName = monthNames[monthIndex]; 

      acc[monthName] = (acc[monthName] || 0) + amount;
      return acc;
    }, {});
  }, [expenses]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Expense Dashboard</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-4 border">
          <h3 className="text-lg font-semibold">Expense Category Distribution</h3>
          <PieChart data={categoryData} />
        </div>
        <div className="p-4 border">
          <h3 className="text-lg font-semibold">Monthly Expense Trends</h3>
          <BarGraph data={monthlyData} />
        </div>
      </div>
    </div>
  );
};

export default ExpenseChart;

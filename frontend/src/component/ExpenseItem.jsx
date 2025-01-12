import { Link } from "react-router-dom";

const ExpenseItem = ({ expense, onDelete }) => {
  return (
    <tr className="border-b">
      <td className="px-6 py-3">{expense.date}</td>
      <td className="px-6 py-3">{expense.category}</td>
      <td className="px-6 py-3">{expense.description}</td>
      <td className="px-6 py-3">{expense.amount}</td>
      <td className="px-6 py-3 space-x-2">
        <Link to={`/edit/${expense.id}`} className="bg-blue-500 text-white p-2 rounded">
          Edit
        </Link>
        <button onClick={() => onDelete(expense.id)} className="bg-red-500 text-white p-2 rounded">
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ExpenseItem;

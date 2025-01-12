import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { useSnackbar } from "notistack";
const EditExpense = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  
  const { register, handleSubmit, setValue } = useForm();
  const {enqueueSnackbar}=useSnackbar();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/expenses`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        const expense = res.data.find(exp => exp._id === id);
        if (expense) {
          setValue("amount", expense.amount);
          setValue("category", expense.category);
          setValue("description", expense.description);
          setValue("date", expense.date);
        }
      })
      .catch((err) => console.error(err));
  }, [id, token, setValue]);

  const onSubmit = async (data) => {
    try {
      const res=await axios.put(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/expenses/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if(res){
        enqueueSnackbar('Expense Updated Successfully',{variant:"success"})
      }
      navigate("/home");
    } catch (error) {
      console.error("Error updating expense", error);
      enqueueSnackbar('Expense Update Failed',{variant:"Error"})
    }
  };

  return (
    <form className="p-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-2xl font-bold">Edit Expense</h2>

      <input
        type="number"
        name="amount"
        placeholder="Amount..."
        className="border p-2 w-full"
        {...register("amount", { required: "Amount is required" })}
      />

      <input
        type="text"
        name="category..."
        placeholder="Category"
        className="border p-2 w-full"
        {...register("category", { required: "Category is required" })}
      />

      <input
        type="text"
        name="description..."
        placeholder="description"
        className="border p-2 w-full"
        {...register("description", { required: "Description is required" })}
      />
      <input
        type="date"
        name="date"
        placeholder="Date..."
        className="border p-2 w-full"
        {...register("date", { required: "Date is required" })}
      />

      <button type="submit" className="bg-blue-500 text-white p-2 w-full">Update Expense</button>
    </form>
  );
};

export default EditExpense;
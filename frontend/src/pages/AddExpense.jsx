import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useSnackbar } from "notistack";

const AddExpense = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  
  const { register, handleSubmit, formState: { errors ,isSubmitting} } = useForm();

  const onSubmit = async (data) => {
    try {
      const res=await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/expenses`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if(res){
        enqueueSnackbar('Expense Added Successfully',{variant:"success"});
      }
      navigate("/home");
    } catch (error) {
      console.error("Error adding expense", error);
      enqueueSnackbar('Error Adding Expense',{variant:"error"});
    }
  };

  return (
    <form className="p-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-2xl font-bold">Add Expense</h2>

      <input
        type="number"
        name="amount"
        placeholder="Amount"
        className="border p-2 w-full"
        {...register("amount", { required: "Amount is required" })}
      />
      {errors.amount && <p className="text-red-500">{errors.amount.message}</p>}

      <input
        type="text"
        name="category"
        placeholder="Category"
        className="border p-2 w-full"
        {...register("category", { required: "Category is required" })}
      />
      {errors.category && <p className="text-red-500">{errors.category.message}</p>}

      <input
        type="text"
        name="description"
        placeholder="Description"
        className="border p-2 w-full"
        {...register("description")}
      />
      <input
        type="date"
        name="date"
        className="border p-2 w-full"
        {...register("date", { required: "Date is required" })}
      />
      {errors.date && <p className="text-red-500">{errors.date.message}</p>}

      <button type="submit" className="bg-green-500 text-white p-2 w-full" disabled={isSubmitting}>{isSubmitting?"Submitting":"Submit"}</button>
    </form>
  );
};

export default AddExpense;

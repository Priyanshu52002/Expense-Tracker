const mongoose=require('mongoose');

const ExpenseSchema=new mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        amount: { 
            type: Number, 
            required: [true,"Amount is required"]
        },
        category: { 
            type: String, 
            required: [true,"Category is required"] 
        },
        description: { 
            type: String 
        },
        date: { 
            type: Date, 
            default: Date.now
        },
    }
)

module.exports = mongoose.model("Expense", ExpenseSchema);
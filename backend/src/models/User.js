const mongoose=require("mongoose")

const UserSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required: [true, "Name is required"],
            minlength: [3, "Name must be at least 3 characters"],
            maxlength: [50, "Name cannot exceed 50 characters"]
        },
        email:{
            type: String,
            required: [true, "Email is required"],
            unique: true,
            maxlength: [100, "Email cannot exceed 100 characters"]
        },
        password:{
            type: String,
            required: [true, "Password is required"],
        }
    }
)

module.exports=mongoose.model("User",UserSchema);
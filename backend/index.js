const express=require("express");
const connectDB = require("./src/config/db");
const ExpenseApis=require("./src/routes/expenseRoutes");
const UserApis=require("./src/routes/userRoutes");
const cors=require('cors')

const app=express();
app.use(express.json());

app.use(cors({
    origin: [process.env.FRONTEND_BASE_URL], 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use("/user",UserApis);
app.use("/expenses",ExpenseApis);

connectDB();

port=process.env.PORT || 4000
app.listen(port,()=>{
    console.log(`Server is live on port ${port}`);
})
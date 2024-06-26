import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import ItemRouter from "./routes/itemRoute.js";
import UserRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import 'dotenv/config'
import orderRouter from "./routes/orderRoute.js";


const app=express();
const port=4000;

app.use(express.json())
app.use(cors())

connectDB();
//api endpoint
app.use("/api/item",ItemRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",UserRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.get("/",(req,res)=>{
    res.send("API Working")
})
app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`);
})



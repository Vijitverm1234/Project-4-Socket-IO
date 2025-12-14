import express from "express"
import "dotenv/config"
import cors from "cors"
import http from "http"
// In your main file:
import connectDB from './lib/db.js'; 
import userRouter from "./routes/userRoutes.js";


const app=express()
const server=http.createServer(app) 

app.use(express.json({limit:"4mb"}))
app.use(cors());

connectDB()
app.get("/api/status",(req,res)=>{
    res.send("Server is live 🥹")
})
app.use("/api/auth",userRouter)
app.listen(process.env.PORT || 4000,()=>{
    console.log("Server is live 🥹")
})
import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";

import connectDB from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoute.js";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
export const userSocketMap={}

io.on("connection",(socket)=>{
  const userId=socket.handshake.query.userId;
  console.log("User Connected",userId)
})


app.use(express.json({ limit: "4mb" }));
app.use(cors());

connectDB();
app.get("/api/status", (req, res) => {
  res.send("Server is live 🥹");
});
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);
app.listen(process.env.PORT || 4000, () => {
  console.log("Server is live 🥹");
});

import path from "path";
import  express from 'express';
import cookieParser from 'cookie-parser';
import  dotenv  from 'dotenv';
import { app, server } from './socket/socket.js';


import authRoutes from "./Routes/authRoute.js";
import messageRoute from "./Routes/messageRoute.js";
import userRoutes from "./Routes/userRoute.js";



import connectToMongoDB from './Database/dbmongo.js';
dotenv.config();


const Port = process.env.PORT || 5000;

const __dirname = path.resolve();





app.use(express.json()); ///// ise incoming request ko jese inputs wgera ko parse krenge
app.use(cookieParser())
app.use("/api/auth", authRoutes);
app.use("/api/messages",messageRoute );
app.use("/api/users",userRoutes)

app.use(express.static(path.join(__dirname,"/frontend/dist")));

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"));
})


server.listen(Port,()=> {
    connectToMongoDB();
    console.log(`server is running on the port ${Port}`)
});
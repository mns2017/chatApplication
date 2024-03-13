import express from "express";
import { sendMessage,getMessages } from "../controlllers/messagecontroller.js";
import protectRoutes from "../middelwares/protectRoutes.js"

const messageRoute = express.Router();


////////// route for sending message between two user 
messageRoute.post("/send/:id",protectRoutes,sendMessage);


////////////// route for gettting messages between two users
messageRoute.get("/:id",protectRoutes,getMessages);

export default messageRoute;

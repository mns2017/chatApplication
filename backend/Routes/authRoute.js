import express from "express";
import {LoginUser,LogoutUser,SignupUser} from "../controlllers/authcontroller.js"
const router = express.Router();

router.post("/login",LoginUser)


router.post("/logout",LogoutUser)

router.post("/signup",SignupUser)


export default router;
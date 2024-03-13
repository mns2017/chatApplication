import express from "express"
import protectRoutes from "../middelwares/protectRoutes.js";
import { getUsersForSidebar } from "../controlllers/usercontroller.js";
const router = express.Router();

router.get("/",protectRoutes , getUsersForSidebar)

export default router;
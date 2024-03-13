import jwt from "jsonwebtoken";
import User from "../Models/UserModel.js";

const protectRoutes = async (req,res,next)=>{
    try {
        const token = req.cookies.jwt;
        if(!token){
            res.status(404).json({
                error:"UnAuthorized Request!"
            })
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            res.status(404).json({
                error:"UnAuthorized Request!"
            })
        }
        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
            res.status(404).json({
                error:"USER NOT FOUND!"
            })
        }
        req.user = user;
        next();
    } catch (error) {
        console.log("ERROR IN PROTECTrOUTES MIDDELwARE!",error.message)
        res.status(500).json({message:"INTERNAL SERVER ERROR"})
    }
}


export default protectRoutes
import User from "../Models/UserModel.js";

export const getUsersForSidebar = async (req,res)=>{

    try {
        const loggedInUserID = req.user._id;
        // const  allusers = await User.find();
        
        const filteredUser = await User.find({_id : {$ne : loggedInUserID}}).select(`-password`);
        res.status(200).json(filteredUser);
    } catch (error) {
        console.log("ERROR OCCURED IN GETUSER",error.message);
        res.status(400).json({
            message : "Error Occured in getuserforsidebar sorrry !"
        })
    }

}
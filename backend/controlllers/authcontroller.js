import bcryptjs from "bcryptjs";
import User from "../Models/UserModel.js";
import genrateTokenAndCookie from "../utils/generatejwttokens.js";



export const LoginUser = async (req,res) => {
    try {
        const {gmail,password} = req.body;
        const user = await User.findOne({gmail});
        const isPasswordCorrect = await bcryptjs.compare(password,user?.password || "")
        if(!user || !isPasswordCorrect){
            return res.status(404).json({error:"User Not Found! or It Could Be An Wrong Password"})
        }
        genrateTokenAndCookie(user._id,res);
        res.status(200).json({
            _id : user._id,
            fullname : user.fullname,
            username : user.username,
            profilepic : user.profilepic
        })
        console.log("user fetched!")
    } catch (error) {
        console.log("ERROR IN LOGIN MIDDLEWARE",error.message);
        res.status(500).json({error: "INTERNAL SERVER ERROR"})
    }
}

export const LogoutUser =  (req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged Out Successfully!"});
    } catch (error) {
        console.log("ERROR OCCURED IN LOGOUT MIDDLEWARE!",error.message);
        res.status(500).json({
            error:"Error Occured During Logout!"
        })
    }
}


export const SignupUser = async (req,res)=>{
    try {
        const {fullname,username,password,confirmPassword,gender,gmail} = req.body;
        if(password !== confirmPassword){
            return res.status(400).json({error:"password dnt't match"})
        }
        const user = await User.findOne({username});
        if(user){
            return res.status(400).json({error:" User Already existed! now User Name Should be unique!"});
        }

        ///////// hashing passsword 
        const salt = await bcryptjs.genSalt(10);
        const hashedpassword = await bcryptjs.hash(password,salt);

        const boysProfilepic =`https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlsProfilepic =`https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullname,
            username,
            password:hashedpassword,
            gender,
            gmail,
            profilepic : gender === "male" ? boysProfilepic : girlsProfilepic            
        })

        if(newUser){
            // jwt token Generatng
            genrateTokenAndCookie(newUser._id,res);


            await newUser.save();
            res.status(201).json({
                _id : newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                profilepic: newUser.profilepic
            });
        }else{
            res.status(400).json({
                error:"INVALID USER DATA!"
            })
        }

    } catch (error) {
        console.log("ERROR IN SIGNUP CONTROLLER!",error.message)
        res.status(500).json({error:"internal server error!"})
    }
}
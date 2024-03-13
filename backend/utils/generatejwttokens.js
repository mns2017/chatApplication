import jwt from "jsonwebtoken";

const genrateTokenAndCookie = (userId,res) =>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'15d'
    })
    res.cookie('jwt',token,{
        maxAge:15*24*60*60*1000, // 15 day 24 hrs 60 min 60 seconds 1000 miliseconds
        httpOnly : true ,// it prevent cross site attacks 
        sameSite:"strict", // it prevent CSRF attacks - cross site request forgery attack
        secure:process.env.NODE_ENV !== "development"
    });
};

export default genrateTokenAndCookie;
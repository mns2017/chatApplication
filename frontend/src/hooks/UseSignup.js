import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';


const UseSignup = () => {
  const [loading,setLoading] = useState(false);
  const {authUser,setAuthUser}  = useAuthContext();
  const signup = async({fullname,username,password,confirmPassword,gender,gmail})=>{
   const success =  handelInputErrors({fullname,username,password,confirmPassword,gender,gmail})
   if(!success)return;
   setLoading(true);
   try {
    const res = await fetch("/api/auth/signup",{
        method:"POST",
        headers:{"Content-Type" : "application/json"},
        body: JSON.stringify({fullname,username,password,confirmPassword,gender,gmail})
    })
    const data = await res.json();
    if(data.error){
        throw new Error(data.error);
    }

    //// local storage for chating
    localStorage.setItem("chat-user",JSON.stringify(data));
    setAuthUser(data);


   } catch (error) {
    toast.error(error.message)
   }finally{
    setLoading(false);
   }
  };

  return{loading,signup};

}

export default UseSignup




function handelInputErrors({fullname,username,password,confirmPassword,gender,gmail}){
    if (!fullname || !username || !password || !confirmPassword || !gender || !gmail) {
		toast.error("Please fill in all fields");
		return false;
	}

    if(password !== confirmPassword){
        toast.error("Password And Confirm Password Are Not Same!");
        return false;
    }

    if(password.length < 6){
        toast.error("Password Must Be Contain More Than 6 Characters!")
        return false;
    }

    return true;
}
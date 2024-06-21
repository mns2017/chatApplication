import React, { useState } from 'react'
import SignUp from '../signup/Signup'
import { Link } from 'react-router-dom'
import useLogin from '../../hooks/useLogin';

const Login = () => {
    const [gmail,setGmail] = useState("");
    const [password,setPassword] = useState("");

    const {loading,login} = useLogin()

    const handleSubmit = async(e)=>{
        e.preventDefault();
        await login(gmail,password)
    }
  return (
    <div className='flex flex-col items-center justify-center min-w-96 max-auto'>
        <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter  backdrop-blur-lg bg-opacity-0'>
            <h1 className='text-3xl font-semibold text-center  text-blue-800'>
                login to 
                <span className='text-blue-500'> TalkHub</span>
            </h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text text-black'>Gmail</span>
                    </label>
                    <input type="email" placeholder='Enter Your Gmail' className='w-full input input-bordered h-10' value={gmail} onChange={(e)=> setGmail(e.target.value)} />
                </div>

                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text text-black'>Password</span>
                    </label>
                    <input type="password" placeholder='Enter Your Password' className='w-full input input-bordered h-10' value={password} onChange={(e)=> setPassword(e.target.value)} />
                </div>
                <Link to="/signup" className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>{"Don't"} have an account</Link>

                <div>
                    <button className='btn btn-block btn-sm mt-2' disabled={loading}>
                        {loading?<span className='loading loading-spinner'></span> : "Login"}
                    </button>
                </div>

            </form>

        </div>
    </div>
  )
}

export default Login
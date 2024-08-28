import React, { useContext, useState } from 'react'
import { Context } from '../../main';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, Navigate } from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa';
import { MdOutlineMailOutline } from 'react-icons/md';

import { RiLock2Fill } from 'react-icons/ri';



const Login = () => {
  const[email,SetEmail]=useState("");
  const[password,SetPassword]=useState("");
  const[role,SetRole]=useState("");

  const {isAuthorised,setIsAuthorised,user,setUser}=useContext(Context);

  const handleLogin=async(e)=>{
    e.preventDefault();
    try{
      const{data}=await axios.post(
        "http://localhost:4000/api/v1/user/login",
        {email,password,role},
        {withCredentials:true, headers:
        {"Content-Type": "application/json",
      },
    });
    toast.success(data.message);
    
    SetEmail("");
    SetRole("");
    SetPassword("");
    setIsAuthorised(true);
    }
    catch(error)
    {
      toast.error(error.response.data.message)

    }
  };

  if(isAuthorised){
    return <Navigate to={"/"} />;
  }
  return (
    <>
    <div className="authPage">
    <div className="container">
    <div className='header'>
      <img src="/JobZeelogo.png" alt='logo'/>
      <h3>Login to your Account</h3>
    </div>
    <form>
      <div className="inputTag">
        <label>Login As</label>
        <div>
          <select value={role} onChange={(e)=>SetRole(e.target.value)}>
            <option value="">Select Role</option>
            <option value="Employer">Employer</option>
            <option value="Job Seeker">Job Seeker</option>
          </select>
          <FaRegUser/>
        </div>
      </div>

      <div className="inputTag">
        <label>Email Address</label>
        <div>
           <input type='text' value={email} onChange={(e)=>SetEmail(e.target.value) } placeholder='xyz@gmail.com'></input>
          <MdOutlineMailOutline />
        </div>
      </div>

      <div className="inputTag">
        <label>Password</label>
        <div>
           <input type='password' value={password} onChange={(e)=>SetPassword(e.target.value) } placeholder='Password'></input>
          <RiLock2Fill />
        </div>
      </div>

      <button onClick={handleLogin} type='submit'>Login</button>
      <Link to={'/register'}>Register Now</Link>

      
    </form>
      </div>
      <div className='banner'>
        <img src="/login.png" alt='login' />
      </div> 
      </div>
      
    </>
  )
}

export default Login;

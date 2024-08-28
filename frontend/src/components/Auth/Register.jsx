import React, { useContext, useState } from "react";
import { Context } from '../../main';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, Navigate } from 'react-router-dom';
import { FaPencilAlt, FaRegUser } from 'react-icons/fa';
import { MdOutlineMailOutline } from 'react-icons/md';
import { FaPhoneFlip} from 'react-icons/fa6';
import { RiLock2Fill } from 'react-icons/ri';



const Register = () => {
  const[email,SetEmail]=useState("");
  const[password,SetPassword]=useState("");
  const[phone,SetPhone]=useState("");
  const[name,SetName]=useState("");
  const[role,SetRole]=useState("");

  const {isAuthorised,setIsAuthorised,user,setUser}=useContext(Context);

  const handleRegister=async(e)=>{
    e.preventDefault();
    try{
      const{data}=await axios.post(
        "http://localhost:4000/api/v1/user/register",
        {name,email,password,phone,role},
         {headers:
        {"Content-Type": "application/json",
      }, withCredentials:true,
    });
    toast.success(data.message);
    SetName("");
    SetEmail("");
    SetPhone("");
    SetRole("");
    SetPassword("");

    setIsAuthorised(true);
    }
    catch(error)
    {
      toast.error(error.response.data.message);

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
      <h3>Create a New Account</h3>
    </div>
    <form>
      <div className="inputTag">
        <label>Register As</label>
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
        <label>Name</label>
        <div>
           <input type='String' value={name} onChange={(e)=>SetName(e.target.value) } 
           placeholder='Name' />
          <FaPencilAlt/>
        </div>
      </div>

      <div className="inputTag">
        <label>Email Address</label>
        <div>
           <input type='String' value={email} onChange={(e)=>SetEmail(e.target.value) } placeholder='xyz@gmail.com'/>
          <MdOutlineMailOutline />
        </div>
      </div>

      <div className="inputTag">
        <label>Phone</label>
        <div>
           <input type='Number' value={phone} onChange={(e)=>SetPhone(e.target.value) } placeholder='1234566'/>
          <FaPhoneFlip />
        </div>
      </div>

      <div className="inputTag">
        <label>Password</label>
        <div>
           <input type='Password' value={password} onChange={(e)=>SetPassword(e.target.value) } placeholder='Password'/>
          <RiLock2Fill />
        </div>
      </div>

      <button onClick={handleRegister} type='submit'>Register</button>
      <Link to={'/login'}>Login Now</Link>

      
    </form>
      </div>
      <div className='banner'>
        <img src="/register.png" alt='register' />
      </div> 
      </div>
      
    </>
  )
}

export default Register;

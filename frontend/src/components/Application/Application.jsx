import React, { useState,useContext } from 'react';
import {Context} from "../../main";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Application = () => {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [coverletter,setCoverletter]=useState("");
  const [phone,setPhone]=useState("");
  const [address,setAddress]=useState("");
  const [resume,setResume]=useState(null);

  const {isAuthorised,user}=useContext(Context);

  const navigateTo=useNavigate();

  ///FUNCTION TO HANDLE FILE INPUT

  const handleFileChange=(e)=>{
    const resume=e.target.files[0];
    setResume(resume);
  };

  const {id}=useParams();
  const handleApplication=async(e)=>{
    e.preventDefault();
    const formData=new FormData();
    formData.append("name",name);
    formData.append("email",email);
    formData.append("phone",phone);
    formData.append("address",address);
    formData.append("coverletter",coverletter);
    formData.append("resume",resume);
    formData.append("jobId",id);

    try {

      const {data}=await axios.post("http://localhost:4000/api/v1/application/posted"
        ,formData,
        {withCredentials:true,
        headers:{
        "Content-Type":"multipart/form-data",
      },
    });
    setName("");
    setEmail("");
    setCoverletter("");
    setPhone("");
    setAddress("");
    setResume("");
    toast.success(data.message);
    navigateTo("job/getall");

      
    } catch (error) {
      toast.error(error.response.message);
    }


  
  };

  if(!isAuthorised || (user && user.role === "Employer")){
     navigateTo("");
  }

  return (
    <section className='application'>
      <div className="container">
        <h3>Application Form</h3>
        <form onSubmit={handleApplication}>
          <input type='text' placeholder='Your Name' value={name} onChange={(e)=>setName(e.target.value)}/>
          <input type='text' placeholder='Your Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <input type='number' placeholder='Your Phone' value={phone} onChange={(e)=>setPhone(e.target.value)}/>
          <input type='text' placeholder='Your Address' value={address} onChange={(e)=>setAddress(e.target.value)}/>
          <textarea value={coverletter} onChange={(e)=>setCoverletter(e.target.value)} placeholder='Cover Letter'/>

            <div>
              <label style={{textAlign:"start",display:"block",fontSize:"20px"}}
              >Select Resume</label>

              <input type='file' accept='.jpg, .png, .webp' onChange={handleFileChange} style={{width:"100%"}}
              />

            </div>
            <button type='submit'>Send Application</button>
        </form>
      </div>
      
    </section>
  );
};

export default Application;

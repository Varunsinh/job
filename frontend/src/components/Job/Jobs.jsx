import React, { useEffect, useState,useContext } from 'react';
import {Context} from '../../main';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';

const Jobs = () => {
  const [jobs,setJobs]=useState([]);
  const {isAuthorised}=useContext(Context);
  const navigateTo=useNavigate();

  useEffect(() => {
    if (!isAuthorised) {
      navigateTo("/login");
    } else {
      axios.get("http://localhost:4000/api/v1/job/getall", { withCredentials: true })
        .then((res) => {
          setJobs(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isAuthorised, navigateTo]);

  return (
    <>
    <section className="jobs page">
      <div className="container">
        <h1>ALL AVAILABLE JOBS</h1>
        <div className="banner">
          {
            jobs.jobs && jobs.jobs.map((element)=> {
              return(
                <div className="card" key={element._id}>
                  <p>{element.title}</p>
                  <p>{element.category}</p>
                  <p>{element.country}</p>
                  <Link to={`/job/${element._id}`}>Job Details</Link>


                </div>
              );
            })
          }
        </div>
      </div>
    </section>
      
    </>
  );
};

export default Jobs;

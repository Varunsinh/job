import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../main';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ResumeModel from "./ResumeModel";
import axios from 'axios';

const MyApplication = () => {
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");
  const { user, isAuthorised } = useContext(Context);

  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        if (user && user.role === "Employer") {
          const res = await axios.get("http://localhost:4000/api/v1/application/employer/getall", { withCredentials: true });
          setApplications(res.data.applications);
        } else {
          const res = await axios.get("http://localhost:4000/api/v1/application/jobseeker/getall", { withCredentials: true });
          setApplications(res.data.applications);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred");
      }
    };

    fetchApplications();
  }, [isAuthorised, user]);

  useEffect(() => {
    if (!isAuthorised) {
      navigateTo("/login");
    }
  }, [isAuthorised, navigateTo]);

  const deleteApplication = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:4000/api/v1/application/delete/${id}`, { withCredentials: true });
      toast.success(res.data.message);
      setApplications(prevApplications => prevApplications.filter(application => application._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <section className="applications page">
        {user && user.role === "Job Seeker" ? (
          <div className="container">
            <h1>MY APPLICATIONS</h1>
            {applications.length > 0 ? (
              applications.map((element) => (
                <JobSeekerCard
                  key={element._id}
                  element={element}
                  deleteApplication={deleteApplication}
                  openModal={openModal}
                />
              ))
            ) : (
              <p>No applications found.</p>
            )}
          </div>
        ) : (
          <div className="container">
            <h3>APPLICATIONS FROM JOB SEEKERS</h3>
            {applications.length > 0 ? (
              applications.map((element) => (
                <EmployerCard
                  key={element._id}
                  element={element}
                  openModal={openModal}
                />
              ))
            ) : (
              <p>No applications found.</p>
            )}
          </div>
        )}

        {modalOpen && <ResumeModel imageUrl={resumeImageUrl} onClose={closeModal} />}
      </section>
    </>
  );
};

export default MyApplication;

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <div className="job_seeker_card">
      <div className="detail">
        <p><span>Name:</span> {element.name}</p>
        <p><span>Email:</span> {element.email}</p>
        <p><span>Phone:</span> {element.phone}</p>
        <p><span>Address:</span> {element.address}</p>
        <p><span>Cover Letter:</span> {element.coverletter}</p>
      </div>
      <div className="resume">
        <img src={element.resume.url} alt="resume" onClick={() => openModal(element.resume.url)} />
      </div>
      <div className="btn_area">
        <button onClick={() => deleteApplication(element._id)}>Delete Application</button>
      </div>
    </div>
  );
};

const EmployerCard = ({ element, openModal }) => {
  return (
    <div className="employer_card">
      <div className="detail">
        <p><span>Name:</span> {element.name}</p>
        <p><span>Email:</span> {element.email}</p>
        <p><span>Phone:</span> {element.phone}</p>
        <p><span>Address:</span> {element.address}</p>
        <p><span>Cover Letter:</span> {element.coverletter}</p>
      </div>
      <div className="resume">
        <img src={element.resume.url} alt="resume" onClick={() => openModal(element.resume.url)} />
      </div>
    </div>
  );
};

import React from 'react';
import {FaUserPlus} from 'react-icons/fa';
import { MdFindInPage} from 'react-icons/md';
import { IoMdSend} from 'react-icons/io';

const HowitWorks = () => {
  return (
    <div className='howitworks'>
      <div className='container'>
        <h3>How JobZee Works </h3>
        <div className='banner'>
        <div className="card">
          <FaUserPlus/>
          <p>Create Account</p>
          <p>Ready to take your career to the next level? Creating an account with us is your first step towards a world of endless possibilities. By joining our community, you gain access to a wealth of resources, connections, and tools designed to help you thrive.</p>

        </div>

        <div className="card">
          <MdFindInPage/>
          <p>Find a Job/Post a Job</p>
          <p>Welcome to the ultimate hub for job seekers and employers! Whether you're looking to find your next career move or seeking the perfect candidate to join your team, our platform offers a seamless and efficient experience tailored to your needs.</p>
          
        </div>

        <div className="card">
          <IoMdSend/>
          <p>Create Account</p>
          <p>Creating an account with us is your first step towards a world of endless possibilities. By joining our community, you gain access to a wealth of resources, connections, and tools designed to help you thrive.</p>
          
        </div>
        </div>
      </div>
      
    </div>
  )
}

export default HowitWorks;

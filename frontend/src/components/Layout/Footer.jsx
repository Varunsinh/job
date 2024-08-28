import React, { useContext } from 'react';
import { Context } from '../../main';
import { Link } from 'react-router-dom';
import {FaFacebookF,FaYoutube,FaLinkedin} from 'react-icons/fa';
import {RiInstagramFill} from 'react-icons/ri';

const Footer = () => {
    const{ isAuthorised }= useContext(Context);
  return (
    <footer className={isAuthorised ? 'footerShow' : 'footerHide'}>
      <div>&copy; All Rights Reserved By CodewithVarun..</div>
      <div>
        <Link to ={'/'} target='_blank'><FaFacebookF/></Link>
        <Link to ={'/'} target='_blank'><FaYoutube/></Link>
        <Link to ={'https://www.linkedin.com/in/varunsinh-yadav-22a894213'} target='_blank'><FaLinkedin/></Link>
        <Link to ={'/'} target='_blank'><RiInstagramFill/></Link>
      </div>
    </footer>
  );
};

export default Footer; 

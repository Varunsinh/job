import React, { useContext } from 'react';
import {Context } from "../../main";
import { Navigate } from 'react-router-dom';
import HeroSection from './HeroSection';
import HowitWorks from './HowitWorks';
import PopularCatagories from './PopularCatagories';
import PopularCompanies from './PopularCompanies';

const Home = () => {
  const {isAuthorised}=useContext(Context);
  if(!isAuthorised)
  {
    return <Navigate to={'/login'}/>
  }
  return <section className='homePage page'>
    <HeroSection/>
    <HowitWorks/>
    <PopularCatagories/>
    <PopularCompanies/>


  </section>

  return (
    <div>
      
    </div>
  )
}

export default Home;

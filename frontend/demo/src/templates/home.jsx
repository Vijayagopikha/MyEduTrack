import React from 'react';
import './styles.css';
import s1 from '../assets/s1.jpg';
import { Link } from 'react-router-dom';
const home = () => {
  return (
    <div>
         
        <div className='container'>
        <div className='content'>
              <h1>Welcome to MyEduTrack</h1>
            </div>
            <img src = {s1} alt = "home"></img>
            
        </div>
    </div>
  )
}

export default home;

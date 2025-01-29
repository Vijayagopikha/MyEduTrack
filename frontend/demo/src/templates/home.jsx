import React from 'react';
import './styles.css';
import s1 from '../assets/s1.jpg';
import { Link } from 'react-router-dom';
const home = () => {
  return (
    <div>
          <nav className='nav'>
            <h1>MyEduTrack</h1>
            <ul className='navul'>
                <li><a href = "#">Home</a></li>
                <li><a href = "#">About</a></li>
                <li>
                  <Link to = "/login"><button type= "button" className='btn1'>Sign In</button></Link></li>
                <li>  <Link to = "/signup"><button type= "button" className='btn'>Sign Up</button></Link></li>
            </ul>
          </nav>
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

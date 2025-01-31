import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
const navbar = () => {
  return (
    <div><nav className='nav'>
    <h1>MyEduTrack</h1>
    <ul className='navul'>
        <li> <Link to = "/"><a>Home</a></Link></li>
        <li><a href = "#">About</a></li>
        <li>
          <Link to = "/login"><button type= "button" className='btn1'>Sign In</button></Link></li>
        <li>  <Link to = "/signup"><button type= "button" className='btn'>Sign Up</button></Link></li>
    </ul>
  </nav></div>
  )
}

export default navbar
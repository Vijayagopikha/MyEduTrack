import React,{useState} from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
const navbar = () => {
   const [isMobileView, setMobileView] = useState(false);
   const toggleMenu = () =>{
      setMobileView(!isMobileView);
   }
   const closeMenu = () => {
    setMobileView(false);
   }
  return (
    <div>
    <nav className='nav'>

    <h1>MyEduTrack</h1>
    <div className = 'hamburger' onClick={toggleMenu}>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <ul className={`navul ${isMobileView ? 'nav-active': ''}`}>
      {isMobileView && (
        <button className = 'close-btn' onClick = {closeMenu}>
          ✕
        </button>
      )}
        <li> <Link to = "/" onClick = {closeMenu}><a>Home</a></Link></li>
        <li><a href = "#" onClick = {closeMenu}>About</a></li>
        <li>
          <Link to = "/login"><button type= "button" className='btn1'>Sign In</button></Link></li>
        <li>  <Link to = "/signup"><button type= "button" className='btn'>Sign Up</button></Link></li>
    </ul>
  </nav></div>
  )
}

export default navbar
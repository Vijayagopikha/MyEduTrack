import React, { useState} from 'react'
import {Link} from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import sign from '../assets/s5.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Signup = () => {
  const [name, setName]  =useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/signup', {name, email, password})
    .then(result => {console.log(result);
      toast.success("Signup Successful!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: { backgroundColor: "#90EE90", color: "black" }, // Light green background
      });
      setTimeout(() => navigate('/login'), 3000); // Redirect after toast
    })
    .catch(err => {
      console.log(err);
      toast.error("Signup Failed! Try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: { backgroundColor: "#FF7F7F", color: "white" }, // Light red background
      });
    });
  }
  return (
    <div className='outer'>
      <div className='signcon'>
        <img src = {sign} alt = "signup"></img>
      <div className='sign'>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor = "name">Username:</label>
            <input type = "text" placeholder='Enter your name' id= "name" 
              name = "name" value = {name} 
              onChange={(e) => setName(e.target.value)}
              required />
              
          </div>
          <div>
           <label htmlFor = "email">Email:</label> 
           <input type = "email" placeholder='Enter your email' id = "email"
           name=  "email" value = {email}
           onChange = {(e) => setEmail(e.target.value)}
           required />
          </div>
           <div>
            <label htmlFor = "password">Password:</label>
            <input type = "password" placeholder = "Enter your password" id = "password"
            name = "password" value = {password}
            onChange = {(e) => setPassword(e.target.value)}
            required />
           </div>
           <button type = "submit" className='btn2'>Sign Up</button>
        </form>

        <p className = "conmy">Already have an account?<Link to = '/login' >Login Here</Link></p>
    </div>
    </div>
    </div>
  )
}

export default Signup;
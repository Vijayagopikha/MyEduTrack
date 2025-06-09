import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import login from '../assets/s4.png';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const result = await response.json(); // Convert response to JSON
      console.log(result);
      if (result.status === "success") {
        localStorage.setItem("userEmail", email); // Store email in localStorage
        toast.success("Login Successful!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,

          style: { backgroundColor: " #5afa5a", color: "white" }
        })
        setTimeout(() => navigate('/todo'), 3000);
      } else {
        toast.error("Invalid email or password!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (err) {
      console.error("Login Error:", err);
      toast.error("Something went wrong! Try again later.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };


  return (
    <div className='log-wrap'>
      <ToastContainer />
      <img src={login} alt="login"></img>
      <div className='login'>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email: </label>
            <input type="email" placeholder='enter your email' name="email" value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input type="password" placeholder='enter your password' name="password" value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <button type="submit" className='btn2'><Link to="/todo">Login</Link></button>
        </form>
        <p className='conmy'>Dont have an account?<Link to="/signup">Sign Up</Link></p>
      </div>
    </div>
  )
}

export default Login;
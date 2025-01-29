import React, { useState} from 'react'
import {Link} from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName]  =useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/signup', {name, email, password})
    .then(result => {console.log(result)
    navigate('/login')
    })
    .then(err => console.log(err))
  }
  return (
    <div>
      <div className='sign'>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor = "name">Username:</label>
            <input type = "text" placeholder='Enter you name' id= "name" 
              name = "name" value = {name} 
              onChange={(e) => setName(e.target.value)}
              required />
              
          </div>
          <div>
           <label htmlFor = "email">Email:</label> 
           <input type = "email"  id = "email"
           name=  "email" value = {email}
           onChange = {(e) => setEmail(e.target.value)}
           required />
          </div>
           <div>
            <label htmlFor = "passowrd">Password:</label>
            <input type = "password" placeholder = "Enter your password" id = "password"
            name = "password" value = {password}
            onChange = {(e) => setPassword(e.target.value)}
            required />
           </div>
           <button type = "submit" className='btn'>Sign Up</button>
        </form>

        <p className = "conmy">Already have an account?<Link to = '/login' >Login</Link></p>
    </div>
    </div>
  )
}

export default Signup;
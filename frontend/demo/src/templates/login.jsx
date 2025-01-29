import React , {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [email, setEmail] = useState();
  const [password,setPassword] = useState();

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/login' , {email, password})
    .then(result => {console.log(result)
     if(result.data === "success"){
      navigate('/home')
     }
    })
    .then(err => console.log(err))
  }
  return (
    <div>
      <div className='login'>
        <h2>Login</h2>
        <form onSubmit = {handleSubmit}>
          <div>
            <label htmlfor = "email">Email: </label>
            <input type= "email" placeholder='enter email' name = "email" value ={email}
            onChange = {(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlfor = "password">Password: </label>
            <input type= "password" placeholder='enter password' name = "password" value ={password}
            onChange = {(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <button type = "button" className='btn'><Link to ="/">Login</Link></button>
        </form>
        <p>Dont have an account?<Link to = "/signup">Sign Up</Link></p>
      </div>
    </div>
  )
}

export default Login;
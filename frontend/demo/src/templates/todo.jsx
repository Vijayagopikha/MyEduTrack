import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './styles.css';

import { MdDelete } from "react-icons/md";
import { GiCheckMark } from "react-icons/gi";

const Todo = () => {

    const [title,setTitle] = useState();
    const [description,setDescription] = useState();
    const [deadLine, setDeadLine] = useState();

    const[todo,setTodo] = useState([]);

    const [isActive, setIsActive] = useState(false);

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('' , {title,description,deadLine})
        .then(result => {console.log(result)
            navigate('/home')
        })
        .then(err => console.log(err))
         
    }
    return(
        <div>
          <h1>My ToDo's</h1>
          <div>
            <div>
                <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='title'>Title:</label>
                    <input type = "text" placeholder = "What's the task title"
                    id = "title" name = "title" value = {title}
                    onChange={(e) => setTitle(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor='description'>Discription:</label>
                    <input type = "text" placeholder = "What's the task discription"
                    id = "description" name = "description" value = {description}
                    onChange={(e) => setDescription(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor='dead-line'>Dead Line:</label>
                    <input type = "date" placeholder = "Dead Line of the task"
                    id = "deadline" name = "deadLine" value = {deadLine}
                    onChange={(e) => setDeadLine(e.target.value)}
                    ></input>
                </div>
                <button type = "submit" className='btn'>Add</button>
                </form>
            </div>
            <div>
                <button type = "button" className={`isActive ${isActive === false && 'active'}`} 
                onClick = {() => setIsActive(false) }>ToDo</button> 
                <button type = "button" className={`isActive ${isActive === true && 'active'}`}
                onClick = {() => setIsActive(true)}>Completed</button>
            </div>
            <div>
                <div>
                    <div>
                        <MdDelete className='icon'></MdDelete>
                        <GiCheckMark className='icon1'></GiCheckMark>
                    </div>
                </div>
            </div>
          </div>
        </div>
    )
}
export default Todo;
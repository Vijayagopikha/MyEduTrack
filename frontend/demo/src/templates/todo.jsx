import React, {useEffect, useState} from 'react';

import {useNavigate} from 'react-router-dom';
import './styles.css';

import { MdDelete } from "react-icons/md";
import { GiCheckMark } from "react-icons/gi";


const ConfirmationModal = ( {message, onConfirm, onCancel}) => {
    <div className='model-over'>
        <div className='modal'>
            <p>{message}</p>
            <button onClick = {onConfirm} className='btn-yes'>Yes</button>
            <button onClick = {onCancel} className='btn-no'>No</button>
        </div>
    </div>
}
const Todo = () => {

    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [deadline, setDeadline] = useState("");

    const[todo,setTodo] = useState([]);

    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        fetch('http://localhost:5000/todos')
        .then(res => res.json())
        .then(data => setTodo(data))
        .catch(err =>  console.log(err))
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault();
        let newTodo = {
          title,
          description,
           deadline,
           isCompleted: false,
        }
        fetch('http://localhost:5000/todos' , {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTodo)
        })
        .then((response) => response.json())
        .then((data) => {console.log(data)
           setTodo([...todo, data]);
           setTitle("")
           setDescription("")
           setDeadline("")
        })
        .catch((err) => console.log(err))
         
    }
 

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
        fetch(`http://localhost:5000/todos/${id}`, {
            method: 'DELETE'
        })
        .then(() => setTodo(todo.filter((todo) => todo._id !== id)))
        .catch((err) => console.log(err))
    }
}
    const handleCompleted = (id) => {
        if (window.confirm('Are you sure you want to mark this task as completed?')) {
       fetch(`http://localhost:5000/todos/${id}` ,{
        method: 'PATCH',
        headers:{'Content-Type':'application/json'}, 
        body: JSON.stringify({ isCompleted: true }),
       })
       .then((res) => res.json())
       .then((updatedTodo) => {
           setTodo(todo.map((todo) => (todo._id === id) ? updatedTodo: todo));
       })
       .catch((err) => console.log(err));
    }
    }

    return(
        <div>
          <h1>My ToDo's</h1>
          <div>
            <div className='todo-flex'>
                <form onSubmit = {handleSubmit}>
                <div>
                    <label htmlFor='title'>Title:</label>
                    <input type = "text" placeholder = "What's the task title"
                    id = "title" name = "title" value = {title}
                    onChange={(e) => setTitle(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor='description'>Description:</label>
                    <input type = "text" placeholder = "What's the task discription"
                    id = "description" name = "description" value = {description}
                    onChange={(e) => setDescription(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor='dead-line'>Dead Line:</label>
                    <input type = "date" placeholder = "Dead Line of the task"
                    id = "deadline" name = "deadline" value = {deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    ></input>
                </div>
                <button type = "submit" className='btn' >Add</button>
                </form>
            </div>
            <div>
                <button type = "button" className={`isActive ${!isActive && 'active'}`} 
                onClick = {() => setIsActive(false) }>ToDo</button> 
                <button type = "button" className={`isActive ${isActive && 'active'}`}
                onClick = {() => setIsActive(true)}>Completed</button>
            </div>
            <div className='todo-list'>
                {todo
                .filter(item => isActive ? item.isCompleted : !item.isCompleted)
                .map((item,index) => {
                     return (
                        <div className='todo-list-item' key = {item._id}>
                            <div>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                                <p>{item.deadline}</p>
                            </div>
                        <div>
                            <MdDelete className='icon' onClick = {() => handleDelete(item._id)}></MdDelete>
                            {!item.isCompleted &&
                            <GiCheckMark className='icon1' onClick = {() => handleCompleted(item._id)}></GiCheckMark>
                           }
                        </div>
                    </div>
                     )
                })}
               
            </div>
          </div>
        </div>
    )
}
export default Todo;






/*import React, { useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { GiCheckMark } from "react-icons/gi";
import './styles.css';

const ConfirmationModal = ({ message, onConfirm, onCancel }) => (
  <div className="modal-overlay">
    <div className="modal">
      <p>{message}</p>
      <button onClick={onConfirm} className="btn confirm">Yes</button>
      <button onClick={onCancel} className="btn cancel">No</button>
    </div>
  </div>
);

const Todo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [todo, setTodo] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, action: null, id: null });

  useEffect(() => {
    fetch('http://localhost:5000/todos')
      .then(res => res.json())
      .then(data => setTodo(data))
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = { title, description, deadline, isCompleted: false };

    fetch('http://localhost:5000/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodo)
    })
      .then(response => response.json())
      .then(data => {
        setTodo([...todo, data]);
        setTitle("");
        setDescription("");
        setDeadline("");
      })
      .catch(err => console.log(err));
  };

  const confirmAction = (action, id) => {
    setModal({ isOpen: true, action, id });
  };

  const handleConfirm = () => {
    const { action, id } = modal;
    if (action === 'delete') {
      fetch(`http://localhost:5000/todos/${id}`, { method: 'DELETE' })
        .then(() => setTodo(todo.filter(todo => todo._id !== id)))
        .catch(err => console.log(err));
    } else if (action === 'complete') {
      fetch(`http://localhost:5000/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isCompleted: true })
      })
        .then(res => res.json())
        .then(updatedTodo => {
          setTodo(todo.map(todo => (todo._id === id ? updatedTodo : todo)));
        })
        .catch(err => console.log(err));
    }
    setModal({ isOpen: false, action: null, id: null });
  };

  return (
    <div>
      <h1>My ToDo's</h1>
      <form onSubmit={handleSubmit} className='todo-flex'>
        <input type="text" placeholder="Task title" value={title} onChange={e => setTitle(e.target.value)} />
        <input type="text" placeholder="Task description" value={description} onChange={e => setDescription(e.target.value)} />
        <input type="date" value={deadline} onChange={e => setDeadline(e.target.value)} />
        <button type="submit" className='btn'>Add</button>
      </form>

      <div>
        <button className={`isActive ${!isActive && 'active'}`} onClick={() => setIsActive(false)}>ToDo</button>
        <button className={`isActive ${isActive && 'active'}`} onClick={() => setIsActive(true)}>Completed</button>
      </div>

      <div className='todo-list'>
        {todo.filter(item => isActive ? item.isCompleted : !item.isCompleted).map(item => (
          <div className='todo-list-item' key={item._id}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>{item.deadline}</p>
            <MdDelete className='icon' onClick={() => confirmAction('delete', item._id)} />
            {!item.isCompleted && <GiCheckMark className='icon1' onClick={() => confirmAction('complete', item._id)} />}
          </div>
        ))}
      </div>

      {modal.isOpen && (
        <ConfirmationModal
          message={modal.action === 'delete' ? "Are you sure you want to delete this task?" : "Mark this task as completed?"}
          onConfirm={handleConfirm}
          onCancel={() => setModal({ isOpen: false, action: null, id: null })}
        />
      )}
    </div>
  );
};

export default Todo;
*/
import React, { useEffect, useState } from 'react';


import './styles.css';

import { MdDelete } from "react-icons/md";
import { GiCheckMark } from "react-icons/gi";
import { FaCheck } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Todo = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");

    const [todo, setTodo] = useState([]);

    const [isActive, setIsActive] = useState(false);
    const [successMessage, setSuccessMessage] = useState({ text: "", type: "" });

    useEffect(() => {
        const userEmail = localStorage.getItem("userEmail");
        if (userEmail) {
            fetch(`http://localhost:5000/todos?email=${userEmail}`)
                .then(res => res.json())
                .then(data => setTodo(data))
                .catch(err => console.log(err))
        }
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault();
        const userEmail = localStorage.getItem("userEmail");
        if (!userEmail) {
            showMessage("User not logged in!", "error");
            return;
        }
        let newTodo = {
            title,
            description,
            deadline,
            email: userEmail,
            isCompleted: false,

        }
        fetch('http://localhost:5000/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTodo)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setTodo([...todo, data]);
                setTitle("")
                setDescription("")
                setDeadline("")
                showMessage("Task added successfully!", "success")
            })
            .catch((err) => console.log(err))

    }


    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            fetch(`http://localhost:5000/todos/${id}`, {
                method: 'DELETE'
            })
                .then(() => {
                    setTodo(todo.filter((todo) => todo._id !== id));
                    toast.success("Task Deleted Successfully!", {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        style: { color: "black" },
                    })
                    showMessage("Task deleted successfully!", "success");
                })
                .catch((err) => {
                    console.log(err);
                    toast.error("Failed to delete task. Try again!", {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        style: { color: "white" }, // Light red background
                    });

                })

        }
    }
    const handleCompleted = (id) => {
        if (window.confirm('Are you sure you want to mark this task as completed?')) {
            fetch(`http://localhost:5000/todos/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isCompleted: true }),
            })
                .then((res) => res.json())
                .then((updatedTodo) => {
                    setTodo(todo.map((item) => (item._id === id ? updatedTodo : item)));
                    toast.success("Task moved to completed list!", {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        style: { color: "black" },
                    })
                    showMessage("Task moved to completed list!", "success");
                })
                .catch((err) => {
                    console.log(err)
                    toast.error("Failed to mark as completed. Try again!", {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        style: { backgroundColor: "#FF7F7F", color: "white" }, // Light red background
                    });
                });
        }

    }

    const showMessage = (message, type) => {
        setSuccessMessage({ text: message, type });
        setTimeout(() => {
            setSuccessMessage({ text: "", type: "" }); // Hide message after 3 seconds
        }, 3000);
    }

    return (
        <div className='todo-container'>
            <ToastContainer />
            <h1>Task Buddy</h1>
            {successMessage.text && (
                <div className={`success-message ${successMessage.type}`}>
                    <span className="success-icon">
                        <FaCheck />
                    </span>
                    {successMessage.text}
                </div>
            )}
            <form onSubmit={handleSubmit} className='todo-form'>
                <div className='todo-flex'>
                    <div className='todo-input'>
                        <label htmlFor='title'>Title:</label>
                        <input type="text" placeholder="What's the task title"
                            id="title" name="title" value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        ></input>
                    </div>
                    <div className='todo-input'>
                        <label htmlFor='description'>Description:</label>
                        <input type="text" placeholder="What's the task discription"
                            id="description" name="description" value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></input>
                    </div>
                    <div className='todo-input'>
                        <label htmlFor='dead-line'>Dead Line:</label>
                        <input type="date" placeholder="Dead Line of the task"
                            id="deadline" name="deadline" value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                        ></input>
                    </div>
                    <button type="submit" className='btn-add' >Add</button>
                </div>
            </form>

            <div className='todo-filter'>
                <button type="button" className={`isActive ${!isActive && 'active'}`}
                    onClick={() => setIsActive(false)}>ToDo</button>
                <button type="button" className={`isActive ${isActive && 'active'}`}
                    onClick={() => setIsActive(true)}>Completed</button>
            </div>
            <div className='todo-list'>
                {todo
                    .filter(item => isActive ? item.isCompleted : !item.isCompleted)
                    .map((item, index) => {
                        return (
                            <div className='todo-list-item' key={item._id}>
                                <div>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                    <p>{new Date(item.deadline).toISOString().split('T')[0]}</p>
                                </div>
                                <div className='icon-container'>
                                    {!item.isCompleted &&
                                        <GiCheckMark className='icon1' onClick={() => handleCompleted(item._id)}></GiCheckMark>
                                    }
                                    <MdDelete className='icon' onClick={() => handleDelete(item._id)}></MdDelete>

                                </div>
                            </div>
                        )
                    })}

            </div>
        </div>

    )
}
export default Todo;







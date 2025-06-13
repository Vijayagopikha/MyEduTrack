import React, { useEffect, useState } from 'react';
import './styles.css';

import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Marks = () => {

    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    const [marks, setMarks] = useState("");

    const [entry, setEntry] = useState([]);
    const [successMessage, setSuccessMessage] = useState({ message: "", type: "" })

    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        if (email) {
            fetch(`http://localhost:5000/marks?email=${email}`)
                .then(res => res.json())
                .then(data => setEntry(data))
                .catch(err => console.log(err))
        }
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();
        const email = localStorage.getItem("userEmail");
        if (!email) {
            showMessage("User not logged in!", "error");
            return;
        }
        let newEntry = {
            subject,
            description,
            marks,
            email: email
        }
        console.log("Submitting:", newEntry);

        fetch(`http://localhost:5000/marks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newEntry)
        })
            .then(res => res.json())
            .then((data) => {
                setEntry([...entry, data]);
                    setSubject("");
                    setDescription("");
                    setMarks("");
                    showMessage("Mark added successfully!", "success")
            })
            .catch(err => console.log(err))
    }

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this Msrk?')) {
            fetch(`http://localhost:5000/marks/${id}`, {
                method: 'DELETE'
            })
                .then(() => {
                    setEntry(entry.filter((entry) => entry._id !== id));
                    toast.success("Mark Deleted Successfully!", {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        style: { color: "black" },
                    })
                    showMessage("Mark deleted successfully!", "success");
                })
                .catch((err) => {
                    console.log(err);
                    toast.error("Failed to delete Mark. Try again!", {
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

    const showMessage = (message, type) => {
        setSuccessMessage({ text: message, type });
        setTimeout(() => {
            setSuccessMessage({ text: "", type: "" })
        }, 3000);
    }
    return (
        <div className='mark-container'>
            <ToastContainer />
            <h1>Marks</h1>

            {successMessage.text && (
                <div className={`success-message ${successMessage.type}`}>
                    <span className='success-icon'>
                        <FaCheck />
                    </span>
                    {successMessage.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className='mark-form'>
                <div className='mark-flex'>
                    <div className='mark-input'>
                        <label htmlFor='subject'>Subject:</label>
                        <input
                            type='text'
                            placeholder='Enter subject name'
                            id="subject"
                            name="subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}

                        />
                    </div>
                    <div className='mark-input'>
                        <label htmlFor="description">Description:</label>
                        <input
                            type="text"
                            placeholder='Enter subject details/description'
                            id="description"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className='mark-input'>
                        <label htmlFor="marks">Marks:</label>
                        <input
                            type="number"
                            placeholder='Enter subject marks'
                            id="marks"
                            name="marks"
                            value={marks}
                            onChange={(e) => setMarks(e.target.value)}
                        />
                    </div>

                    <button type="submit" className='btn-add'> Add</button>
                </div>
            </form>

            <div className='mark-list'>
                {entry.map((item) => (
                    <div className='mark-list-item' key={item._id}>
                        <div>
                            <h2>{item.subject}</h2>
                            <p>{item.description}</p>
                            <h3>{item.marks}</h3>
                        </div>
                        <div className='icon-container'>
                            <MdDelete className='icon' onClick={() => handleDelete(item._id)} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Marks;

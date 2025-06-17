import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import './styles.css';
// Default Calendar CSS
import 'react-calendar/dist/Calendar.css';
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

import { toast, ToastContainer } from 'react-toastify';

const Attendance = () => {
    const [attendanceHistory, setAttendanceHistory] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [attendance, setAttendance] = useState([]);
    const [student, setStudent] = useState();
    const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
    const [successMessage, setSuccessMessage] = useState({ text: "", type: "" });

    const BASE_URL = 'http://localhost:5000/attendance';

    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        if (email) {
            setStudent(email);
        }
    }, []);

    useEffect(() => {
        const fetchAttendanceHistory = async () => {
            if (!student) return; // prevent fetching with undefined student
            try {
                const response = await fetch(`${BASE_URL}/history/${student}`);
                const data = await response.json();
                setAttendanceHistory(data);

                const latestImage = data.find((entry) => entry.image);
                if (latestImage) {
                    setUploadedImageUrl(latestImage.image);
                }
            }
            catch (error) {
                console.error("Error fetching attendance history:", error);
            }
        };
        fetchAttendanceHistory();

    }, [student]);
    const handleCalendar = (date) => {
        setSelectedDate(date);
    };

    const handleAttendanceChange = (periodIndex, status) => {
        const updated = [...attendance];
        updated[periodIndex] = status;
        setAttendance(updated);
    };

    const handleSubmitAttendance = async () => {
        try {
            const attendanceDate = {
                email: student,
                date: selectedDate.toISOString(),
                attendance: attendance.map((status, index) => ({
                    period: index + 1,
                    status: status || 'Present',
                })),
            };
            const response = await fetch(`${BASE_URL}/mark`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(attendanceDate),
            });

            const data = await response.json();

            if (response.ok) {
                setAttendanceHistory((prev) => [...prev, data.record]);
                setAttendance([]); // Reset the form
                toast.success("Attendance submitted successfully!", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    style: { color: "black" },
                });
            } else {
                throw new Error(data.message || "Submission failed");
            }
        }
        catch (error) {
            console.error('Error submitting attendance', error);
            toast.error("Error submitting attendance. Please try again.", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                style: { color: "white" },
            });
        }
    }
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formdata = new FormData();
            formdata.append('image', file);
            formdata.append('email', student);
            formdata.append('date', selectedDate.toISOString());

            try {
                const response = await fetch(`${BASE_URL}/uploadImage`, {
                    method: 'POST',
                    body: formdata,
                });
                const data = await response.json();
                /*image*/
                if (response.ok) {
                    setUploadedImageUrl(`${data.imageUrl}?t=${new Date().getTime()}`);

                    if (data.updatedRecord && data.updatedRecord._id) {
                        setAttendanceHistory((prev) =>
                            prev.map((item) =>
                                item._id === data.updatedRecord._id ? data.updatedRecord : item
                            )
                        );
                    } toast.success("Image uploaded successfully!");
                } else {
                    toast.error(data.message || "Image upload failed.");
                }

            } catch (error) {
                console.error('Error uploading image', error);
            }
        }
    };
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this attendance record?')) {
            fetch(`${BASE_URL}/${id}`, {
                method: 'DELETE'
            })
                .then(() => {
                    setAttendanceHistory(attendanceHistory.filter((entry) => entry._id !== id));
                    toast.success("Attendance Deleted Successfully!", {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        style: { color: "black" },
                    })
                    showMessage("Attendance deleted successfully!", "success");
                })
                .catch((error) => {
                    console.log(error);
                    toast.error("Failed to delete attendance. Try again!", {
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
    const renderAttendanceHistory = () => {

        return attendanceHistory.map((entry, index) => (

            <div className='att-list-item' key={entry._id}>
                <h4>{new Date(entry.date).toLocaleDateString()}</h4>
                <ul>
                    {entry.attendance.map((status, i) => (
                        <li key={i}>
                            Period {i + 1} : {status && status.status ? status.status : "N/A"}
                        </li>
                    ))}
                </ul>
                <div className='icon-container'>
                    <MdDelete className='icon' onClick={() => handleDelete(entry._id)} />
                </div>
            </div>
        ));
    };
    const showMessage = (message, type) => {
        setSuccessMessage({ text: message, type });
        setTimeout(() => {
            setSuccessMessage({ text: "", type: "" });
        }, 3000);
    }
    return (
        <div className='attendance-page'>
            <ToastContainer />
            <h1 className='heading1'>Attendance Page</h1>
            {successMessage.text && (
                <div className={`success-message ${successMessage.type}`}>
                    <span className='success-icon'>
                        <FaCheck />
                    </span>
                    {successMessage.text}
                </div>
            )}
            <div className='upload-image'>
                <label htmlFor='image-upload'> Upload Image: </label>
                <input type="file" id="image-upload" onChange={handleImageUpload} />
                {uploadedImageUrl && (
                    <img
                        src={uploadedImageUrl}
                        alt="Uploaded Time Table"
                        className='att-img'
                        style={{ width: '200px', marginTop: '10px' }}
                    />
                )}
            </div>
            <Calendar onChange={handleCalendar} value={selectedDate} />
            {/* Daily Attendance Marking Section */}
            <div className="daily-attendance">
                <h2 className='heading2'>Marks Today's Attendance</h2>
                <div className='attendance-form'>
                    <h3>Periods: </h3>{
                        Array.from({ length: 8 }, (_, i) => (
                            <div key={i}>
                                <span>Period: {i + 1}</span>
                                <select
                                    value={attendance[i] || ''}
                                    onChange={(e) => handleAttendanceChange(i, e.target.value)}
                                >
                                    <option value="">Select</option>
                                    <option value="Present">Present</option>
                                    <option value="Absent">Absent</option>
                                    <option value="On-Duty">On-Duty</option>
                                </select>

                            </div>

                        ))}

                </div>
                <button onClick={handleSubmitAttendance} className="btn9">Submit attendance</button>
            </div>
            {/* Attendance History Section */}
            <div className="attendance-history">
                <h2 className='heading2'>Attendance history</h2>
                {renderAttendanceHistory()}
            </div>
        </div>


    );
}



export default Attendance;
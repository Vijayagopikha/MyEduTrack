import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';

// Default Calendar CSS
import 'react-calendar/dist/Calendar.css';

const Attendance = () => {
    const [attendanceHistory, setAttendanceHistory] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [attendance, setAttendance] = useState([]);
    const [student, setStudent] = useState(); // Example student ID
    const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

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
            // data.data is the newly created attendance record from the backend
            setAttendanceHistory((prev) => [...prev, data.data]);
            setAttendance([]); // Reset the attendance form
        }
        catch (error) {
            console.error('Error submitting attendance', error);

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
                const date = await response.json();
                setUploadedImageUrl(date.imageUrl);
            } catch (error) {
                console.error('Error uploading image', error);
            }
        }
    };
    const renderAttendanceHistory = () => {
        
        return attendanceHistory.map((entry, index) => (
            
            <div key={index}>
                <h4>{new Date(entry.date).toLocaleDateString()}</h4>
                <ul>
                    {entry.attendance.map((status, i) => (
                        <li key={i}>
                            Period {i + 1} : {status.status}
                        </li>
                    ))}
                </ul>
                
            </div>
        ));
    };
    return (
        <div className='attendance-page'>
            <h1>Attendance Page</h1>
            <div className='upload-image'>
                <label htmlFor='image-upload'> Upload Image</label>
                <input type="file" id="image-upload" onChange={handleImageUpload} />
                {uploadedImageUrl && (
                    <img
                        src={uploadedImageUrl}
                        alt="Uploaded Time Table"
                        style={{ width: '200px', marginTop: '10px' }}
                    />
                )}
            </div>
            <Calendar onChange={handleCalendar} value={selectedDate} />
            {/* Daily Attendance Marking Section */}
            <div className="daily-attendance">
                <h2>Marks Today's Attendance</h2>
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
                <h2>Attendance history</h2>
                {renderAttendanceHistory()}
            </div>
        </div>


    );
}



export default Attendance;
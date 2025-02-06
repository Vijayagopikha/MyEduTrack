import React ,{useState, useEffect } from 'react';
import './styles.css';

const Attendence = () => {
    const [file, setFile] = useState();
    const handleUpload = (e) => {
        console.log(file);
    }
    return(
        <div>
            <div className='image'>
                <input type = "file" onChange = {(e) => setFile(e.target.files[0])}></input>
                <button type = "button" onClick = {handleUpload}>Upload</button>

            </div>
        </div>
    )
}
export default Attendence;
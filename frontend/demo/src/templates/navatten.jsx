
import './styles.css';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Navatten = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('userEmail');
        toast.success("Logout Successful!", {
            position: "top-right",
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            style: { backgroundColor: "#90EE90", color: "black" },
        });
        setTimeout(() => navigate('/'), 1000);
    }
    return (
        <div>
            <ToastContainer />
            <nav className='nav'>
                <h1>MyEduTrack</h1>
                <ul className='navul'>
                    <li>
                        <Link to='/todo'><button className='btn' type='button'>ToDo</button></Link>
                    </li>
                    <li>  <Link to="/signup"><button type="button" className='btn'>Marks</button></Link></li>
                    <li><button type="button" className='btn' onClick={handleLogout}>LogOut</button></li>
                </ul>
            </nav>
        </div>
    )
}
export default Navatten;
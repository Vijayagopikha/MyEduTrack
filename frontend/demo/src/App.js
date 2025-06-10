import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './templates/layout';
import Layout2 from "./templates/layout2";
import Home from './templates/home';
import Signup from './templates/signup';
import Login from './templates/login';
import Todo from './templates/todo';
import Attendance from './templates/attendence';
const App = () => {
    return (
        <Router>

            <Routes>
                <Route path="/" element={<Layout><Home /></Layout>}></Route>
                <Route path="/signup" element={<Layout><Signup /></Layout>}></Route>
                <Route path="/login" element={<Layout><Login /></Layout>}></Route>
                <Route path="/todo" element={<Layout2><Todo /></Layout2>}></Route>
                <Route path="/attendance" element={<Attendance />}></Route>
            </Routes>

        </Router>
    )
}

export default App;
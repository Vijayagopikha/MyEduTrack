import  {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './templates/home';
import Signup from './templates/signup';
import Login from './templates/login';
const App = () => {
    return(
        <Router>
            <Routes>
            <Route path = "/" element = {<Home />}></Route>
            <Route path = "/signup"  element = {<Signup />}></Route>
            <Route path = "/login" element = {<Login />}></Route>
            </Routes>
        </Router>
    )
}

export default App;
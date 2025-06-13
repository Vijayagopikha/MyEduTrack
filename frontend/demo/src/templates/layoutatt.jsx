import {useLocation} from 'react-router-dom';
import NavbarAt from './navatten';

const LayoutAtt = ({ children}) => {
    const location = useLocation();
    const excludedRoutes = ['/home','/navbar','/login','/signup','/todo'];
    const shouldShowNavbar = !excludedRoutes.some(route => location.pathname.startsWith(route));
    return (
        <div>
            {shouldShowNavbar && <NavbarAt />}
      {children}
        </div>
    )
}
export default LayoutAtt;
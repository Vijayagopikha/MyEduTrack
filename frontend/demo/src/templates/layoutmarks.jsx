import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbarmarks from './navmarks';

const Layoutmarks = ({ children }) => {
  const location = useLocation();
  const excludedRoutes = ['/home','/navbar','/login','/signup','/todo','/attendance']; // Pages where Navbar should NOT appear

  return (
    <div>
      {!excludedRoutes.includes(location.pathname) && <Navbarmarks />}
      {children}
    </div>
  );
};

export default Layoutmarks;

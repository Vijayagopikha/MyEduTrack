import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar2 from './nav2';

const Layout2 = ({ children }) => {
  const location = useLocation();
  const excludedRoutes = ['/home', '/navbar', '/login', '/signup','/attendance','/marks'];

  const shouldShowNavbar = !excludedRoutes.some(route => location.pathname.startsWith(route));

  return (
    <div>
      {shouldShowNavbar && <Navbar2 />}
      {children}
    </div>
  );
};

export default Layout2;

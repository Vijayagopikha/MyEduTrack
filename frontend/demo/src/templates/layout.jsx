import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './navbar';

const Layout = ({ children }) => {
  const location = useLocation();
  const excludedRoutes = ['/todo','/attendance','/marks']; // Pages where Navbar should NOT appear

  return (
    <div>
      {!excludedRoutes.includes(location.pathname) && <Navbar />}
      {children}
    </div>
  );
};

export default Layout;

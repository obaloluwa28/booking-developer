// components/Layout.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  const location = useLocation();
  
  // Hide navbar and footer on these routes
  const hideNavFooterRoutes = ['/admin', '/auth'];
  const shouldHide = hideNavFooterRoutes.some(route => location.pathname.startsWith(route));
  
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {!shouldHide && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      {!shouldHide && <Footer />}
    </div>
  );
};

export default Layout;
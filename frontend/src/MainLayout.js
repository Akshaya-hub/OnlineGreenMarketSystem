// MainLayout.js
import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet /> {/* This will render child routes here */}
    </div>
  );
};

export default MainLayout;

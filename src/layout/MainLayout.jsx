import React from 'react';
import Navbar from './Navbar/Navbar';
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
        <div className='bg-[#d6edf1] '>
            <Navbar></Navbar>
            <Outlet></Outlet>
            MainLayout
        </div>
    );
};

export default MainLayout;
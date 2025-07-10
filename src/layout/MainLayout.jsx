import React from 'react';
import Navbar from './Navbar/Navbar';
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
        <div className='bg-[#d6edf1] '>
            <div className='w-11/12 mx-auto'>
                <Navbar></Navbar>
                <Outlet></Outlet>
                MainLayout
            </div>
        </div>
    );
};

export default MainLayout;
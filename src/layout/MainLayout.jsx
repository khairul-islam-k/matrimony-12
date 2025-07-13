import React from 'react';
import Navbar from './Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from './Footer/Footer';

const MainLayout = () => {
    return (
        <div className='bg-[#d6edf1] '>
            <div className='w-11/12 mx-auto'>
                <Navbar></Navbar>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;
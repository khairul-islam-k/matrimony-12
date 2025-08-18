import React, { useEffect } from 'react';
import Navbar from './Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from './Footer/Footer';

const MainLayout = () => {
    useEffect(() => {
        const localTheme = localStorage.getItem('theme');
        document.querySelector('html').setAttribute('data-theme', localTheme);
    },[])
    return (
        <div className='bg-base-100 '>
            <Navbar></Navbar>
            <div className='w-11/12 mx-auto'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;
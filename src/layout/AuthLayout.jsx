import React from 'react';
import { Outlet } from 'react-router';
import registerLogo from "../assets/register.png";
import Navbar from './Navbar/Navbar';

const AuthLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="min-h-screen flex flex-col-reverse md:flex-row items-center justify-center px-6 bg-gray-50 gap-8">
                {/* Left: Form (on bottom in mobile, left in desktop) */}
                <Outlet></Outlet>
                {/* Right: Image (on top in mobile) */}
                <div className="w-full md:w-1/2 flex justify-center">
                    <img
                        src={registerLogo}
                        alt="Registration Visual"
                        className="w-full max-w-sm rounded-lg shadow-lg"
                    />
                </div>
            </div>

        </div>
    );
};

export default AuthLayout;
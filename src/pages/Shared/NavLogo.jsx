import React from 'react';
import logo from "../../assets/matrimony-logo.png";
import { Link } from 'react-router';

const NavLogo = () => {
    return (
        <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="h-8 w-8 object-cover" />
            <span className="text-xl font-bold text-gray-800">Matri<span className='text-[#F9A51A]'>mony</span></span>
        </Link>
    );
};

export default NavLogo;
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../../assets/matrimony-logo.png";
import "./Navbar.css";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const links = <>
        <li className='font-bold'><NavLink to="/">Home</NavLink></li>
        <li className='font-bold'><NavLink to="/biodatas">Biodatas</NavLink></li>
        <li className='font-bold'><NavLink to="/aboutUs">About Us</NavLink></li>
        <li>
            <Link
                to="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
                Login
            </Link>
        </li>
    </>

    // Automatically close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    return (
        <nav className=" shadow-md px-4 py-3 relative z-50">
            <div className="flex items-center justify-between">
                {/* Logo + Site Name */}
                <Link to="/" className="flex items-center space-x-2">
                    <img src={logo} alt="Logo" className="h-8 w-8 object-cover" />
                    <span className="text-xl font-bold text-gray-800">Matri<span className='text-[#F9A51A]'>mony</span></span>
                </Link>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-gray-700" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-6">
                    <ul className="flex items-center space-x-6 text-gray-600">
                        {links}
                    </ul>

                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md mt-1 px-4 py-3">
                    <ul className="flex flex-col space-y-3 text-gray-700 ">
                        {links}
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

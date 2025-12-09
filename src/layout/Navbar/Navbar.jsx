import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { FiMenu, FiX } from "react-icons/fi";
import "./Navbar.css";
import useAuth from "../../hooks/useAuth";
import NavLogo from "../../pages/Shared/NavLogo";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : "light");
    
        const handleToggle = () => {
            if (theme === "dark") {
                setTheme("light");
            } else {
                setTheme("dark");
            }
        }

    const { logoutUser, user } = useAuth();

    const handleLogout = () => {
        logoutUser()
            .then(() => {
                //logout
            }).catch(error => {
                console.log(error);
            })
    }

    const links = <>
        <li className='font-bold'><NavLink to="/">Home</NavLink></li>
        <li className='font-bold'><NavLink to="/biodatas">Biodatas</NavLink></li>
        <li className='font-bold'><NavLink to="/aboutUs">About Us</NavLink></li>
        <li className='font-bold'><NavLink to="/contact">Contact Us</NavLink></li>
        <li className='font-bold'><NavLink to="/dashboard">Dashboard</NavLink></li>
        <li>
            {
                user ? <button
                    onClick={handleLogout}
                    className="px-10 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
                >LogOut</button> : <Link
                    to="/login"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Login
                </Link>
            }
        </li>

        <li>
            <label className="toggle text-base-content">
                <input
                    onClick={handleToggle}
                    type="checkbox"
                    checked={theme === "dark" ? true : false}
                    className="theme-controller" />

                <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></g></svg>

                <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></g></svg>

            </label>
        </li>
    </>

    useEffect(() => {
            localStorage.setItem('theme', theme);
            const localTheme = localStorage.getItem("theme");
            document.querySelector('html').setAttribute("data-theme", localTheme);
        }, [theme])

    // Automatically close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    return (
        <nav className="py-3 px-4 z-50 bg-base-100 w-full fixed">
            <div className="flex items-center justify-between">
                {/* Logo + Site Name */}
                <NavLogo></NavLogo>

                {/* Mobile Menu Button */}
                <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-6">
                    <ul className="flex items-center space-x-6">
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

import React from 'react';
import { Link } from 'react-router';
import { FiAlertTriangle } from 'react-icons/fi';

const Forbidden = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4 text-center">
            <FiAlertTriangle className="text-red-500 text-7xl mb-4" />
            <h1 className="text-5xl font-bold text-gray-800 mb-2">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
            <p className="text-gray-500 mb-6 max-w-md">
                Sorry, the page you're looking for doesn't exist or might have been moved.
            </p>
            <Link
                to="/"
                className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
            >
                Back to Home
            </Link>
        </div>
    );
};

export default Forbidden;
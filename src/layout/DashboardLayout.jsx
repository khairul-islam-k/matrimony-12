import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router';
import { FiMenu } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import NavLogo from '../pages/Shared/NavLogo';
import useMyDetails from '../hooks/useMyDetails';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {myBiodata} = useMyDetails();


  const dashLink = <>
    <li><NavLink to="/dashboard">Home</NavLink></li>

    {
      myBiodata ? <li><NavLink to="/dashboard/editBiodata">Edit Biodata</NavLink></li> : <li><NavLink to="/dashboard/createBiodata">create Biodata</NavLink></li>
    }

    {/* <li><NavLink to="/dashboard/createBiodata">create Biodata</NavLink></li> */}
    <li><NavLink to="/dashboard/manage">Manage User</NavLink></li>
    <li><NavLink to="/dashboard/myRequest">My Contact Request</NavLink></li>
    <li><NavLink to="/dashboard/approvedContactRequest">Approved contact request</NavLink></li>
    <li><NavLink to="/dashboard/favorite">My Favourites Biodata</NavLink></li>
    <li><NavLink to="/dashboard/viewBiodata">View Biodata</NavLink></li>
  </>

  return (
    <div className="flex overflow-hidden h-screen">
      {/* Sidebar for large screens */}
      <div className="hidden lg:flex lg:flex-col w-64 bg-gray-100 p-4 shadow ">

        {/* logo */}
        <NavLogo></NavLogo>

        <ul className="space-y-2">
          {dashLink}
        </ul>
      </div>

      {/* Sidebar for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          <div className="w-64 bg-white p-4 shadow-lg">
            <div className="flex justify-between items-center mb-6">

              {/* logo */}
              <NavLogo></NavLogo>

              <button onClick={() => setSidebarOpen(false)}>
                <IoClose size={24} />
              </button>
            </div>
            <ul className="space-y-2">
              {dashLink}
            </ul>
          </div>
          <div className="flex-1 bg-black bg-opacity-40" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Mobile navbar */}
        <div className="lg:hidden bg-gray-200 p-4 flex items-center justify-between shadow">
          <button onClick={() => setSidebarOpen(true)}>
            <FiMenu size={24} />
          </button>

          <h1 className="text-xl font-semibold">Dashboard</h1>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 bg-[#d6edf1]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

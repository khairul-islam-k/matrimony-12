import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router';
import { FiMenu } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import NavLogo from '../pages/Shared/NavLogo';
import useMyDetails from '../hooks/useMyDetails';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { myBiodata } = useMyDetails();
  const { logoutUser } = useAuth();

  const handleLogOut = () => {
    logoutUser()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "LogOut successfully",
          showConfirmButton: false,
          timer: 1500
        });
      })
  }


  const dashLink = <>
  <NavLogo></NavLogo>
    <li><NavLink to="/dashboard">Home</NavLink></li>

    {
      myBiodata ? <li><NavLink to="/dashboard/editBiodata">Edit Biodata</NavLink></li> : <li><NavLink to="/dashboard/createBiodata">create Biodata</NavLink></li>
    }


    {
      myBiodata?.Biodata_Id === 'admin' && <>
        <li><NavLink to="/dashboard/manage">Manage User</NavLink></li>
        <li><NavLink to="/dashboard/approvedPremium">Approved premium</NavLink></li>
        <li><NavLink to="/dashboard/premiumApproval">My premium Approval</NavLink></li>
        <li><NavLink to="/dashboard/approvedContactRequest">Approved contact request</NavLink></li>
        <li><NavLink to="/dashboard/myContactApproval">My Contact Approval</NavLink></li>
        <li><NavLink to="/dashboard/successStory">success story</NavLink></li>
        <li><NavLink to="/dashboard/table">demo table</NavLink></li>
      </>
    }

    {
      myBiodata?.Biodata_Id === 'user' && <>
        <li><NavLink to="/dashboard/viewBiodata">View Biodata</NavLink></li>
        <li><NavLink to="/dashboard/favorite">My Favourites Biodata</NavLink></li>
        <li><NavLink to="/dashboard/myRequest">My Contact Request</NavLink></li>
        <li><NavLink to="/dashboard/gotMarried">Create a Got Married</NavLink></li>
      </>
    }

    <li><button
      onClick={handleLogOut}
      className='mt-2 px-4 py-1 bg-gray-800 text-white rounded hover:bg-blue-600 cursor-pointer'>LogOut</button></li>


  </>

  return (
    <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">

                {/* Navbar */}
                <div className="navbar bg-base-300 w-full  lg:hidden">
                    <div className="flex-none">
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2">Navbar Title</div>
                </div>
                {/* Page content here */}
                <Outlet></Outlet>
                {/* Page content here */}
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    {/* <ProFastLogo></ProFastLogo> */}
                    {dashLink}

                </ul>
            </div>
        </div>
  );
};

export default DashboardLayout;

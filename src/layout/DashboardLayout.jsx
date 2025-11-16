import React, { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router';
import NavLogo from '../pages/Shared/NavLogo';
import useMyDetails from '../hooks/useMyDetails';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import { HiHome, HiUserCircle, HiClipboardList, HiStar, HiUserGroup, HiLogout, HiCheckCircle, HiHeart, HiDocumentAdd, HiUsers } from "react-icons/hi";


const DashboardLayout = () => {
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
    <li>
      <NavLink to="/dashboard" className="flex items-center gap-2">
        <HiHome /> Home
      </NavLink>
    </li>

    {
      myBiodata ? (
        <li>
          <NavLink to="/dashboard/editBiodata" className="flex items-center gap-2">
            <HiUserCircle /> Edit Biodata
          </NavLink>
        </li>
      ) : (
        <li>
          <NavLink to="/dashboard/createBiodata" className="flex items-center gap-2">
            <HiUserCircle /> Create Biodata
          </NavLink>
        </li>
      )
    }

    {
      myBiodata?.Biodata_Id === "admin" && (
        <>
          <li>
            <NavLink to="/dashboard/manage" className="flex items-center gap-2">
              <HiUsers /> Manage User
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/approvedPremium" className="flex items-center gap-2">
              <HiCheckCircle /> Approved Premium
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/premiumApproval" className="flex items-center gap-2">
              <HiClipboardList /> My Premium Approval
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/approvedContactRequest" className="flex items-center gap-2">
              <HiCheckCircle /> Approved Contact Request
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/myContactApproval" className="flex items-center gap-2">
              <HiClipboardList /> My Contact Approval
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/manageAllBioData" className="flex items-center gap-2">
              <HiClipboardList /> Manage All BioData
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/successStory" className="flex items-center gap-2">
              <HiStar /> Success Story
            </NavLink>
          </li>
        </>
      )
    }

    {
      myBiodata?.Biodata_Id === "user" && (
        <>
          <li>
            <NavLink to="/dashboard/viewBiodata" className="flex items-center gap-2">
              <HiUserCircle /> View Biodata
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/favorite" className="flex items-center gap-2">
              <HiHeart /> My Favourites Biodata
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/myRequest" className="flex items-center gap-2">
              <HiClipboardList /> My Contact Request
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/gotMarried" className="flex items-center gap-2">
              <HiDocumentAdd /> Create a Got Married
            </NavLink>
          </li>
        </>
      )
    }

    <li>
      <button
        onClick={handleLogOut}
        className="flex items-center gap-2 mt-2 px-4 py-1 bg-gray-800 text-white rounded hover:bg-blue-600 cursor-pointer"
      >
        <HiLogout /> LogOut
      </button>
    </li>


  </>

  useEffect(() => {
    const localTheme = localStorage.getItem('theme');
    document.querySelector('html').setAttribute("data-theme", localTheme);
  }, [])

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
          <div className="mx-2 flex-1 px-2">DashBoard</div>
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

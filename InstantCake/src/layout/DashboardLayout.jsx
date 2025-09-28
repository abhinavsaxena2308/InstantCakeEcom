import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import { MdDashboard, MdDashboardCustomize } from "react-icons/md";
import {
  FaEdit,
  FaLocationArrow,
  FaPlusCircle,
  FaQuestionCircle,
  FaRegUser,
  FaShoppingBag,
  FaUser,
} from "react-icons/fa";

import logo from "/logo.png";
import { FaCartShopping } from "react-icons/fa6";
import Login from "../components/Login";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const sharedLinks = (
  <>
    <li className="mt-3">
      <Link to="/">
        <MdDashboard className="text-orange-700"/> Home
      </Link>
    </li>
    <li>
        <Link to="/menu"><FaCartShopping className="text-orange-700"/> Menu</Link>
    </li>
    <li>
        <Link to="/menu"><FaLocationArrow className="text-orange-700"/> Orders Tracking</Link>
    </li>
    <li>
        <Link to="/menu"><FaQuestionCircle className="text-orange-700"/> Customer Support</Link>
    </li>
  </>
);

const DashboardLayout = () => {
  const {logOut} = useContext(AuthContext)
  const handleLogout = () => {
    logOut().then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }
  const {loading} = useAuth()
  const [isAdmin, isAdminLoading] = useAdmin()
  return (
    <div>
    {
      isAdmin ?   <div className="drawer sm:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-2">
        {/* Page content here */}
        <div className="flex items-center justify-between mx-4">
          <label
            htmlFor="my-drawer-2"
            className="btn bg-orange-900 text-white drawer-button lg:hidden"
          >
            <MdDashboardCustomize />
          </label>
          <button onClick={handleLogout} className="btn rounded-full px-6 bg-orange-900 flex items-center gap-2 text-white sm:hidden">
            <FaRegUser /> Logout
          </button>
        </div>
        <div className="mt-5 md:mt-2 mx-4">
          <Outlet />
        </div>
      </div>
      <div className="drawer-side">
  <label
    htmlFor="my-drawer-2"
    aria-label="close sidebar"
    className="drawer-overlay"
  ></label>
  <ul className="menu p-4 w-80 min-h-full bg-gradient-to-b from-orange-100 to-orange-300 text-base-content shadow-lg rounded-r-2xl">
    
    {/* Logo Centered */}
    <li className=" mb-6 flex items-center">
      <img
        src={logo}
        alt="Logo"
        className="w-32 h-auto bg-gradient-to-r p-2 from-yellow-400 to-orange-500 rounded-lg shadow-md transform hover:scale-105 transition duration-300"
      />
    </li>

    {/* Admin Logo / Badge */}
<li className="self-center mb-6 flex flex-col items-center">
  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-xl shadow-xl flex items-center gap-2 transform hover:scale-105 transition duration-300">
    <FaRegUser className="text-2xl" />
    <span className="font-bold uppercase tracking-wide">Admin</span>
  </div>
</li>


    <hr className="my-2 border-orange-500" />

    {/* Sidebar Links */}
    <li className="mt-2 hover:bg-orange-200 rounded-lg transition-all duration-200">
      <Link to="/dashboard" className="flex items-center gap-2 px-3 py-2">
        <MdDashboard className="text-orange-700" /> Dashboard
      </Link>
    </li>

    <li className="hover:bg-orange-200 rounded-lg transition-all duration-200">
      <Link to="/dashboard/manage-bookings" className="flex items-center gap-2 px-3 py-2">
        <FaShoppingBag className="text-orange-700" /> Manage Bookings
      </Link>
    </li>

    <li className="hover:bg-orange-200 rounded-lg transition-all duration-200">
      <Link to="/dashboard/add-menu" className="flex items-center gap-2 px-3 py-2">
        <FaPlusCircle className="text-orange-700" /> Add Menu
      </Link>
    </li>

    <li className="hover:bg-orange-200 rounded-lg transition-all duration-200">
      <Link to="/dashboard/manage-items" className="flex items-center gap-2 px-3 py-2">
        <FaEdit className="text-orange-700" /> Manage Items
      </Link>
    </li>

    <li className="mb-3 hover:bg-orange-200 rounded-lg transition-all duration-200">
      <Link to="/dashboard/users" className="flex items-center gap-2 px-3 py-2">
        <FaUser className="text-orange-700" /> All Users
      </Link>
    </li>

    <hr className="my-2 border-orange-500" />

    {/* Shared Links */}
    {sharedLinks &&
      React.Children.map(sharedLinks, (link) =>
        React.cloneElement(link, {
          className: "hover:bg-orange-200 rounded-lg transition-all duration-200 px-3 py-2",
        })
      )}
  </ul>
</div>


    </div> : (loading ? <Login/> : <div className="h-screen flex justify-center items-center"><Link to="/"><button className="btn bg-orange-900 text-white">Back to Home</button></Link></div>)
    }
    </div>
  );
};

export default DashboardLayout;
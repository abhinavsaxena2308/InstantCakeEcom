import React, { useEffect, useState } from "react";
import logo from "/logo.png";
import { FaRegUser } from "react-icons/fa";
import Modal from "./Modal";
import Profile from "./Profile";
import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const [isSticky, setSticky] = useState(false);

  const { user } = useAuth();
  const [cart] = useCart();

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setSticky(window.scrollY > 0);
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  const navItems = (
    <>
      <li>
        <a
          href="/"
          className="text-black hover:bg-[#B8A684] hover:text-white rounded-tl-2xl rounded-br-2xl px-3 py-2 transition-all duration-300"
        >
          Home
        </a>
      </li>
      <li tabIndex={0}>
        <details className="group">
          <summary className="hover:bg-[#B8A684] hover:text-white rounded-tl-2xl rounded-br-2xl px-3 py-2 transition-all duration-300">
            Menu
          </summary>
          <ul className="p-2 shadow-lg bg-white text-gray-700 rounded-xl space-y-2 mt-2 border">
            <li>
              <a className="hover:bg-[#B8A684] hover:text-white rounded-tl-2xl rounded-br-2xl px-3 py-2 transition-all duration-300" href="/menu">
                All
              </a>
            </li>
            <li>
              <a className="hover:bg-[#B8A684] hover:text-white rounded-tl-2xl rounded-br-2xl px-3 py-2 transition-all duration-300">
                Salad
              </a>
            </li>
            <li>
              <a className="hover:bg-[#B8A684] hover:text-white rounded-tl-2xl rounded-br-2xl px-3 py-2 transition-all duration-300">
                Pizza
              </a>
            </li>
          </ul>
        </details>
      </li>
      <li tabIndex={0}>
        <details>
          <summary className="hover:bg-[#B8A684] hover:text-white rounded-tl-2xl rounded-br-2xl px-3 py-2 transition-all duration-300">
            Services
          </summary>
          <ul className="p-2 shadow-lg bg-white text-gray-700 rounded-xl space-y-2 mt-2 border">
            <li>
              <a className="hover:bg-[#B8A684] hover:text-white rounded-tl-2xl rounded-br-2xl px-3 py-2 transition-all duration-300">
                Online Order
              </a>
            </li>
            <li>
              <a className="hover:bg-[#B8A684] hover:text-white rounded-tl-2xl rounded-br-2xl px-3 py-2 transition-all duration-300">
                Table Booking
              </a>
            </li>
            <li>
              <a className="hover:bg-[#B8A684] hover:text-white rounded-tl-2xl rounded-br-2xl px-3 py-2 transition-all duration-300">
                Order Tracking
              </a>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <a className="hover:bg-[#B8A684] hover:text-white rounded-tl-2xl rounded-br-2xl px-3 py-2 transition-all duration-300">
          Offers
        </a>
      </li>
    </>
  );

  return (
    <header
      className={`max-w-screen-2xl container mx-auto fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out`}
    >
      <div
        className={`navbar bg-[#F2E6D8] text-black xl:px-24 ${
          isSticky
            ? "shadow-md bg-base-100 text-gray-800"
            : ""
        }`}
      >
        <div className="navbar-start">
          <div className="dropdown justify-between">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[100] p-2 shadow bg-white rounded-xl w-64 space-y-2 border"
            >
              {navItems}
            </ul>
          </div>
          <a href="/">
            <img src={logo} alt="logo" />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>
        <div className="navbar-end ">
          {/* search */}
          <button className="btn btn-ghost btn-circle hidden lg:flex hover:bg-[#B8A684] hover:text-white transition-all duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          {/* cart items */}
          <Link to="cart-page">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle items-center justify-center mr-3 hover:bg-[#B8A684] hover:text-white transition-all duration-300"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 
                      0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 
                      11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item bg-[#B8A684] text-white">
                  {cart.length}
                </span>
              </div>
            </label>
          </Link>

          {/* login btn */}
          {user ? (
            <Profile user={user} />
          ) : (
            <button
              onClick={() => document.getElementById("my_modal_5").showModal()}
              className="btn flex items-center gap-2 rounded-full px-6 bg-[#B8A684] text-white hover:bg-[#B8A684]/80 transition-all duration-300"
            >
              <FaRegUser /> Login
            </button>
          )}

          <Modal />
        </div>
      </div>
    </header>
  );
};

export default Navbar;

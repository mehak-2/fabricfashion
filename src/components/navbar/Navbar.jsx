import React, { Fragment, useContext, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import myContext from "../../context/data/myContext";
import { MdDarkMode } from "react-icons/md";
import { FiSun } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import logo from "../../../dist/assets/logo-4a4b0d7e.jpg";
import cart_img from '../../../dist/assets/cart_image.png';

function Navbar() {
  const context = useContext(myContext);
  const { mode, toggleMode } = context;
  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear("user");
    window.location.href = "/login";
  };

  const cartItems = useSelector((state) => state.cart);

  return (
    <div className="bg-white sticky top-0 z-50">
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel
                className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl"
                style={{
                  backgroundColor: mode === "dark" ? "rgb(40, 44, 52)" : "",
                  color: mode === "dark" ? "white" : "",
                }}
              >
                <div className="flex px-4 pb-2 pt-28">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <RxCross2 />
                  </button>
                </div>
                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <Link
                    to={"/allproducts"}
                    className="text-sm font-medium text-black hover:text-orange"
                    style={{ color: mode === "dark" ? "white" : "" }}
                  >
                    All Products
                  </Link>
                  

                  {user && user?.user?.email !== "mehak@gmail.com" && (
                    <div className="flow-root">
                      <Link
                        to={"/order"}
                        className="-m-2 block p-2 font-medium text-black"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        Order
                      </Link>
                    </div>
                  )}

                  {user?.user?.email === "mehak@gmail.com" && (
                    <div className="flow-root">
                      <Link
                        to={"/dashboard"}
                        className="-m-2 block p-2 font-medium text-black"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        Admin
                      </Link>
                    </div>
                  )}

                  {user ? (
                    <div className="flow-root">
                      <a
                        onClick={logout}
                        className="-m-2 block p-2 font-medium text-black cursor-pointer"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        Logout
                      </a>
                    </div>
                  ) : (
                    <>
                   
                      <div className="flow-root">
                        <Link
                          to={"/cart"}
                          className="-m-2 block p-2 font-medium text-black cursor-pointer flex items-center space-x-2"
                          style={{ color: mode === "dark" ? "white" : "" }}
                        >
                          <img
                            src={cart_img}
                            alt="Cart Icon"
                            className="w-5 h-5" // Adjust size as needed
                          />
                          <span>Cart</span>
                        </Link>
                      </div>   
                      <div className="flow-root">
                        <Link
                          to={"/profile"}
                          className="-m-2 block p-2 font-medium text-black cursor-pointer flex items-center space-x-2"
                          style={{ color: mode === "dark" ? "white" : "" }}
                        >
                          
                          <span>Profile</span>
                        </Link>
                      </div>   

                      <div className="flow-root">
                        <Link
                          to={"/signup"}
                          className="-m-2 block p-2 font-medium text-black cursor-pointer flex items-center space-x-2"
                          style={{ color: mode === "dark" ? "white" : "" }}
                        >
                          <FaUserCircle className="w-5 h-5" />
                          <span>Login/Signup</span>
                        </Link>
                      </div>
                      
                    </>
                  )}
                </div>
                

                <div className="px-4 py-6">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
                  />
                </div>
              
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">
        <nav
          aria-label="Top"
          className="bg-gray-700 px-4 sm:px-6 lg:px-8 shadow-xl"
          style={{
            backgroundColor: mode === "dark" ? "#282c34" : "white",
            color: mode === "dark" ? "white" : "",
          }}
        >
          <div className="flex h-16 items-center">
            <button
              type="button"
              className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
              onClick={() => setOpen(true)}
              style={{
                backgroundColor: mode === "dark" ? "rgb(80 82 87)" : "",
                color: mode === "dark" ? "white" : "",
              }}
            >
           
              <span className="sr-only">Open menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>

            
            {/* Logo */}
            <div className="ml-4 flex lg:ml-0">
              <Link to={"/"} className="flex">
                <img
                  src={logo}
                  width="50"
                  height="50"
                  alt="logo"
                  className="mb-0 mt-0"
                />
              </Link>  
<Link to="/" className="text-sm font-medium text-black flex items-center space-x-2 ml-5">Home</Link>
            </div>
          
            <div className="ml-auto flex items-center">

  {/* Desktop Links and Search Bar */}
  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">

    {user?.user?.email === "mehak@gmail.com" && (
      <Link
        to={"/dashboard"}
        className="text-sm font-medium text-black"
        style={{ color: mode === "dark" ? "white" : "" }}
      >
        Admin
      </Link>
    )}
   

    {user ? (
  <>
  <Link
      to="/profileform"
      className="text-sm font-medium text-black flex items-center space-x-2"
      style={{ color: mode === "dark" ? "white" : "inherit" }}
    >
      <span>Update Profile</span>
    </Link>
  <Link
      to="/profile"
      className="text-sm font-medium text-black flex items-center space-x-2"
      style={{ color: mode === "dark" ? "white" : "inherit" }}
    >
      <span>Profile</span>
    </Link>
    <Link
      to="/cart"
      className="text-sm font-medium text-black flex items-center space-x-2"
      style={{ color: mode === "dark" ? "white" : "inherit" }}
    >
      <span>Cart</span>
    </Link>
    <Link
      to="/order"
      className="text-sm font-medium text-black flex items-center space-x-2"
      style={{ color: mode === "dark" ? "white" : "inherit" }}
    >
      <span>Orders</span>
    </Link>
    <Link
      to="/wishlist"
      className="text-sm font-medium text-black flex items-center space-x-2"
      style={{ color: mode === "dark" ? "white" : "inherit" }}
    >
      <span>Wishlist</span>
    </Link>
    <Link
      to="/allproducts"
      className="text-sm font-medium text-black flex items-center space-x-2"
      style={{ color: mode === "dark" ? "white" : "inherit" }}
    >
      <span>All Products</span>
    </Link>
    <button
      onClick={logout}
      className="text-sm font-medium text-black"
      style={{ color: mode === "dark" ? "white" : "inherit" }}
    >
      Logout
    </button>
   
  </>
) : (
      <>
        <input
          type="text"
          placeholder="Search here"
          className="hidden lg:block w-[500px] px-10 py-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black dark:bg-black dark:text-white placeholder:text-black"
        />
        <Link
      to={"/cart"}
      className="text-sm font-medium text-black flex items-center space-x-2"
      style={{ color: mode === "dark" ? "white" : "" }}
    >
      <img
        src={cart_img}
        alt="Cart Icon"
        className="w-5 h-5" // Adjust size as needed
      />
      <span>Cart</span>
    </Link>
        <Link
          to={"/signup"}
          className="text-sm font-medium text-black flex items-center space-x-2"
          style={{ color: mode === "dark" ? "white" : "" }}
        >
          <FaUserCircle className="w-5 h-5" />
          <span>Login/Signup</span>
        </Link>
      </>
    )}


  </div>

  {/* Dark Mode Toggle */}
  
</div>

          </div>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;

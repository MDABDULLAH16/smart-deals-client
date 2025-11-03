import React, { use } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";

const Navbar = () => {
  const { user, loading, logOut } = use(AuthContext);
 
  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/allProducts">All Products</NavLink>
      </li>
      {user && (
        <>
         
          <li>
            <NavLink to="/myProducts">My Products</NavLink>
          </li>
          <li>
            <NavLink to="/myBids">My Bids</NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink to="/createProduct">Create Product</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navLinks}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-3xl font-bold">
          Smart <span className="  text-purple-500  ">Deals</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-[16px] font-medium">
          {navLinks}
        </ul>
      </div>
      <div className="navbar-end">
        {loading ? (
          "loading..."
        ) : user ? (
          <>
            {" "}
            <img
              className="h-10 w-10 mr-3 rounded-full"
              src={user.photoURL}
              alt="profile"
            />{" "}
            <button
              onClick={() => logOut()}
              className="btn bg-linear-to-r from-purple-500 to-indigo-500 text-white"
            >
              Log Out
            </button>
          </>
        ) : (
          <NavLink
            to="login"
            className="btn bg-linear-to-r from-purple-500 to-indigo-500 text-white"
          >
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;

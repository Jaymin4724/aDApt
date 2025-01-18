import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/logo-transparent.png";
import { AuthContext } from "../Context/AuthContext";
import PersonIcon from "@mui/icons-material/Person";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAdmin, isLoggedIn, logout, username } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <div className="flex flex-wrap items-center justify-between p-3 m-3 bg-white shadow-2xl rounded-md">
      {/* Logo and Title */}
      <Link to="/" className="flex items-center gap-2">
        <img src={logo} alt="logo" className="h-10 w-10" />
        <span className="text-3xl font-extralight">aDApt</span>
      </Link>

      {!isLoggedIn &&
        location.pathname !== "/login" &&
        location.pathname !== "/signup" && (
          <motion.div
            className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link to="/login">Get Started</Link>
          </motion.div>
        )}

      {isLoggedIn && (
        <div className="relative">
          <motion.div
            className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 rounded-xl text-md px-3 py-2.5 text-center cursor-pointer flex items-center gap-2"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={toggleMenu} // Open/close the menu
          >
            {!isAdmin ? <PersonIcon /> : <ManageAccountsIcon />}
            {username}
          </motion.div>

          {/* Dropdown Menu */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 shadow-xl rounded-sm z-50">
              <ul className="flex flex-col divide-y divide-gray-200">
                {location.pathname !== "/impmails" && (
                  <li className="hover:bg-gray-50 px-4 py-2">
                    <Link
                      to="/impmails"
                      className="block text-gray-800 font-medium"
                    >
                      Important Emails
                    </Link>
                  </li>
                )}
                <li
                  className="hover:bg-gray-50 px-4 py-2 cursor-pointer"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  <span className="block text-gray-800 font-medium">
                    Logout
                  </span>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

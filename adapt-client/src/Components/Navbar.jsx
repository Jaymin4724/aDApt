import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Importing motion from framer-motion
import logo from "../assets/logo-transparent.png";

export default function Navbar() {
  return (
    <div className="flex flex-wrap items-center justify-between p-3 m-3 bg-white shadow-2xl rounded-md">
      {/* Logo and Title */}
      <Link to="/" className="flex items-center gap-2">
        <img src={logo} alt="logo" className="h-8 w-8" />
        <span className="text-2xl font-light">aDApt</span>
      </Link>

      {/* Get Started Button */}
      <motion.div
        className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)" }} // Motion for hover
        whileTap={{ scale: 0.95 }} // Motion for tap (click)
        transition={{ type: "spring", stiffness: 300 }} // Smooth transition
      >
        <Link to="/login">Get Started</Link>
      </motion.div>
    </div>
  );
}

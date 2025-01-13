import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Login Form Section */}
      <motion.div
        className="flex flex-1 items-start justify-center pt-16 p-7"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <div className="w-full max-w-md bg-white p-10 sm:p-8 shadow-lg rounded-lg border border-gray-200">
          <h1 className="text-2xl sm:text-3xl font-semibold text-blue-700 text-center mb-6">
            Log In
          </h1>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => (e.target.value = e.target.value.toLowerCase())}
            />
          </div>

          <div className="mb-6 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
            <InputAdornment position="end" className="absolute right-3 top-1.5">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleTogglePasswordVisibility}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          </div>

          <motion.button
            className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 rounded-lg font-semibold shadow hover:shadow-lg focus:ring-2 focus:ring-green-400"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            LOG IN
          </motion.button>

          <div className="text-center mt-4">
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-gray-700 transition"
            >
              FORGOT PASSWORD?
            </a>
          </div>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              No account?{" "}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Create One
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { logIn } from "../Services/authServices";
import { Error } from "../Components/Toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      Error("Please fill in all fields");
      return;
    }
    const userData = {
      emailId: email.trim().toLowerCase(),
      password,
    };
    try {
      await logIn(userData);
      navigate("/");
    } catch (error) {
      console.log("Login failed:", error.message);
    }
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
        <form
          className="w-full max-w-md bg-white p-10 sm:p-8 shadow-lg rounded-lg border border-gray-200"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl sm:text-3xl font-semibold text-blue-700 text-center mb-6">
            Log In
          </h1>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setPassword(e.target.value)}
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
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 rounded-lg font-semibold shadow hover:shadow-lg focus:ring-2 focus:ring-green-400"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            LOG IN
          </motion.button>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              No account?{" "}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Create One
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

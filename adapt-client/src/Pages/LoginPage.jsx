import React, { useState, useContext } from "react";
import Navbar from "../Components/Navbar";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { Success, Error } from "../Components/Toast";
import { AuthContext } from "../Context/AuthContext";

const baseURL = "http://localhost:5000/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const logIn = async (data) => {
    try {
      const response = await axios.post(`${baseURL}/auth/login`, data);
      const token = response.data.token;
      const userDetails = response.data.data;

      sessionStorage.setItem("token", token);
      sessionStorage.setItem("id", userDetails._id);
      sessionStorage.setItem("username", userDetails.username);
      sessionStorage.setItem("emailId", userDetails.emailId);
      sessionStorage.setItem("isAdmin", userDetails.isAdmin);
      sessionStorage.setItem("isLoggedIn", true);

      login(
        token,
        userDetails._id,
        userDetails.username,
        userDetails.emailId,
        true,
        userDetails.isAdmin
      );
      console.log(
        token,
        userDetails._id,
        userDetails.username,
        userDetails.emailId,
        true,
        userDetails.isAdmin
      );
      Success("Login successful");
    } catch (error) {
      const errorMessage =
        (error.response && error.response.data && error.response.data.error) ||
        "Failed to log in. Please check your credentials.";
      Error(errorMessage);
      console.error("Error logging in:", error.message);
    }
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

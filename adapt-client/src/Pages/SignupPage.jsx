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

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const signUp = async (data) => {
    try {
      console.log(data);
      const response = await axios.post(`${baseURL}/auth/signup`, data);
      const token = response.data.token;
      const userDetails = response.data.data;

      localStorage.setItem("username", userDetails.username);
      localStorage.setItem("emailId", userDetails.emailId);
      localStorage.setItem("token", token);
      localStorage.setItem("isLoggedIn", true);

      login(token, userDetails.username, userDetails.emailId, true);
      console.log(token, userDetails.username, userDetails.emailId, true);
      Success("Signup successful");
    } catch (error) {
      const errorMessage =
        (error.response && error.response.data && error.response.data.error) ||
        "Failed to sign up. Please try again.";
      Error(errorMessage);
      console.error("Error creating user:", error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      Error("Please fill in all fields");
      return;
    }

    const userData = {
      username: username.trim().toLowerCase(),
      emailId: email.trim().toLowerCase(),
      password,
    };

    try {
      await signUp(userData);
      navigate("/");
    } catch (error) {
      console.error("Signup failed:", error.message);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />
      {/* Signup Form Section */}
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
            Sign Up
          </h1>

          {/* Username Input */}
          <div className="mb-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Input */}
          <div className="mb-6 relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

          {/* Sign Up Button */}
          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 rounded-lg font-semibold shadow hover:shadow-lg focus:ring-2 focus:ring-green-400"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            SIGN UP
          </motion.button>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Log In
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

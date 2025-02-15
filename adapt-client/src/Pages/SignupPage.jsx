import React, { useState, useContext } from "react";
import Navbar from "../Components/Navbar";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff, Key, KeyOff } from "@mui/icons-material";
import axios from "axios";
import { Success, Error } from "../Components/Toast";
import { AuthContext } from "../Context/AuthContext";

const baseURL = "http://localhost:5000/api";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminkey, setAdminKey] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showAdminKey, setShowAdminkey] = useState(false);
  const [showAdminField, setShowAdminField] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleTogglePasswordVisibility1 = () => {
    setShowPassword((prev) => !prev);
  };
  const handleToggleAdminKey = () => {
    setShowAdminkey((prev) => !prev);
  };

  const signUp = async (data) => {
    try {
      console.log(data);
      const response = await axios.post(`${baseURL}/auth/signup`, data);
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

    if (adminkey && adminkey !== "12345678") {
      Error("Invalid Admin Key");
      return;
    }

    if (!username || !email || !password) {
      Error("Please fill in all fields");
      return;
    }

    const isAdmin = adminkey === "12345678";

    const userData = {
      username: username.trim().toLowerCase(),
      emailId: email.trim().toLowerCase(),
      password,
      isAdmin,
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
          <div className="mb-4 relative">
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
                onClick={handleTogglePasswordVisibility1}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          </div>

          <div className="flex gap-2 mb-4">
            <motion.button
              type="button"
              onClick={() => {
                setShowAdminField((prev) => !prev);
                setAdminKey("");
              }}
              className="p-2 flex items-center justify-center bg-gray-100 text-gray-700 py-2 rounded-lg font-semibold shadow hover:bg-gray-300 focus:ring-2 focus:ring-blue-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              {showAdminField ? <KeyOff /> : <Key />}
            </motion.button>
            {showAdminField && (
              <motion.div
                className="relative flex-1"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.5 }}
              >
                <input
                  type={showAdminKey ? "text" : "password"}
                  value={adminkey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  placeholder="Admin Key"
                  className="w-full bg-gray-50 text-gray-700 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
                <InputAdornment
                  position="end"
                  className="absolute right-3 top-1.5"
                >
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleToggleAdminKey}
                    edge="end"
                  >
                    {showAdminKey ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              </motion.div>
            )}
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

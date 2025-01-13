import axios from "axios";
import { Success, Error } from "../Components/Toast";
const baseURL = "http://localhost:5000/api";

// Signup function
export const signUp = async (data) => {
  try {
    const response = await axios.post(`${baseURL}/auth/signup`, data);
    const token = response.data.token;
    localStorage.setItem("token", token);
    // console.log(localStorage.getItem("token"));
    Success("Signup successful");
  } catch (error) {
    const errorMessage =
      (error.response && error.response.data && error.response.data.error) ||
      "Failed to sign up. Please try again.";
    Error(errorMessage);
    console.error("Error creating user:", error.message);
  }
};

// Login function
export const logIn = async (data) => {
  try {
    const response = await axios.post(`${baseURL}/auth/login`, data);
    const token = response.data.token;
    localStorage.setItem("token", token);
    // console.log(localStorage.getItem("token"));
    Success("Login successful");
  } catch (error) {
    const errorMessage =
      (error.response && error.response.data && error.response.data.error) ||
      "Failed to log in. Please check your credentials.";
    Error(errorMessage);
    console.error("Error logging in:", error.message);
  }
};

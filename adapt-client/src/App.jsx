import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/signup" element={<SignupPage></SignupPage>}></Route>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
      </Routes>
    </Router>
  );
}

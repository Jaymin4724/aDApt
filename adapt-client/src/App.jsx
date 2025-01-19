import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import FileUpload from "./Components/FileUpload";
import SharedLibrary from "./Pages/SharedLibrary";
import QnA from "./Pages/QnA";
import LostnFound from "./Pages/LostnFound";
import ImpEmails from "./Pages/ImpEmails";
import Admin from "./Pages/Admin";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sharedlibrary" element={<SharedLibrary />} />
        <Route path="/qna" element={<QnA />} />
        <Route path="/lostnfound" element={<LostnFound />} />
        <Route path="/impmails" element={<ImpEmails />} />
        <Route path="/fileupload" element={<FileUpload />} />
        <Route path="/admin" element={<Admin></Admin>}></Route>
      </Routes>
    </Router>
  );
}

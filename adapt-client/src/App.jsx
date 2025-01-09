import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import FileUpload from "./Components/FileUpload";
import SharedLibrary from "./Pages/SharedLibrary";
import SharedLibraryCategory from "./Pages/SharedLibraryCategory";
import QnA from "./Pages/QnA";
import LostnFound from "./Pages/LostnFound";
import LostnFoundCategory from "./Pages/LostnFoundCategory";
import ImpMails from "./Pages/ImpMails";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sharedlibrary" element={<SharedLibrary />} />
        <Route
          path="/sharedlibrary/:categoryname"
          element={<SharedLibraryCategory />}
        />
        <Route path="/qna" element={<QnA />} />
        <Route path="/lostnfound" element={<LostnFound />} />
        <Route
          path="/lostnfound/:categoryname"
          element={<LostnFoundCategory />}
        />
        <Route path="/impmails" element={<ImpMails />} />
        <Route path="/fileupload" element={<FileUpload />} />
      </Routes>
    </Router>
  );
}

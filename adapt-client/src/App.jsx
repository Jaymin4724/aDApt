import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import FileUpload from "./Components/FileUpload";

import SharedLibrary from "./Pages/SharedLibrary";
import AddSharedLibrary from "./Components/SharedLibrary/AddSharedLibrary";
import EditSharedLibrary from "./Components/SharedLibrary/EditSharedLibrary";

import QnA from "./Pages/QnA";
import QnAChat from "./Components/QnA/QnAChat";
import AddQnA from "./Components/QnA/AddQnA";
import EditQnA from "./Components/QnA/EditQnA";

import LostnFound from "./Pages/LostnFound";
import LnFChat from "./Components/LostnFound/LnFChat";
import AddLnF from "./Components/LostnFound/AddLnF";
import EditLnF from "./Components/LostnFound/EditLnf";

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
        <Route path="/sharedlibrary/add" element={<AddSharedLibrary />} />
        <Route path="/sharedlibrary/edit/:id" element={<EditSharedLibrary />} />

        <Route path="/qna" element={<QnA />} />
        <Route path="/qna/:id" element={<QnAChat />} />
        <Route path="/qna/add" element={<AddQnA />} />
        <Route path="/qna/edit/:id" element={<EditQnA />} />

        <Route path="/lostnfound" element={<LostnFound />} />
        <Route path="/lostnfound/:id" element={<LnFChat />} />
        <Route path="/lostnfound/add" element={<AddLnF />} />
        <Route path="/lostnfound/edit/:id" element={<EditLnF />} />

        <Route path="/impmails" element={<ImpEmails />} />
        <Route path="/fileupload" element={<FileUpload />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import FileUpload from "./Components/FileUpload";
import SharedLibrary from "./Pages/SharedLibrary";
import QnA from "./Pages/QnA";
import LostnFound from "./Pages/LostnFound";
import ImpMails from "./Pages/ImpMails";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>} />
        <Route path="/signup" element={<SignupPage></SignupPage>} />
        <Route path="/login" element={<LoginPage></LoginPage>} />
        <Route
          path="/sharedlibrary"
          element={<SharedLibrary></SharedLibrary>}
        />
        <Route path="/qna" element={<QnA></QnA>} />
        <Route path="/lostnfound" element={<LostnFound></LostnFound>} />
        <Route path="impmails" element={<ImpMails></ImpMails>} />
        <Route path="/fileupload" element={<FileUpload></FileUpload>} />
      </Routes>
    </Router>
  );
}

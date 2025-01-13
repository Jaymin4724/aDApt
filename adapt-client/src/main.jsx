import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./Context/AuthContext.jsx";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster position="top-center" reverseOrder={false} />
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);

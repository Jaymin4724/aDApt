import React, { useContext } from "react";
import Navbar from "../Components/Navbar";
import "@fontsource/merriweather";
import "@fontsource-variable/raleway";
import { motion } from "framer-motion";
import shared from "../assets/shared.png";
import lnf from "../assets/lnf.png";
import qna from "../assets/qna.png";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import { GitHub, LinkedIn, Instagram } from "@mui/icons-material";

export default function HomePage() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Quote Section */}
      <motion.div
        className="flex items-center justify-center py-14 px-10 bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900 text-white text-center rounded-md mx-10 mt-8 shadow-2xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <h1
          className="text-center text-3xl md:text-4xl leading-relaxed italic font-semibold"
          style={{ fontFamily: '"Raleway Variable", sans-serif' }}
        >
          Simplify student life with <span className="font-bold">aDApt</span>
          <br />
          Your go-to platform for collaboration and resources.
        </h1>
      </motion.div>

      {/* Cards Section */}
      <motion.div
        className="py-10 px-4 sm:px-8 lg:px-16 grid gap-10 grid-cols-1 md:grid-cols-3 mx-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        {/* Card 1 */}
        <motion.div
          className="bg-white shadow-lg rounded-lg p-6 px-10 border border-teal-200"
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 10px 20px rgba(0, 128, 128, 0.3)",
          }} // Hover effect
          whileTap={{ scale: 0.95 }} // Tap effect
          transition={{ type: "spring", stiffness: 200, damping: 10 }} // Smooth spring transition
        >
          <Link to={isLoggedIn ? "/sharedlibrary" : "/login"}>
            <img
              src={shared}
              alt="Resource Library Icon"
              className="w-full h-50 object-cover rounded-t-lg mb-4"
            />
            <h2 className="text-2xl font-bold mb-4 text-teal-600">
              Shared Resource Library
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Students can upload and access study materials like notes,
              assignments, and presentations. The library includes a search
              option to easily find resources and ensures seamless resource
              sharing among peers.
            </p>
          </Link>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          className="bg-white shadow-lg rounded-lg p-6 px-10 border border-yellow-300"
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 10px 20px rgba(255, 223, 77, 0.3)",
          }} // Hover effects
          whileTap={{ scale: 0.95 }} // Tap effect
          transition={{ type: "spring", stiffness: 200, damping: 10 }} // Smooth spring transition
        >
          <Link to={isLoggedIn ? "/qna" : "/login"}>
            <img
              src={qna}
              alt="Q&A Manager Icon"
              className="w-full h-50 object-cover rounded-t-lg mb-4"
            />
            <h2 className="text-2xl font-bold mb-4 text-yellow-500">
              Q&A Manager
            </h2>
            <p className="text-gray-700 leading-relaxed">
              A space where students can post academic questions and provide
              answers to others. Questions are categorized for easy browsing,
              and students can even request new categories. Admins manage
              categories and streamline the resolution process.
            </p>
          </Link>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          className="bg-white shadow-lg rounded-lg p-6 px-10 border border-pink-300"
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 10px 20px rgba(255, 105, 180, 0.3)",
          }} // Hover effect
          whileTap={{ scale: 0.95 }} // Tap effect
          transition={{ type: "spring", stiffness: 200, damping: 10 }} // Smooth spring transition
        >
          <Link to={isLoggedIn ? "/lostnfound" : "/login"}>
            <img
              src={lnf}
              alt="Lost & Found Icon"
              className="w-full h-50 object-cover rounded-t-lg mb-4"
            />
            <h2 className="text-2xl font-bold mb-4 text-pink-500">
              Lost & Found Manager
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Enables students to report lost items with descriptions and
              photos. Categories like CEP, LT, and Canteen help locate misplaced
              belongings. Items marked as "found" are automatically removed
              after a set period to maintain clarity.
            </p>
          </Link>
        </motion.div>
      </motion.div>
      <footer className="flex flex-col items-center justify-center py-3 bg-gradient-to-r from-blue-500 to-blue-900 text-white text-center shadow-2xl rounded-t-lg">
        {/* Footer Text */}
        <div
          className="px-3 mb-3"
          style={{
            fontFamily: '"Raleway Variable", sans-serif',
            fontSize: "large",
          }}
        >
          © 2025 | Developed by{" "}
          <span className="font-semibold">Jaymin Dave</span> | WOC 7.0 NodeJS
          Competition | Jan-Feb 2025
        </div>

        {/* Social Media Icons */}
        <div className="flex items-center justify-center gap-4">
          {/* GitHub */}
          <a
            href="https://github.com/jaymin4724"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition-colors"
          >
            <GitHub
              fontSize="large"
              className="transition-transform transform hover:scale-110"
            />
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/jaymindave4724"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition-colors"
          >
            <LinkedIn
              fontSize="large"
              className="transition-transform transform hover:scale-110"
            />
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/jaymin.4724"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition-colors"
          >
            <Instagram
              fontSize="large"
              className="transition-transform transform hover:scale-110"
            />
          </a>
        </div>
      </footer>
    </div>
  );
}

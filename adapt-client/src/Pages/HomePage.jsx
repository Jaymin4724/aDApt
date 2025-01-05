import React from "react";
import Navbar from "../Components/Navbar";
import "@fontsource/merriweather"; // For serif font
import "@fontsource-variable/raleway";
import { motion } from "framer-motion"; // Import Framer Motion
import shared from "../assets/shared.png";
import lnf from "../assets/lnf.png";
import qna from "../assets/qna.png";

export default function HomePage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Quote Section */}
      <motion.div
        className="flex items-center justify-center py-14 px-10 bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900 text-white text-center rounded-md mx-7 mt-8 shadow-2xl"
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
          className="bg-white shadow-lg rounded-lg p-6 px-10 border border-teal-200 hover:shadow-2xl hover:scale-105 transition-transform duration-300"
          whileHover={{ scale: 1.1 }}
        >
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
            assignments, and presentations. The library includes a search option
            to easily find resources and ensures seamless resource sharing among
            peers.
          </p>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          className="bg-white shadow-lg rounded-lg p-6 px-10 border border-yellow-300 hover:shadow-2xl hover:scale-105 transition-transform duration-300"
          whileHover={{ scale: 1.1 }}
        >
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
            answers to others. Questions are categorized for easy browsing, and
            students can even request new categories. Admins manage categories
            and streamline the resolution process.
          </p>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          className="bg-white shadow-lg rounded-lg p-6 px-10 border border-pink-300 hover:shadow-2xl hover:scale-105 transition-transform duration-300"
          whileHover={{ scale: 1.1 }}
        >
          <img
            src={lnf}
            alt="Lost & Found Icon"
            className="w-full h-50 object-cover rounded-t-lg mb-4"
          />
          <h2 className="text-2xl font-bold mb-4 text-pink-500">
            Lost & Found Manager
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Enables students to report lost items with descriptions and photos.
            Categories like CEP, LT, and Canteen help locate misplaced
            belongings. Items marked as "found" are automatically removed after
            a set period to maintain clarity.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

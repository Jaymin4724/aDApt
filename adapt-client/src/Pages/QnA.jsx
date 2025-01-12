// QnA.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import QnAData from "../Data/QnAData"; // Import the QnA data
import { TextField } from "@mui/material";

export default function QnA() {
  const [selectedCategory, setSelectedCategory] = useState("C Programming");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  // Filter questions based on selected category and search term
  const filteredQuestions = QnAData.questions
    .filter((question) => question.category === selectedCategory)
    .filter((question) => question.question.toLowerCase().includes(searchTerm));

  const handleQuestionClick = (id) => {
    navigate(`/qna/${id}`);
  };

  const handleAnsweredClick = (id) => {
    alert(`Question with ID ${id} marked as answered.`);
  };

  return (
    <div className="w-full">
      <Navbar />
      <div className="flex flex-col md:flex-row gap-4 m-5 p-4 bg-gray-100">
        {/* Categories Sidebar */}
        <div className="w-full md:w-1/4 lg:w-1/6 bg-white p-4 overflow-auto shadow-md rounded-lg">
          <h2 className="text-lg font-bold mb-4 border-b pb-2 text-center md:text-left">
            Categories
          </h2>
          <div className="flex flex-wrap gap-2 md:block">
            {[
              "C Programming",
              "JavaScript",
              "Web Development",
              "Data Structures",
              "Python",
            ].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`block w-full text-left px-4 py-2 mb-2 rounded-lg transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Questions Display Section */}
        <div className="w-full md:w-3/4 lg:w-5/6 bg-white p-4 overflow-auto shadow-md rounded-lg">
          <h2 className="text-lg font-bold mb-4 border-b pb-2 text-center md:text-left">
            Questions on {selectedCategory}
          </h2>

          {/* Search Bar */}
          <div className="mb-5">
            <TextField
              label={`Search questions in ${selectedCategory}`}
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((question) => (
                <div
                  key={question.id}
                  className="border rounded-lg shadow-md p-4 bg-gray-50 hover:bg-gray-100 transition-transform transform hover:scale-105"
                >
                  <img
                    src={question.photo}
                    alt={question.question}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-lg font-semibold mb-2">
                    {question.question}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Created By:</strong> {question.createdBy}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Timestamp:</strong> {question.timestamp}
                  </p>
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => handleQuestionClick(question.id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105"
                    >
                      Chat
                    </button>
                    <button
                      onClick={() => handleAnsweredClick(question.id)}
                      className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105"
                    >
                      Answered
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-500 text-center w-full col-span-full">
                No questions found in this category.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

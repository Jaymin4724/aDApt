import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { TextField } from "@mui/material";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { Add, Delete, Edit, Comment } from "@mui/icons-material";
import { Success, Error } from "../Components/Toast";
const baseURL = "http://localhost:5000/api";

export default function QnA() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { token, id } = useContext(AuthContext);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${baseURL}/qna/categories`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const fetchedCategories = response.data;
        setCategories(fetchedCategories);

        if (fetchedCategories.length > 0 && !selectedCategory) {
          setSelectedCategory(fetchedCategories[0]._id);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${baseURL}/qna/questions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${baseURL}/auth/users`);
        setUsers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchCategories();
    fetchQuestions();
    fetchUsers();
  }, [token, selectedCategory]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleQuestionClick = (id) => {
    navigate(`/qna/${id}`); // Navigate to a detailed QnA page
  };

  // Filter items based on category and search term
  const filteredQuestions = questions
    .filter((question) => question.category === selectedCategory)
    .filter((question) => question.question.toLowerCase().includes(searchTerm));

  const handleDelete = async (questionId) => {
    try {
      // Make the API request to delete the question
      await axios.delete(`${baseURL}/qna/question/${questionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update the state to remove the deleted question
      setQuestions((prevQuestions) =>
        prevQuestions.filter((question) => question._id !== questionId)
      );
      Success("Question deleted successfully.");
    } catch (error) {
      console.error("Error deleting question:", error);
      Error("Failed to delete the question.");
    }
  };

  return (
    <div className="w-full">
      <Navbar />

      <div className="flex flex-col md:flex-row gap-4 m-4 p-4 bg-gray-100">
        {/* Categories Sidebar */}
        <div className="w-full md:w-1/4 lg:w-1/6 bg-white p-4 overflow-auto shadow-md rounded-lg">
          <h2 className="text-lg font-bold mb-4 border-b pb-2 text-center md:text-left">
            Categories
          </h2>
          <div className="flex flex-wrap gap-2 md:block">
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => setSelectedCategory(category._id)}
                className={`block w-full text-left px-4 py-2 mb-2 rounded-lg transition-colors ${
                  selectedCategory === category._id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Questions Display Section */}
        <div className="w-full md:w-3/4 lg:w-5/6 bg-white p-4 overflow-auto shadow-md rounded-lg">
          <h2 className="text-lg font-bold mb-4 border-b pb-2 text-center md:text-left">
            Questions in{" "}
            {categories.find((cat) => cat._id === selectedCategory)?.name || ""}
          </h2>
          {/* Search Bar */}
          <div className="my-5 flex gap-2">
            <TextField
              label={`Search questions in ${
                categories.find((cat) => cat._id === selectedCategory)?.name ||
                "this category"
              }`}
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={handleSearch}
            />
            <button
              className="flex gap-2 items-center justify-center bg-gray-300 hover:bg-gray-400 text-black p-3 rounded shadow transition duration-200"
              onClick={() => {
                navigate("/qna/add");
              }}
            >
              <Add />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((question) => (
                <div
                  key={question._id}
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
                    <strong>Created By:</strong>{" "}
                    {users.find((user) => user._id === question.createdBy)
                      ?.username || "Unknown"}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Status:</strong>{" "}
                    <span
                      className={`${
                        question.answered ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {question.answered ? "Answered" : "Not Answered"}
                    </span>
                  </p>
                  <p className="text-xs text-gray-400">
                    <strong>Posted At:</strong>{" "}
                    {new Date(question.createdAt).toLocaleString()}
                  </p>
                  <div className="flex justify-between">
                    <button
                      onClick={() => handleQuestionClick(question._id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 mt-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
                    >
                      <Comment />
                    </button>
                    {question.createdBy === id && (
                      <div className="flex gap-2">
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 mt-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
                          onClick={() => {
                            navigate(`/qna/edit/${question._id}`, {
                              state: { question },
                            });
                          }}
                        >
                          <Edit /> {/* Edit Icon */}
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 mt-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
                          onClick={() => {
                            handleDelete(question._id);
                          }}
                        >
                          <Delete />
                        </button>
                      </div>
                    )}
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

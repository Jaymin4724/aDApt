import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import LostnFoundData from "../Data/LostnFoundData";
import { TextField } from "@mui/material";

export default function LostnFound() {
  const [selectedCategory, setSelectedCategory] = useState("CEP");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  // Filter items based on category and search term
  const filteredItems = LostnFoundData.items
    .filter((item) => item.category === selectedCategory)
    .filter((item) => item.name.toLowerCase().includes(searchTerm));

  const handleItemClick = (id) => {
    navigate(`/lostnfound/${id}`);
  };

  const handleFoundClick = (id) => {
    alert(`Item with ID ${id} is marked as found.`);
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
            {["CEP", "ROOM", "LAB", "CANTEEN"].map((category) => (
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

        {/* Items Display Section */}
        <div className="w-full md:w-3/4 lg:w-5/6 bg-white p-4 overflow-auto shadow-md rounded-lg">
          <h2 className="text-lg font-bold mb-4 border-b pb-2 text-center md:text-left">
            Items Lost in {selectedCategory}
          </h2>

          {/* Search Bar */}
          <div className="mb-5">
            <TextField
              label={`Search items in ${selectedCategory}`}
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-lg shadow-md p-4 bg-gray-50 hover:bg-gray-100 transition-transform transform hover:scale-105"
                >
                  <img
                    src={item.photo}
                    alt={item.name}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Last Seen:</strong> {item.lastSeen}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Created By:</strong> {item.createdBy}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Status:</strong>{" "}
                    <span
                      className={`${
                        item.found ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {item.found ? "Found" : "Not Found"}
                    </span>
                  </p>
                  <p className="text-xs text-gray-400">
                    <strong>Reported At:</strong> {item.timestamp}
                  </p>
                  <div className="flex justify-between">
                    <button
                      onClick={() => handleItemClick(item.id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 mt-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
                    >
                      Chat
                    </button>
                    <button
                      onClick={() => handleFoundClick(item.id)}
                      className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 mt-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
                    >
                      Found
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-500 text-center w-full col-span-full">
                No items found in this category.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

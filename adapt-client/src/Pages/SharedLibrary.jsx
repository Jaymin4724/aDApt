import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { TextField } from "@mui/material";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { Add, Delete, Edit } from "@mui/icons-material";
import { Success, Error } from "../Components/Toast";

const baseURL = "http://localhost:5000/api";

export default function SharedLibrary() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { token, id } = useContext(AuthContext);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/shared-library/categories`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCategories(response.data);
        if (response.data.length > 0 && !selectedCategory) {
          setSelectedCategory(response.data[0]._id);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchItems = async () => {
      try {
        const response = await axios.get(`${baseURL}/shared-library/items`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${baseURL}/auth/users`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchCategories();
    fetchItems();
    fetchUsers();
  }, [token, selectedCategory]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`${baseURL}/shared-library/item/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
      Success("Item deleted successfully.");
    } catch (error) {
      console.error("Error deleting item:", error);
      Error("Failed to delete the item.");
    }
  };

  const filteredItems = items
    .filter((item) => item.category === selectedCategory)
    .filter((item) => item.item.toLowerCase().includes(searchTerm));

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

        {/* Items Display Section */}
        <div className="w-full md:w-3/4 lg:w-5/6 bg-white p-4 overflow-auto shadow-md rounded-lg">
          <h2 className="text-lg font-bold mb-4 border-b pb-2 text-center md:text-left">
            Shared Resources in{" "}
            {categories.find((cat) => cat._id === selectedCategory)?.name || ""}
          </h2>

          {/* Search Bar */}
          <div className="my-5 flex gap-2">
            <TextField
              label={`Search items in ${
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
              onClick={() => navigate("/sharedlibrary/add")}
            >
              <Add />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div
                  key={item._id}
                  className="border rounded-lg shadow-md p-4 bg-gray-50 hover:bg-gray-100 transition-transform transform hover:scale-105"
                >
                  <h3 className="text-lg font-semibold mb-2">{item.item}</h3>
                  {item.description.trim() !== "" && (
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Description:</strong> {item.description}
                    </p>
                  )}
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Created By:</strong>{" "}
                    {users.find((user) => user._id === item.createdBy)
                      ?.username || "Unknown"}
                  </p>
                  <p className="text-xs text-gray-400">
                    <strong>Shared At:</strong>{" "}
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                  <div className="flex justify-between">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 mt-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
                      <a href={item.resourceURL}>View</a>
                    </button>
                    {item.createdBy === id && (
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            navigate(`/sharedlibrary/edit/${item._id}`, {
                              state: { item },
                            })
                          }
                          className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 mt-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
                        >
                          <Edit />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 mt-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
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
                No items found in this category.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

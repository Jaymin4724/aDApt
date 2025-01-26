import React, { useState, useEffect, useContext } from "react";
import Navbar from "../../Components/Navbar";
import { TextField, MenuItem, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Success, Error } from "../../Components/Toast";
import { AuthContext } from "../../Context/AuthContext";

const baseURL = "http://localhost:5000/api/shared-library";

export default function AddSharedLibrary() {
  const [categories, setCategories] = useState([]);
  const [item, setItem] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [file, setFile] = useState(null); // Store the file (could be a document, image, etc.)
  const [loading, setLoading] = useState(false); // State to manage loading
  const { token, id } = useContext(AuthContext);
  const navigate = useNavigate(); // For navigation after successful addition

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${baseURL}/categories`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        Error("Failed to fetch categories");
      }
    };

    fetchCategories();
  }, [token]);

  const handleAddItem = async () => {
    if (!file || !item.trim() || !selectedCategory) {
      Error("Resource, item name and category are required");
      return;
    }
    setLoading(true); // Start loading
    try {
      let uploadedFileUrl = ""; // Local variable to hold the uploaded file URL
      // Step 1: Upload the file if a file is selected
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const uploadResponse = await axios.post(
          "http://localhost:5000/api/file/upload", // Replace with your file upload endpoint
          formData
        );

        uploadedFileUrl = uploadResponse.data.url;
        console.log("Uploaded File URL:", uploadedFileUrl);
      }

      // Step 2: Add the shared library item
      const newItem = {
        item: item.trim(),
        description: description.trim(),
        resourceURL: uploadedFileUrl,
        createdBy: id,
        category: selectedCategory,
      };
      console.log("New Shared Library Item:", newItem);

      await axios.post(`${baseURL}/item`, newItem, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Success("Shared Library item added successfully!");
      setItem("");
      setDescription("");
      setSelectedCategory("");
      setFile(null);
      navigate("/sharedlibrary");
    } catch (error) {
      console.error("Error adding item:", error);
      Error("Failed to add item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="m-5 p-6 bg-gray-50 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-gray-700">
          Add Shared Library Item
        </h1>
        <div className="flex flex-col gap-4">
          <TextField
            label="Item"
            variant="outlined"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Description (Optional)"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={3}
            fullWidth
          />
          <TextField
            label="Category"
            variant="outlined"
            select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            fullWidth
            required
          >
            {categories.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>

          {/* File Upload Input */}
          <input
            type="file"
            accept="application/*, image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleAddItem}
            disabled={loading} // Disable while loading
            className="self-start"
          >
            {loading ? "Submitting..." : "Add Item"}
          </Button>
        </div>
      </div>
    </>
  );
}

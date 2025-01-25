import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import { TextField, MenuItem, Button } from "@mui/material";
import axios from "axios";
import { Success, Error } from "../../Components/Toast";
import { AuthContext } from "../../Context/AuthContext";

const baseURL = "http://localhost:5000/api/shared-library";
const uploadURL = "http://localhost:5000/api/file/upload"; // Image upload endpoint

export default function EditSharedLibrary() {
  const { id: itemId } = useParams(); // Get item ID from the URL
  const location = useLocation(); // Access state passed from navigate
  const [item, setItem] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [file, setFile] = useState(null); // Store file (could be document, image, etc.)
  const [loading, setLoading] = useState(false); // State to manage loading
  const [categories, setCategories] = useState([]);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate(); // For navigation after successful edit

  // Fetch item details and pre-fill the form if passed via location.state or directly from the API
  useEffect(() => {
    if (location.state?.item) {
      const { item, description, category, resourceURL } = location.state.item;
      setItem(item);
      setDescription(description);
      setSelectedCategory(category);
      setFile(resourceURL);
    } else {
      // Fetch item details from the API if not passed via location.state
      const fetchItemDetails = async () => {
        try {
          const response = await axios.get(`${baseURL}/item/${itemId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const { item, description, category, photo } = response.data;
          setItem(item);
          setDescription(description);
          setSelectedCategory(category);
          setImageURL(photo); // Set initial photo URL
        } catch (error) {
          console.error("Error fetching item details:", error);
          Error("Failed to fetch item details");
        }
      };
      fetchItemDetails();
    }
  }, [location.state, itemId, token]);

  // Fetch categories for dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${baseURL}/categories`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, [token]);

  // Handle file upload (if a new file is selected)
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true); // Start loading

    try {
      const response = await axios.post(uploadURL, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setFile(response.data.url);
      Success("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      Error("Failed to upload file. Please try again.");
    } finally {
      setLoading(false); // Set loading to false after upload is complete
    }
  };

  // Handle save changes
  const handleSaveChanges = async () => {
    if (!item.trim() || !selectedCategory) {
      Error("Item name and category are required.");
      return;
    }

    setLoading(true); // Start loading

    try {
      const updatedItem = {
        item: item.trim(),
        description: description.trim(),
        resourceURL: file,
        category: selectedCategory,
      };

      // Send the updated item to the server
      await axios.patch(`${baseURL}/item/${itemId}`, updatedItem, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Success("Item updated successfully!");
      navigate("/sharedlibrary"); // Redirect to Shared Library page
    } catch (error) {
      console.error("Error updating item:", error);
      Error("Failed to update item. Please try again.");
    } finally {
      setLoading(false); // Set loading to false after saving
    }
  };

  return (
    <>
      <Navbar />
      <div className="m-5 p-6 bg-gray-50 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-gray-700">
          Edit Shared Library Item
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
            onChange={handleFileUpload}
          />
          {file && (
            <img
              src={file}
              className="w-32 h-32 object-cover rounded-lg mt-2"
            />
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveChanges}
            disabled={loading || !item.trim() || !selectedCategory} // Disable while loading or if required fields are empty
            className="self-start"
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </>
  );
}

import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import { TextField, MenuItem, Button, Switch } from "@mui/material";
import axios from "axios";
import { Success, Error } from "../../Components/Toast";
import { AuthContext } from "../../Context/AuthContext";

const baseURL = "http://localhost:5000/api/lost-and-found";
const uploadURL = "http://localhost:5000/api/file/upload"; // Image upload endpoint

export default function EditLnf() {
  const { id: itemId } = useParams(); // Get item ID from URL
  const location = useLocation(); // Access state passed from navigate
  const [item, setItem] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [imageURL, setImageURL] = useState(""); // URL of uploaded image
  const [uploading, setUploading] = useState(false); // Track image upload process
  const [categories, setCategories] = useState([]);
  const [found, setFound] = useState(false); // Track if the item is found or not
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.item) {
      const { item, description, category, photo, isFound } =
        location.state.item;
      setItem(item);
      setDescription(description);
      setSelectedCategory(category);
      setImageURL(photo); // Set initial photo URL
      setFound(isFound); // Set initial found status
    } else {
      const fetchItemDetails = async () => {
        try {
          const response = await axios.get(`${baseURL}/item/${itemId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const { item, description, category, photo, found } = response.data;
          setItem(item);
          setDescription(description);
          setSelectedCategory(category);
          setImageURL(photo);
          setFound(found);
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

  // Handle Image Upload
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);

    try {
      const response = await axios.post(uploadURL, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setImageURL(response.data.url); // Set uploaded image URL
      Success("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      Error("Failed to upload image. Please try again.");
    } finally {
      setUploading(false); // Set uploading to false after upload is complete
    }
  };

  // Handle Save Changes
  const handleSaveChanges = async () => {
    if (!item.trim() || !selectedCategory) {
      Error("Item and category are required");
      return;
    }
    try {
      const updatedItem = {
        item: item.trim(),
        description: description.trim(),
        category: selectedCategory,
        photo: imageURL,
        isFound: found,
        ...(found && { foundAt: new Date() }),
      };
      await axios.patch(`${baseURL}/item/${itemId}`, updatedItem, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Success("Item updated successfully!");
      navigate("/lostnfound"); // Redirect to Lost and Found page
    } catch (error) {
      console.error("Error updating item:", error);
      Error("Failed to update item. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="m-5 p-6 bg-gray-50 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-gray-700">
          Edit Lost and Found Item
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
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {imageURL && (
            <img
              src={imageURL}
              alt="Uploaded"
              className="w-32 h-32 object-cover rounded-lg mt-2"
            />
          )}

          {/* Found Status Toggle */}
          <div className="flex items-center gap-4">
            <label htmlFor="found-toggle" className="font-medium">
              Item Found:
            </label>
            <Switch
              id="found-toggle"
              checked={found}
              onChange={(e) => setFound(e.target.checked)}
            />
          </div>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveChanges}
            disabled={uploading || !item.trim() || !selectedCategory} // Disable if uploading or fields are invalid
            className="self-start"
          >
            {uploading ? "Uploading Image..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </>
  );
}

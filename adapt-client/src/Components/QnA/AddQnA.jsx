import React, { useState, useEffect, useContext } from "react";
import Navbar from "../../Components/Navbar";
import { TextField, MenuItem, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For redirection
import { Success, Error } from "../../Components/Toast";
import { AuthContext } from "../../Context/AuthContext";

const baseURL = "http://localhost:5000/api/qna";

export default function AddQnA() {
  const [categories, setCategories] = useState([]);
  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [file, setFile] = useState(null); // Store the selected image file
  const [loading, setLoading] = useState(false); // State to manage loading
  const { token, id } = useContext(AuthContext);
  const navigate = useNavigate(); // For navigation after successful addition

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${baseURL}/categories`, {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token for authentication
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

  const handleAddQuestion = async () => {
    if (!question.trim() || !selectedCategory) {
      Error("Question and category are required");
      return;
    }
    setLoading(true); // Start loading
    try {
      let uploadedImageUrl = ""; // Local variable to hold the image URL
      // Step 1: Upload the image if a file is selected
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const uploadResponse = await axios.post(
          "http://localhost:5000/api/file/upload", // Replace with your image upload endpoint
          formData
        );

        uploadedImageUrl = uploadResponse.data.url;
        console.log("Uploaded Image URL:", uploadedImageUrl);
      }

      // Step 2: Add the question
      const newQuestion = {
        question: question.trim(),
        description: description.trim(),
        createdBy: id,
        category: selectedCategory,
        ...(uploadedImageUrl !== ""
          ? { photo: uploadedImageUrl }
          : { photo: "https://placehold.co/1600x900?text=Item" }),
      };
      console.log("New Question:", newQuestion);

      await axios.post(`${baseURL}/question`, newQuestion, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Success("Question added successfully!");
      setQuestion("");
      setDescription("");
      setSelectedCategory("");
      setFile(null);
      navigate("/qna"); // Redirect to QnA page
    } catch (error) {
      console.error("Error adding question:", error);
      Error("Failed to add question. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      <Navbar />
      <div className="m-5 p-6 bg-gray-50 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-gray-700">Add Question</h1>
        <div className="flex flex-col gap-4">
          <TextField
            label="Question"
            variant="outlined"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
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
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleAddQuestion}
            disabled={loading} // Disable while loading
            className="self-start"
          >
            {loading ? "Submitting..." : "Add Question"}
          </Button>
        </div>
      </div>
    </>
  );
}

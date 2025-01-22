import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import { TextField, MenuItem, Button, Switch } from "@mui/material";
import axios from "axios";
import { Success, Error } from "../../Components/Toast";
import { AuthContext } from "../../Context/AuthContext";

const baseURL = "http://localhost:5000/api/qna";
const uploadURL = "http://localhost:5000/api/file/upload"; // Image upload endpoint

export default function EditQnA() {
  const { id: questionId } = useParams(); // Get question ID from the URL
  const location = useLocation(); // Access state passed from navigate
  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [answered, setAnswered] = useState(false); // For answered toggle
  const [categories, setCategories] = useState([]);
  const [imageURL, setImageURL] = useState(""); // URL of uploaded image
  const [uploading, setUploading] = useState(false); // Track image upload process
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  // Pre-fill form data if passed via location.state
  useEffect(() => {
    if (location.state?.question) {
      const { question, description, category, answered, photo } =
        location.state.question;
      setQuestion(question);
      setDescription(description);
      setSelectedCategory(category);
      setAnswered(answered);
      setImageURL(photo); // Set initial photo URL
    } else {
      // Fetch question details if not passed via location.state
      const fetchQuestionDetails = async () => {
        try {
          const response = await axios.get(
            `${baseURL}/question/${questionId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const { question, description, category, answered, photo } =
            response.data;
          setQuestion(question);
          setDescription(description);
          setSelectedCategory(category);
          setAnswered(answered);
          setImageURL(photo); // Set initial photo URL
        } catch (error) {
          console.error("Error fetching question details:", error);
          Error("Failed to fetch question details");
        }
      };
      fetchQuestionDetails();
    }
  }, [location.state, questionId, token]);

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

    setUploading(true); // Set uploading to true before starting the upload

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
    if (!question.trim() || !selectedCategory) {
      Error("Question and category are required");
      return;
    }

    try {
      const updatedQuestion = {
        question: question.trim(),
        description: description.trim(),
        category: selectedCategory,
        answered,
        photo: imageURL, // Include the uploaded image URL
      };

      await axios.patch(`${baseURL}/question/${questionId}`, updatedQuestion, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Success("Question updated successfully!");
      navigate("/qna"); // Redirect back to QnA page
    } catch (error) {
      console.error("Error updating question:", error);
      Error("Failed to update question. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="m-5 p-6 bg-gray-50 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-gray-700">Edit Question</h1>
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
          <div className="flex flex-col gap-2">
            <label htmlFor="image-upload" className="font-medium">
              Upload Image:
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
            {imageURL && (
              <img
                src={imageURL}
                alt="Uploaded"
                className="w-32 h-32 object-cover rounded-lg mt-2"
              />
            )}
          </div>
          <div className="flex items-center gap-4">
            <label htmlFor="answered-toggle" className="font-medium">
              Mark as Answered:
            </label>
            <Switch
              id="answered-toggle"
              checked={answered}
              onChange={(e) => setAnswered(e.target.checked)}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveChanges}
            disabled={uploading || !question.trim() || !selectedCategory} // Disable if uploading or fields are invalid
            className="self-start"
          >
            {uploading ? "Uploading Image..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </>
  );
}

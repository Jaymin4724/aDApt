import React, { useState } from "react";
import { motion } from "framer-motion";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(""); // contains URL

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile); // Update with the selected file
    setUploadStatus(""); // Reset upload status
    setUploadedImage(""); // Reset uploaded image
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0]; // Accept only the first file
    setFile(droppedFile);
    setUploadStatus(""); // Reset upload status
    setUploadedImage(""); // Reset uploaded image
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/api/file/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setUploadStatus("File uploaded successfully!");
        setUploadedImage(data.url); // Use the uploaded file's URL to display it
      } else {
        setUploadStatus(`Error: ${data.message || "Upload failed."}`);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("Server error. Please try again later.");
    }
  };

  return (
    <div className="items-center justify-center m-5">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Upload File
        </h2>

        {/* Drag and drop area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`mb-4 p-6 border-2 ${
            isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
          } border-dashed rounded-lg text-center`}
        >
          {isDragging ? (
            <p className="text-blue-500 font-medium">Drop file here...</p>
          ) : uploadedImage ? (
            <img
              src={uploadedImage}
              alt="Uploaded"
              className="w-full h-auto rounded-lg object-contain"
            />
          ) : (
            <p className="text-gray-500">
              Drag and drop a file here, or click to select a file
            </p>
          )}
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="fileInput"
            accept="image/*" // Restrict file type to images
          />
          {!uploadedImage && (
            <label
              htmlFor="fileInput"
              className="text-blue-500 underline cursor-pointer"
            >
              Browse File
            </label>
          )}
        </div>

        {/* Display selected file */}
        {file && (
          <div className="mb-4 bg-gray-100 rounded-lg p-4">
            <p className="text-gray-700 text-sm">
              Selected File: {file.name} - {Math.round(file.size / 1024)} KB
            </p>
          </div>
        )}

        <motion.button
          onClick={handleUpload}
          className="w-full text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 rounded-xl text-md px-3 py-2.5 text-center cursor-pointer"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
          }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Upload
        </motion.button>

        {uploadStatus && (
          <div
            className={`mt-4 text-center font-medium ${
              uploadStatus.includes("successfully")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {uploadStatus}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;

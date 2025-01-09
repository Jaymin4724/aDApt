import React, { useState } from "react";
import { motion } from "framer-motion";
const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]); // Update files with the selected ones
    setUploadStatus(""); // Reset upload status
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]); // Append dropped files to the existing ones
    setUploadStatus(""); // Reset upload status
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleUpload = () => {
    if (files.length === 0) {
      setUploadStatus("Please select files to upload.");
      return;
    }

    // Simulating file upload process
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    // Replace the below code with actual API call
    setTimeout(() => {
      setUploadStatus("All files uploaded successfully!");
    }, 2000);
  };

  return (
    <div className="items-center justify-center m-5">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Upload Files
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
            <p className="text-blue-500 font-medium">Drop files here...</p>
          ) : (
            <p className="text-gray-500">
              Drag and drop files here, or click to select files
            </p>
          )}
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
            id="fileInput"
          />
          <label
            htmlFor="fileInput"
            className="text-blue-500 underline cursor-pointer"
          >
            Browse Files
          </label>
        </div>

        {/* Display selected files */}
        {files.length > 0 && (
          <ul className="mb-4 bg-gray-100 rounded-lg p-4 max-h-40 overflow-y-auto">
            {files.map((file, index) => (
              <li key={index} className="text-gray-700 text-sm">
                {index + 1}. {file.name} - {Math.round(file.size / 1024)} KB
              </li>
            ))}
          </ul>
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

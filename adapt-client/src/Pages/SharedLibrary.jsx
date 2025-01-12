import React, { useState } from "react";
import Navbar from "../Components/Navbar";

const SharedLibraryData = [
  {
    id: 1,
    name: "JavaScript Handbook",
    description: "A comprehensive guide to modern JavaScript.",
    category: "Books",
    createdBy: "user001",
    timestamp: "2025-01-01 10:00",
    link: "https://example.com/js-handbook",
  },
  {
    id: 2,
    name: "CSS Tricks",
    description: "A list of CSS tricks for web design.",
    category: "Books",
    createdBy: "user002",
    timestamp: "2025-01-02 11:30",
    link: "https://example.com/css-tricks",
  },
  {
    id: 3,
    name: "React Basics",
    description: "A beginner's guide to React.js.",
    category: "Courses",
    createdBy: "user003",
    timestamp: "2025-01-03 14:00",
    link: "https://example.com/react-basics",
  },
  {
    id: 4,
    name: "Node.js Documentation",
    description: "Official Node.js documentation for backend development.",
    category: "Documentation",
    createdBy: "user004",
    timestamp: "2025-01-04 16:30",
    link: "https://nodejs.org/en/docs/",
  },
];

export default function SharedLibrary() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Handle search input
  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  // Filter resources based on category and search term
  const filteredResources = SharedLibraryData.filter((resource) => {
    return (
      (selectedCategory === "All" || resource.category === selectedCategory) &&
      resource.name.toLowerCase().includes(searchTerm)
    );
  });

  // Toggle description for Read More feature
  const [expanded, setExpanded] = useState({});

  const toggleDescription = (id) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [id]: !prevExpanded[id],
    }));
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
            {["All", "Books", "Courses", "Documentation"].map((category) => (
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

        {/* Shared Resources Display Section */}
        <div className="w-full md:w-3/4 lg:w-5/6 bg-white p-4 overflow-auto shadow-md rounded-lg">
          <h2 className="text-lg font-bold mb-4 border-b pb-2 text-center md:text-left">
            Shared Resources
          </h2>

          {/* Search Bar */}
          <div className="mb-5">
            <input
              type="text"
              placeholder="Search resources..."
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredResources.length > 0 ? (
              filteredResources.map((resource) => (
                <div
                  key={resource.id}
                  className="border rounded-lg shadow-md p-4 bg-gray-50 hover:bg-gray-100 transition-transform transform hover:scale-105"
                >
                  <h3 className="text-lg font-semibold mb-2">
                    {resource.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Category:</strong> {resource.category}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Created By:</strong> {resource.createdBy}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Description:</strong>{" "}
                    {resource.description.length > 100 ? (
                      <>
                        {expanded[resource.id]
                          ? resource.description
                          : `${resource.description.slice(0, 100)}...`}
                        <button
                          onClick={() => toggleDescription(resource.id)}
                          className="text-blue-500 hover:underline"
                        >
                          {expanded[resource.id] ? "Show Less" : "Read More"}
                        </button>
                      </>
                    ) : (
                      resource.description
                    )}
                  </p>

                  <p className="text-xs text-gray-400">
                    <strong>Timestamp:</strong> {resource.timestamp}
                  </p>
                  <div className="mt-4">
                    <a
                      href={resource.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105"
                    >
                      Access
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-500 text-center w-full col-span-full">
                No resources found in this category.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect, useContext } from "react";
import Navbar from "../Components/Navbar";
import {
  Tabs,
  Tab,
  TextField,
  IconButton,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { Add, Edit, Save, Delete, Cancel } from "@mui/icons-material";
import axios from "axios";
import { Success, Error } from "../Components/Toast";
import { AuthContext } from "../Context/AuthContext";

const baseURL = "http://localhost:5000/api";

export default function Admin() {
  const [activeTab, setActiveTab] = useState(0);
  const [sharedCategories, setSharedCategories] = useState([]);
  const [qnaCategories, setQnaCategories] = useState([]);
  const [lnfCategories, setLnfCategories] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [newCategory, setNewCategory] = useState("");
  const [editedCategory, setEditedCategory] = useState("");

  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (activeTab === 0) fetchSharedCategories();
    if (activeTab === 1) fetchQnACategories();
    if (activeTab === 2) fetchLnfCategories();
  }, [activeTab]);

  const fetchSharedCategories = async () => {
    try {
      const response = await axios.get(`${baseURL}/shared-library/categories`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSharedCategories(response.data);
    } catch (error) {
      console.error("Error fetching Shared Library categories:", error);
      Error("Failed to fetch Shared Library categories.");
    }
  };

  const fetchQnACategories = async () => {
    try {
      const response = await axios.get(`${baseURL}/qna/categories`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQnaCategories(response.data);
    } catch (error) {
      console.error("Error fetching QnA categories:", error);
      Error("Failed to fetch QnA categories.");
    }
  };

  const fetchLnfCategories = async () => {
    try {
      const response = await axios.get(`${baseURL}/lost-and-found/categories`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLnfCategories(response.data);
    } catch (error) {
      console.error("Error fetching Lost and Found categories:", error);
      Error("Failed to fetch Lost and Found categories.");
    }
  };

  const handleAddCategory = async (apiPath, setCategories) => {
    if (!newCategory.trim()) {
      Error("Category name cannot be empty.");
      return;
    }

    try {
      const response = await axios.post(
        `${baseURL}/${apiPath}`,
        { name: newCategory.trim() },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCategories((prev) => [...prev, response.data]);
      setNewCategory("");
      Success("Category added successfully!");
    } catch (error) {
      console.error("Error adding category:", error);
      Error("Failed to add category. Please try again.");
    }
  };

  const handleEditCategory = (id, categories) => {
    setEditMode(id);
    const category = categories.find((cat) => cat._id === id);
    if (category) setEditedCategory(category.name);
  };

  const handleSaveCategory = async (id, apiPath, setCategories) => {
    if (!editedCategory.trim()) {
      Error("Category name cannot be empty.");
      return;
    }

    try {
      const response = await axios.patch(
        `${baseURL}/${apiPath}/${id}`,
        { name: editedCategory.trim() },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setCategories((prev) =>
        prev.map((cat) =>
          cat._id === id ? { ...cat, name: response.data.name } : cat
        )
      );
      setEditMode(null);
      setEditedCategory("");
      Success("Category updated successfully!");
    } catch (error) {
      console.error("Error updating category:", error);
      Error("Failed to update category. Please try again.");
    }
  };

  const handleDeleteCategory = async (id, apiPath, setCategories) => {
    try {
      await axios.delete(`${baseURL}/${apiPath}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCategories((prev) => prev.filter((cat) => cat._id !== id));
      Success("Category deleted successfully!");
    } catch (error) {
      console.error("Error deleting category:", error);
      Error("Failed to delete category. Please try again.");
    }
  };

  const handleCancelEdit = () => {
    setEditMode(null);
    setEditedCategory("");
  };

  const renderCategoryTable = (categories, apiPath, setCategories) => (
    <>
      <div className="flex gap-2 mb-4">
        <TextField
          label="Add New Category"
          variant="outlined"
          fullWidth
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleAddCategory(apiPath, setCategories)}
        >
          <Add />
        </Button>
      </div>
      <div>
        {categories.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Category Name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category, index) => (
                <TableRow key={category._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {editMode === category._id ? (
                      <TextField
                        variant="outlined"
                        size="small"
                        value={editedCategory}
                        onChange={(e) => setEditedCategory(e.target.value)}
                      />
                    ) : (
                      category.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode === category._id ? (
                      <>
                        <IconButton
                          color="primary"
                          onClick={() =>
                            handleSaveCategory(
                              category._id,
                              apiPath,
                              setCategories
                            )
                          }
                        >
                          <Save />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          onClick={handleCancelEdit}
                        >
                          <Cancel />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <IconButton
                          color="primary"
                          onClick={() =>
                            handleEditCategory(category._id, categories)
                          }
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          onClick={() =>
                            handleDeleteCategory(
                              category._id,
                              apiPath,
                              setCategories
                            )
                          }
                        >
                          <Delete />
                        </IconButton>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-gray-500 text-center py-4">
            No categories found.
          </div>
        )}
      </div>
    </>
  );

  const tabLabels = ["Shared Library", "QnA", "Lost and Found"];
  const categoryData = [
    {
      categories: sharedCategories,
      apiPath: "shared-library/category",
      setCategories: setSharedCategories,
    },
    {
      categories: qnaCategories,
      apiPath: "qna/category",
      setCategories: setQnaCategories,
    },
    {
      categories: lnfCategories,
      apiPath: "lost-and-found/category",
      setCategories: setLnfCategories,
    },
  ];

  return (
    <>
      <Navbar />
      <div className="p-6 my-5 mx-8 bg-gray-50 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-700">Admin Options</h1>
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          textColor="primary"
          indicatorColor="primary"
          variant="fullWidth"
        >
          {tabLabels.map((label, index) => (
            <Tab key={index} label={label} />
          ))}
        </Tabs>
        <div className="mt-6">
          {renderCategoryTable(
            categoryData[activeTab].categories,
            categoryData[activeTab].apiPath,
            categoryData[activeTab].setCategories
          )}
        </div>
      </div>
    </>
  );
}

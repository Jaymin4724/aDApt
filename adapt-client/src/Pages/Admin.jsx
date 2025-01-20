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
  const [qnaCategories, setQnaCategories] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [newCategory, setNewCategory] = useState("");
  const [editedCategory, setEditedCategory] = useState("");

  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (activeTab === 1) fetchQnACategories();
  }, [activeTab]);

  const fetchQnACategories = async () => {
    try {
      const response = await axios.get(`${baseURL}/qna/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setQnaCategories(response.data);
    } catch (error) {
      console.error("Error fetching QnA categories:", error);
      Error("Failed to fetch QnA categories.");
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      Error("Category name cannot be empty.");
      return;
    }

    try {
      const response = await axios.post(
        `${baseURL}/qna/category`,
        { name: newCategory.trim() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setQnaCategories((prev) => [...prev, response.data]);
      setNewCategory("");
      Success("Category added successfully!");
    } catch (error) {
      console.error("Error adding QnA category:", error);
      Error("Failed to add category. Please try again.");
    }
  };

  const handleEditCategory = (id) => {
    setEditMode(id);
    const category = qnaCategories.find((cat) => cat._id === id);
    if (category) setEditedCategory(category.name);
  };

  const handleSaveCategory = async (id) => {
    if (!editedCategory.trim()) {
      Error("Category name cannot be empty.");
      return;
    }

    try {
      const response = await axios.patch(
        `${baseURL}/qna/category/${id}`,
        { name: editedCategory.trim() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setQnaCategories((prev) =>
        prev.map((cat) =>
          cat._id === id ? { ...cat, name: response.data.name } : cat
        )
      );
      setEditMode(null);
      setEditedCategory("");
      Success("Category updated successfully!");
    } catch (error) {
      console.error("Error updating QnA category:", error);
      Error("Failed to update category. Please try again.");
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`${baseURL}/qna/category/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setQnaCategories((prev) => prev.filter((cat) => cat._id !== id));
      Success("Category deleted successfully!");
    } catch (error) {
      console.error("Error deleting QnA category:", error);
      Error("Failed to delete category. Please try again.");
    }
  };

  const handleCancelEdit = () => {
    setEditMode(null);
    setEditedCategory("");
  };

  const tabLabels = ["Shared Library", "QnA", "Lost and Found"];

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-700">Admin Panel</h1>
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
          {activeTab === 1 && (
            <>
              <h2 className="text-2xl font-semibold mb-4 text-gray-600">
                QnA Categories
              </h2>
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
                  onClick={handleAddCategory}
                >
                  <Add />
                </Button>
              </div>
              <div>
                {qnaCategories.length > 0 ? (
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Category Name</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {qnaCategories.map((category, index) => (
                        <TableRow key={category._id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>
                            {editMode === category._id ? (
                              <TextField
                                variant="outlined"
                                size="small"
                                value={editedCategory}
                                onChange={(e) =>
                                  setEditedCategory(e.target.value)
                                }
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
                                    handleSaveCategory(category._id)
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
                                    handleEditCategory(category._id)
                                  }
                                >
                                  <Edit />
                                </IconButton>
                                <IconButton
                                  color="secondary"
                                  onClick={() =>
                                    handleDeleteCategory(category._id)
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
          )}
        </div>
      </div>
    </>
  );
}

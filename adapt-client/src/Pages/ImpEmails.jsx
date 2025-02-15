import React, { useState, useEffect, useContext } from "react";
import Navbar from "../Components/Navbar";
import { TextField, IconButton } from "@mui/material";
import { Close, Add, Edit, Save, Delete, Cancel } from "@mui/icons-material";
import axios from "axios";
import { Success, Error } from "../Components/Toast";
import { AuthContext } from "../Context/AuthContext";

const baseURL = "http://localhost:5000/api";

export default function ImpMails() {
  const [emails, setEmails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editMode, setEditMode] = useState(null);
  const [editedEmail, setEditedEmail] = useState({ username: "", email: "" });
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [showAddFields, setShowAddFields] = useState(false);
  const { token, isAdmin } = useContext(AuthContext);

  useEffect(() => {
    if (!token) return; // Prevents API call if user is not authenticated
    const fetchEmails = async () => {
      try {
        const response = await axios.get(`${baseURL}/imp-emails`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmails(response.data);
      } catch (error) {
        console.error("Error fetching important emails:", error);
        Error("Failed to fetch emails");
      }
    };

    fetchEmails();
  }, [token]);

  const handleAdd = async () => {
    if (!newUsername.trim() || !newEmail.trim()) {
      Error("Please fill in both username and email fields.");
      return;
    }

    try {
      const newEmailObject = {
        username: newUsername.trim(),
        emailId: newEmail.trim(),
      };

      const response = await axios.post(
        `${baseURL}/imp-emails`,
        newEmailObject,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEmails((prevEmails) => [...prevEmails, response.data]);

      setNewUsername("");
      setNewEmail("");
      setShowAddFields(false);
      Success("Email added successfully!");
    } catch (error) {
      console.error("Error creating a new email:", error);
      Error("Failed to add the email. Please try again.");
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleEdit = (id) => {
    setEditMode(id);
    const emailToEdit = emails.find((email) => email._id === id);
    if (emailToEdit) {
      setEditedEmail({
        username: emailToEdit.username,
        email: emailToEdit.emailId,
      });
    }
  };

  const handleSave = async (id) => {
    if (!editedEmail.username.trim() || !editedEmail.email.trim()) {
      Error("Please fill in both username and email fields.");
      return;
    }

    try {
      const updatedData = {
        username: editedEmail.username,
        emailId: editedEmail.email,
      };

      const response = await axios.patch(
        `${baseURL}/imp-emails/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEmails((prevEmails) =>
        prevEmails.map((email) =>
          email._id === id ? { ...email, ...response.data } : email
        )
      );

      setEditMode(null);
      setEditedEmail({ username: "", email: "" });
      Success("Email updated successfully!");
    } catch (error) {
      console.error("Error updating email:", error);
      Error("Failed to update the email. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}/imp-emails/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEmails((prevEmails) => prevEmails.filter((email) => email._id !== id));
      Success("Email deleted successfully!");
    } catch (error) {
      console.error("Error deleting email:", error);
      Error("Failed to delete the email. Please try again.");
    }
  };

  const handleCancel = () => {
    setEditMode(null);
    setEditedEmail({ username: "", email: "" });
  };

  const filteredEmails = emails.filter(
    (email) =>
      email.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.emailId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="m-5 p-6 bg-gray-50 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-3 ml-1 text-gray-700">
          Important Emails
        </h1>
        <div className="flex gap-2 mb-3">
          <TextField
            label="Search by username or email"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearch}
          />
          {isAdmin && (
            <button
              className="bg-gray-300 hover:bg-gray-400 text-black p-3 rounded shadow transition duration-200"
              onClick={() => setShowAddFields(!showAddFields)}
            >
              {showAddFields ? <Close /> : <Add />}
            </button>
          )}
        </div>
        {showAddFields && (
          <>
            <div className="flex flex-col gap-3 mt-4">
              <TextField
                label="Username"
                variant="outlined"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                fullWidth
              />
              <TextField
                label="Email"
                variant="outlined"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                fullWidth
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-600 my-3 text-lg text-white font-bold p-3 rounded shadow flex items-center gap-2 transition duration-200"
              onClick={handleAdd}
            >
              <Add />
              Add Email
            </button>
          </>
        )}

        <div className="overflow-auto">
          {filteredEmails.length > 0 ? (
            <table className="w-full border-collapse border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    #
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Username
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Email
                  </th>
                  {isAdmin && (
                    <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-600">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredEmails.map((email, index) => (
                  <tr
                    key={email._id}
                    className="hover:bg-gray-50 transition duration-200"
                  >
                    <td className="border border-gray-300 px-4 py-3 text-sm">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-sm">
                      {editMode === email._id ? (
                        <TextField
                          size="small"
                          variant="outlined"
                          value={editedEmail.username}
                          onChange={(e) =>
                            setEditedEmail({
                              ...editedEmail,
                              username: e.target.value,
                            })
                          }
                        />
                      ) : (
                        email.username
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-sm">
                      {editMode === email._id ? (
                        <TextField
                          size="small"
                          variant="outlined"
                          value={editedEmail.email}
                          onChange={(e) =>
                            setEditedEmail({
                              ...editedEmail,
                              email: e.target.value,
                            })
                          }
                        />
                      ) : (
                        email.emailId
                      )}
                    </td>
                    {isAdmin && (
                      <td className="border border-gray-300 px-4 py-3 text-sm flex space-x-2">
                        {editMode === email._id ? (
                          <>
                            <IconButton
                              color="primary"
                              onClick={() => handleSave(email._id)}
                            >
                              <Save />
                            </IconButton>
                            <IconButton
                              color="secondary"
                              onClick={handleCancel}
                            >
                              <Cancel />
                            </IconButton>
                          </>
                        ) : (
                          <IconButton
                            color="primary"
                            onClick={() => handleEdit(email._id)}
                          >
                            <Edit />
                          </IconButton>
                        )}
                        <IconButton
                          color="secondary"
                          onClick={() => handleDelete(email._id)}
                        >
                          <Delete />
                        </IconButton>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-gray-500 text-center py-6">
              No emails found.
            </div>
          )}
        </div>
      </div>
    </>
  );
}

import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { TextField, IconButton } from "@mui/material";
import { Close, Add, Edit, Save, Delete, Cancel } from "@mui/icons-material";
import {
  getAllEmails,
  createEmail,
  updateEmail,
  deleteEmail,
} from "../Services/ImpEmailServices";

export default function ImpMails() {
  const [emails, setEmails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editMode, setEditMode] = useState(null);
  const [editedEmail, setEditedEmail] = useState({ username: "", email: "" });
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [showAddFields, setShowAddFields] = useState(false);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const data = await getAllEmails();
        setEmails(data);
      } catch (error) {
        console.error("Error fetching emails:", error);
      }
    };

    fetchEmails();
  }, []);

  const handleAdd = async () => {
    try {
      const newEmailObject = {
        username: newUsername || "New User",
        emailId: newEmail || "newuser@example.com",
      };

      const addedEmail = await createEmail(newEmailObject);
      setEmails((prevEmails) => [...prevEmails, addedEmail]);

      setNewUsername("");
      setNewEmail("");
    } catch (error) {
      console.error("Error adding email:", error);
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
    try {
      const updatedData = {
        username: editedEmail.username,
        emailId: editedEmail.email,
      };

      const updatedEmail = await updateEmail(id, updatedData);
      setEmails((prevEmails) =>
        prevEmails.map((email) =>
          email._id === id ? { ...email, ...updatedEmail } : email
        )
      );

      setEditMode(null);
      setEditedEmail({ username: "", email: "" });
    } catch (error) {
      console.error("Error updating email:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEmail(id);
      setEmails((prevEmails) => prevEmails.filter((email) => email._id !== id));
    } catch (error) {
      console.error("Error deleting email:", error);
    }
  };

  const handleCancel = () => {
    setEditMode(null); // Exit edit mode
    setEditedEmail({ username: "", email: "" }); // Reset the editedEmail state
  };

  const filteredEmails = emails.filter(
    (email) =>
      email.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.emailId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
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
          <button
            className="bg-gray-300 hover:bg-gray-400 text-black p-3 rounded shadow transition duration-200"
            onClick={() => setShowAddFields(!showAddFields)}
          >
            {showAddFields ? <Close /> : <Add />}
          </button>
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
                  <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Actions
                  </th>
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
                            onClick={handleCancel} // Cancel edit
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
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-gray-500 text-center py-6">
              No emails found. Use the "Add New" button to create one!
            </div>
          )}
        </div>
      </div>
    </>
  );
}

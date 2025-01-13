import axios from "axios";

const API_BASE_URL = "http://localhost:5000";
export const getAllEmails = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching important emails:", error);
    throw error;
  }
};

export const createEmail = async (emailData) => {
  try {
    const response = await axios.post(API_BASE_URL, emailData);
    return response.data;
  } catch (error) {
    console.error("Error creating a new email:", error);
    throw error;
  }
};

export const updateEmail = async (id, updatedData) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating email:", error);
    throw error;
  }
};

export const deleteEmail = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting email:", error);
    throw error;
  }
};

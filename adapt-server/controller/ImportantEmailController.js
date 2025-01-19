import importantEmail from "../model/importantEmailModel.js";

const getAllEmails = async (req, res) => {
  try {
    const emails = await importantEmail.find();
    res.status(200).json(emails);
  } catch (error) {
    console.error("Error fetching emails:", error);
    res.status(500).json({ error: error.message });
  }
};

const createEmail = async (req, res) => {
  try {
    const { username, emailId } = req.body;
    const newEmail = await importantEmail.create({ username, emailId });
    res.status(201).json(newEmail);
  } catch (error) {
    console.error("Error creating email:", error);
    res.status(400).json({ error: error.message });
  }
};

const updateEmail = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, emailId } = req.body;
    const updatedEmail = await importantEmail.findByIdAndUpdate(
      id,
      { username, emailId },
      { new: true, runValidators: true }
    );
    if (!updatedEmail) {
      return res.status(404).json({ error: "Email not found" });
    }
    res.status(200).json(updatedEmail);
  } catch (error) {
    console.error("Error updating email:", error);
    res.status(400).json({ error: error.message });
  }
};

const deleteEmail = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmail = await importantEmail.findByIdAndDelete(id);
    if (!deletedEmail) {
      return res.status(404).json({ error: "Email not found" });
    }
    res.status(200).json({ message: "Email deleted successfully" });
  } catch (error) {
    console.error("Error deleting email:", error);
    res.status(500).json({ error: error.message });
  }
};

export { getAllEmails, createEmail, updateEmail, deleteEmail };

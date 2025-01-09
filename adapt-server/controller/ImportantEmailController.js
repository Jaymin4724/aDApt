import ImportantEmail from "../model/ImportantEmailModel.js";

// Get all emails
const getAllEmails = async (req, res) => {
  try {
    const impmails = await ImportantEmail.find();
    res.status(200).json(impmails);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Create a new email
const createEmail = async (req, res) => {
  try {
    const { name, emailId } = req.body;
    const newEmail = await ImportantEmail.create({ name, emailId });
    res.status(201).json(newEmail);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

// Update email by ID
const updateEmail = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, emailId } = req.body;
    const updatedEmail = await ImportantEmail.findByIdAndUpdate(
      id,
      { name, emailId },
      { new: true, runValidators: true }
    );
    if (!updatedEmail) {
      return res.status(404).json({ error: "Email not found" });
    }
    res.status(200).json(updatedEmail);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

// Delete email by ID
const deleteEmail = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmail = await ImportantEmail.findByIdAndDelete(id);
    if (!deletedEmail) {
      return res.status(404).json({ error: "Email not found" });
    }
    res.status(200).json({ message: "Email deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export { getAllEmails, createEmail, updateEmail, deleteEmail };

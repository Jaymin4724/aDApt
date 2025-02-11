import Chat from "../model/chatModel.js";

// Save a message
export const saveMessage = async (data) => {
  try {
    const newMessage = new Chat(data);
    await newMessage.save();
    console.log("Message saved successfully:", newMessage);
  } catch (error) {
    console.error("Error saving message to the database:", error);
    throw error; // Ensure the error is propagated
  }
};

// Get messages for a room
export const getMessages = async (req, res) => {
  const { room } = req.params;
  try {
    const messages = await Chat.find({ room }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

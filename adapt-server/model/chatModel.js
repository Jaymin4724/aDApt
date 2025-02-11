import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    room: { type: String, required: true }, // QnA or Lost & Found item ID
    author: { type: String, required: true },
    message: { type: String, required: true },
    time: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Chat", chatSchema);

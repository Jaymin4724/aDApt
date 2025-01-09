// importantEmailModel.js
import mongoose from "mongoose";

const importantEmailSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    createdBy: {
      type: String,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const ImportantEmail = mongoose.model("ImportantEmail", importantEmailSchema);

export default ImportantEmail;

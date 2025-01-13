import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required. Please provide your username."],
      minlength: [3, "Username must be at least 3 characters long."],
      maxlength: [20, "Username must be at most 20 characters long."],
      uppercase: true,
    },
    emailId: {
      type: String,
      required: [
        true,
        "Email ID is required. Please provide a valid email address.",
      ],
      unique: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Invalid email format. Please provide a valid email address.",
      ],
      lowercase: true,
    },
    password: {
      type: String,
      required: [
        true,
        "Password is required. Please provide your valid password.",
      ],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    token: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);

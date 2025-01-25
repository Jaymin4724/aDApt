  import mongoose from "mongoose";

  const importantEmailSchema = new mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
      },
      emailId: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Valid email regex
      },
    },
    {
      timestamps: true, // Adds createdAt and updatedAt fields
    }
  );

  const importantEmail = mongoose.model("importantEmail", importantEmailSchema);

  export default importantEmail;

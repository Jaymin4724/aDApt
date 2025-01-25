import mongoose from "mongoose";

// LostAndFoundCategory Schema
const lostAndFoundCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, uppercase: true },
  },
  {
    timestamps: true,
  }
);

// LostAndFoundItem Schema
const lostAndFoundItemSchema = new mongoose.Schema(
  {
    item: { type: String, required: true },
    description: { type: String },
    photo: { type: String, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LostAndFoundCategory",
      required: true,
    },
    isFound: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// Define and export the models
const LostAndFoundCategory = mongoose.model(
  "LostAndFoundCategory",
  lostAndFoundCategorySchema
);
const LostAndFoundItem = mongoose.model(
  "LostAndFoundItem",
  lostAndFoundItemSchema
);

export { LostAndFoundCategory, LostAndFoundItem };

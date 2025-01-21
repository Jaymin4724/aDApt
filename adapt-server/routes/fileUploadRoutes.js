import express from "express";
import multer from "multer";
import { uploadFile } from "../controller/fileUploadController.js";

const fileUploadRouter = express.Router();

// Multer setup for file handling (middleware)
const upload = multer({ dest: "uploads/" });

// POST route for uploading an image
fileUploadRouter.post("/upload", upload.single("file"), uploadFile);

export { fileUploadRouter };

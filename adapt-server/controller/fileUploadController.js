import path from "path"; // Built-in Node.js module
import cloudinary from "../utils/cloudinary.js";

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileExtension = path.extname(req.file.originalname); // E.g., ".pdf", ".jpg"
    const mimeType = req.file.mimetype;

    // Determine the resource type based on mimeType, do not use "raw"
    const resourceType = mimeType.startsWith("image/") ? "image" : "auto"; // "auto" allows Cloudinary to detect the file type automatically

    // Upload the file to Cloudinary without transformations
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "uploads",
      use_filename: true, // Use the original filename
      unique_filename: false, // Avoid adding unique hashes to filenames
      public_id: path.basename(req.file.originalname, fileExtension), // File name without extension
      resource_type: resourceType, // Use "auto" to store file as uploaded format (image, pdf, etc.)
      // No transformations for any file type (image or non-image)
    });

    // Cloudinary provides the URL with the correct file format automatically
    const secureUrl = result.secure_url;

    res.status(200).json({
      message: "File uploaded successfully",
      url: secureUrl,
      format: result.format || "Not detected",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

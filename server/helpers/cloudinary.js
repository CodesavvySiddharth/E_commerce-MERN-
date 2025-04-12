const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Log actual values for debugging (remove in production)
console.log("Cloudinary Configuration:");
console.log("CLOUDINARY_CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("CLOUDINARY_API_KEY:", process.env.CLOUDINARY_API_KEY ? "Set (hidden for security)" : "Not set");
console.log("CLOUDINARY_API_SECRET:", process.env.CLOUDINARY_API_SECRET ? "Set (hidden for security)" : "Not set");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  try {
    // Validate that we have the required credentials
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      throw new Error("Missing Cloudinary credentials in environment variables");
    }
    
    // Upload the image
    console.log("Attempting to upload image to Cloudinary...");
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    
    console.log("Image uploaded successfully:", result.public_id);
    return result;
  } catch (error) {
    console.error("Cloudinary upload error:", error.message);
    
    // Provide detailed error information
    if (error.http_code) {
      console.error(`HTTP Error ${error.http_code}: ${error.message}`);
    }
    
    // Rethrow the error to be handled by the controller
    throw new Error(`Failed to upload image: ${error.message}`);
  }
}

const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };

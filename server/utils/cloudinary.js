const multer = require('multer');
const cloudinary = require('cloudinary').v2; // Using v2 directly
const streamifier = require('streamifier');
// Configure Cloudinary
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Set up Cloudinary storage for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "rental-app", // Folder in Cloudinary where images will be stored
    allowed_formats: ["jpg","jpeg", "png", "gif"], // Allowed file formats
    transformation: [{ width: 800, height: 600, crop: "limit" }], // Optional: Resize images
  },
});

module.exports = { cloudinary, storage };
/*const multer = require("multer");
const path = require("path"); // Import the path module
const { storage } = require("../utils/cloudinary");

// File filter for image types
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase()); // Use path.extname
  const mimeType = allowedTypes.test(file.mimetype);

  if (extName && mimeType) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, PNG, GIF, or JPG images are allowed"), false);
  }
};

// Multer middleware for image upload
const upload = multer({
  storage: storage, // Use Cloudinary storage
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: fileFilter,
});

module.exports = upload;*/
const multer = require("multer");
const path = require("path");
const { storage } = require("../utils/cloudinary");

const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
const SUPPORTED_EXTENSIONS = ['.jpeg', '.jpg', '.png', '.gif'];

const fileFilter = (req, file, cb) => {
  const extension = path.extname(file.originalname).toLowerCase();
  const isValidExtension = SUPPORTED_EXTENSIONS.includes(extension);
  const isValidMimetype = SUPPORTED_IMAGE_TYPES.includes(file.mimetype);

  if (isValidExtension && isValidMimetype) {
    return cb(null, true);
  }
  
  cb(new Error(`Unsupported file type. Supported types: ${SUPPORTED_EXTENSIONS.join(', ')}`), false);
};

const upload = multer({
  storage: storage,
  limits: { 
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 4 // Maximum 4 files
  },
  fileFilter: fileFilter
});

const handleMulterErrors = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: err.code === 'LIMIT_FILE_SIZE' 
        ? 'File size too large (max 5MB)' 
        : 'File upload error'
    });
  } else if (err) {
    return res.status(400).json({
      success: false,
      message: err.message || 'File upload failed'
    });
  }
  next();
};

module.exports = { upload, handleMulterErrors };
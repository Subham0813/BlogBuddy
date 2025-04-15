const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "public", "uploads", `_${req.user._id}`);

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath); // Destination folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname.trim().replace(/\s+/g, "")); // Unique file name
  },
});

// Function to check if file is an image
const fileFilter = (req, file, cb) => {
  // Check the MIME type of the file
  const allowedMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    // File is an image
    cb(null, true);
  } else {
    // Reject the file if it is not an image
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Max size 5MB (optional)
});

module.exports = {
  upload
};

const multer = require("multer");

// Use memory storage (no disk storage)
const storage = multer.memoryStorage();

// File filter
const fileFilter = (req, file, cb) => {
  const imageTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/webp",
    "image/gif",
  ];

  if (file.fieldname === "governmentDocument") {
    // Government document allows images OR pdf
    if ([...imageTypes, "application/pdf"].includes(file.mimetype)) {
      return cb(null, true);
    }
    return cb(new Error("Government document must be JPG, PNG or PDF"), false);
  }

  // Default (profilePhoto, image, images, etc.) - images only
  if (imageTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Only JPEG, PNG, JPG, WEBP, and GIF images are allowed"),
      false,
    );
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: fileFilter,
});

// Error handling middleware for multer
const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "FILE_TOO_LARGE") {
      return res.status(400).json({
        success: false,
        message: "File is too large. Maximum size is 5MB",
      });
    }
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
  if (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
  next();
};

// Universal upload middleware - can be used with any field name
const uploadImage = upload.single("image");

// Upload multiple images
const uploadMultipleImages = upload.array("images", 10);

// Upload with custom field name
const uploadWithField = (fieldName) => {
  return upload.single(fieldName);
};

// Upload for profile update - handles profilePhoto (image) and governmentDocument (image or pdf)
const uploadProfileFields = upload.fields([
  { name: "profilePhoto", maxCount: 1 },
  { name: "governmentDocument", maxCount: 1 },
]);

module.exports = {
  uploadImage,
  uploadMultipleImages,
  uploadWithField,
  uploadProfileFields,
  handleUploadError,
};

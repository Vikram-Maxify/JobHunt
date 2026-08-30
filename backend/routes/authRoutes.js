const express = require("express");

const router = express.Router();

const {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  logout,
} = require("../controllers/authController");

const { protect } = require("../middleware/auth");

const {
  uploadProfileFields,
  handleUploadError,
} = require("../middleware/upload");

router.post("/register", register);

router.post("/login", login);

router.use(protect);
console.log({ uploadProfileFields, handleUploadError, updateProfile });
router.get("/profile", getProfile);

router.put("/profile", uploadProfileFields, handleUploadError, updateProfile);

router.put("/change-password", changePassword);

router.post("/logout", logout);

module.exports = router;

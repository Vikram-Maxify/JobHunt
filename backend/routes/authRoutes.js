const express = require('express');
const router = express.Router();
const {
    register,
    login,
    getProfile,
    updateProfile,
    uploadProfilePhoto,
    uploadGovernmentDocument,
    deleteProfilePhoto,
    deleteGovernmentDocument,
    deleteResume,
    changePassword,
    logout
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const {
    uploadImage,
    handleUploadError
} = require('../middleware/upload');

// ============ PUBLIC ROUTES ============
router.post('/register', register);
router.post('/login', login);

// ============ PROTECTED ROUTES ============
router.use(protect);

// Profile
router.get('/profile', getProfile);
router.put('/profile', updateProfile);

// Profile Photo
router.post(
    '/upload-photo',
    uploadImage,
    handleUploadError,
    uploadProfilePhoto
);
router.delete('/profile-photo', deleteProfilePhoto);

// Government Document
router.post(
    '/upload-govt-doc',
    uploadImage,
    handleUploadError,
    uploadGovernmentDocument
);
router.delete('/govt-doc', deleteGovernmentDocument);

// Resume
router.delete('/resume', deleteResume);

// Change Password
router.put('/change-password', changePassword);

// Logout
router.post('/logout', logout);

module.exports = router;
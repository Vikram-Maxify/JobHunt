const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {
    uploadToImgBB,
    deleteFromImgBB
} = require('../utils/imgbb');

// ============================================================
// GENERATE JWT
// ============================================================
const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRE
        }
    );
};

// ============================================================
// REGISTER USER
// ============================================================
// @route POST /api/auth/register
// @access Public
// ============================================================
exports.register = async (req, res) => {
    try {
        const {
            name,
            mobile,
            email,
            password
        } = req.body;

        // Required fields
        if (!name || !mobile || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Name, mobile, email and password are required'
            });
        }

        // Password length
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters'
            });
        }

        // Normalize email/mobile
        const normalizedEmail = email.toLowerCase().trim();
        const normalizedMobile = mobile.trim();

        // Check existing user
        const userExists = await User.findOne({
            $or: [
                { email: normalizedEmail },
                { mobile: normalizedMobile }
            ]
        });

        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email or mobile'
            });
        }

        // ====================================================
        // HASH PASSWORD IN CONTROLLER
        // ====================================================
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name: name.trim(),
            mobile: normalizedMobile,
            email: normalizedEmail,
            password: hashedPassword
        });

        // Generate token
        const token = generateToken(user._id);

        // Set cookie
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                id: user._id,
                name: user.name,
                mobile: user.mobile,
                email: user.email,
                role: user.role
            },
            token
        });

    } catch (error) {
        console.error('Register error:', error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ============================================================
// LOGIN USER
// ============================================================
// @route POST /api/auth/login
// @access Public
// ============================================================
exports.login = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        const normalizedEmail = email.toLowerCase().trim();

        // Password select:false hai, isliye manually select
        const user = await User.findOne({
            email: normalizedEmail
        }).select('+password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Check active account
        if (!user.isActive) {
            return res.status(403).json({
                success: false,
                message: 'Your account is inactive'
            });
        }

        // ====================================================
        // COMPARE PASSWORD IN CONTROLLER
        // ====================================================
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Update last login
        user.lastLogin = new Date();

        await user.save({
            validateBeforeSave: false
        });

        // Generate token
        const token = generateToken(user._id);

        // Set cookie
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                id: user._id,
                name: user.name,
                mobile: user.mobile,
                email: user.email,
                role: user.role
            },
            token
        });

    } catch (error) {
        console.error('Login error:', error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ============================================================
// GET PROFILE
// ============================================================
// @route GET /api/auth/profile
// @access Private
// ============================================================
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                role: user.role,

                location: user.location || '',
                dateOfBirth: user.dateOfBirth || '',
                gender: user.gender || '',

                qualification: user.qualification || '',
                university: user.university || '',
                graduationYear: user.graduationYear || '',

                jobTitle: user.jobTitle || '',
                currentCompany: user.currentCompany || '',
                experience: user.experience || '',

                skills: user.skills || [],
                bio: user.bio || '',

                preferredJobRole: user.preferredJobRole || '',
                preferredLocation: user.preferredLocation || '',
                employmentType: user.employmentType || '',
                salaryExpectation: user.salaryExpectation || '',

                linkedin: user.linkedin || '',
                github: user.github || '',
                portfolio: user.portfolio || '',

                resume:
                    user.resume?.url ||
                    user.resume?.displayUrl ||
                    '',

                profilePhoto:
                    user.profilePhoto?.displayUrl ||
                    user.profilePhoto?.url ||
                    '',

                governmentDocumentType:
                    user.governmentDocumentType || '',

                governmentDocument:
                    user.governmentDocument?.url ||
                    user.governmentDocument?.displayUrl ||
                    '',

                governmentDocumentName:
                    user.governmentDocumentName || '',

                isActive: user.isActive,
                isVerified: user.isVerified,

                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        });

    } catch (error) {
        console.error('Get profile error:', error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ============================================================
// UPDATE PROFILE
// ============================================================
// @route PUT /api/auth/profile
// @access Private
// ============================================================
exports.updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const {
            name,
            email,
            mobile,
            location,
            dateOfBirth,
            gender,
            qualification,
            university,
            graduationYear,
            jobTitle,
            currentCompany,
            experience,
            skills,
            bio,
            preferredJobRole,
            preferredLocation,
            employmentType,
            salaryExpectation,
            linkedin,
            github,
            portfolio,
            resume,
            governmentDocumentType,
            governmentDocumentName
        } = req.body;

        // ====================================================
        // EMAIL
        // ====================================================
        if (email !== undefined) {
            const normalizedEmail = email.toLowerCase().trim();

            if (normalizedEmail !== user.email) {
                const existingEmail = await User.findOne({
                    email: normalizedEmail,
                    _id: { $ne: user._id }
                });

                if (existingEmail) {
                    return res.status(400).json({
                        success: false,
                        message: 'Email already in use'
                    });
                }

                user.email = normalizedEmail;
            }
        }

        // ====================================================
        // MOBILE
        // ====================================================
        if (mobile !== undefined) {
            const normalizedMobile = mobile.trim();

            if (normalizedMobile !== user.mobile) {
                const existingMobile = await User.findOne({
                    mobile: normalizedMobile,
                    _id: { $ne: user._id }
                });

                if (existingMobile) {
                    return res.status(400).json({
                        success: false,
                        message: 'Mobile number already in use'
                    });
                }

                user.mobile = normalizedMobile;
            }
        }

        // ====================================================
        // BASIC INFO
        // ====================================================
        if (name !== undefined) {
            user.name = name.trim();
        }

        if (location !== undefined) {
            user.location = location;
        }

        if (dateOfBirth !== undefined) {
            user.dateOfBirth = dateOfBirth;
        }

        if (gender !== undefined) {
            user.gender = gender;
        }

        // ====================================================
        // EDUCATION
        // ====================================================
        if (qualification !== undefined) {
            user.qualification = qualification;
        }

        if (university !== undefined) {
            user.university = university;
        }

        if (graduationYear !== undefined) {
            user.graduationYear = graduationYear;
        }

        // ====================================================
        // EXPERIENCE
        // ====================================================
        if (jobTitle !== undefined) {
            user.jobTitle = jobTitle;
        }

        if (currentCompany !== undefined) {
            user.currentCompany = currentCompany;
        }

        if (experience !== undefined) {
            user.experience = experience;
        }

        // ====================================================
        // SKILLS
        // ====================================================
        if (skills !== undefined) {
            if (typeof skills === 'string') {
                user.skills = skills
                    .split(',')
                    .map(s => s.trim())
                    .filter(Boolean);
            } else if (Array.isArray(skills)) {
                user.skills = skills;
            }
        }

        // ====================================================
        // BIO
        // ====================================================
        if (bio !== undefined) {
            user.bio = bio;
        }

        // ====================================================
        // CAREER
        // ====================================================
        if (preferredJobRole !== undefined) {
            user.preferredJobRole = preferredJobRole;
        }

        if (preferredLocation !== undefined) {
            user.preferredLocation = preferredLocation;
        }

        if (employmentType !== undefined) {
            user.employmentType = employmentType;
        }

        if (salaryExpectation !== undefined) {
            user.salaryExpectation = salaryExpectation;
        }

        // ====================================================
        // SOCIAL LINKS
        // ====================================================
        if (linkedin !== undefined) {
            user.linkedin = linkedin;
        }

        if (github !== undefined) {
            user.github = github;
        }

        if (portfolio !== undefined) {
            user.portfolio = portfolio;
        }

        // ====================================================
        // RESUME
        // ====================================================
        if (resume !== undefined) {
            if (
                user.resume &&
                user.resume.deleteUrl
            ) {
                await deleteFromImgBB(
                    user.resume.deleteUrl
                );
            }

            user.resume = {
                url: resume,
                displayUrl: resume,
                deleteUrl: '',
                filename: '',
                size: 0
            };
        }

        // ====================================================
        // GOVERNMENT DOCUMENT INFO
        // ====================================================
        if (governmentDocumentType !== undefined) {
            user.governmentDocumentType =
                governmentDocumentType;
        }

        if (governmentDocumentName !== undefined) {
            user.governmentDocumentName =
                governmentDocumentName;
        }

        // ====================================================
        // PROFILE PHOTO
        // ====================================================
        if (
            req.file &&
            req.file.fieldname === 'profilePhoto'
        ) {
            if (
                user.profilePhoto &&
                user.profilePhoto.deleteUrl
            ) {
                await deleteFromImgBB(
                    user.profilePhoto.deleteUrl
                );
            }

            const uploadResult = await uploadToImgBB(
                req.file.buffer,
                req.file.originalname,
                {
                    name: `profile-${user._id}`
                }
            );

            user.profilePhoto = uploadResult.data;
        }

        // ====================================================
        // GOVERNMENT DOCUMENT
        // ====================================================
        if (
            req.file &&
            req.file.fieldname === 'governmentDocument'
        ) {
            if (
                user.governmentDocument &&
                user.governmentDocument.deleteUrl
            ) {
                await deleteFromImgBB(
                    user.governmentDocument.deleteUrl
                );
            }

            const uploadResult = await uploadToImgBB(
                req.file.buffer,
                req.file.originalname,
                {
                    name: `govt-${user._id}`
                }
            );

            user.governmentDocument = {
                url: uploadResult.data.url,
                displayUrl: uploadResult.data.displayUrl,
                deleteUrl: uploadResult.data.deleteUrl,
                filename: uploadResult.data.filename,
                size: uploadResult.data.size,
                fileType: req.file.mimetype
            };

            user.governmentDocumentName =
                req.file.originalname;
        }

        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                role: user.role,

                location: user.location || '',
                dateOfBirth: user.dateOfBirth || '',
                gender: user.gender || '',

                qualification: user.qualification || '',
                university: user.university || '',
                graduationYear: user.graduationYear || '',

                jobTitle: user.jobTitle || '',
                currentCompany: user.currentCompany || '',
                experience: user.experience || '',

                skills: user.skills || [],
                bio: user.bio || '',

                preferredJobRole:
                    user.preferredJobRole || '',

                preferredLocation:
                    user.preferredLocation || '',

                employmentType:
                    user.employmentType || '',

                salaryExpectation:
                    user.salaryExpectation || '',

                linkedin: user.linkedin || '',
                github: user.github || '',
                portfolio: user.portfolio || '',

                resume:
                    user.resume?.url ||
                    user.resume?.displayUrl ||
                    '',

                profilePhoto:
                    user.profilePhoto?.displayUrl ||
                    user.profilePhoto?.url ||
                    '',

                governmentDocumentType:
                    user.governmentDocumentType || '',

                governmentDocument:
                    user.governmentDocument?.url ||
                    user.governmentDocument?.displayUrl ||
                    '',

                governmentDocumentName:
                    user.governmentDocumentName || '',

                updatedAt: user.updatedAt
            }
        });

    } catch (error) {
        console.error('Update profile error:', error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ============================================================
// UPLOAD PROFILE PHOTO ONLY
// ============================================================
// @route POST /api/auth/upload-photo
// @access Private
// ============================================================
exports.uploadProfilePhoto = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Profile photo is required'
            });
        }

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Delete old image
        if (
            user.profilePhoto &&
            user.profilePhoto.deleteUrl
        ) {
            await deleteFromImgBB(
                user.profilePhoto.deleteUrl
            );
        }

        // Upload new image
        const uploadResult = await uploadToImgBB(
            req.file.buffer,
            req.file.originalname,
            {
                name: `profile-${user._id}`
            }
        );

        user.profilePhoto = uploadResult.data;

        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Profile photo updated successfully',
            data: {
                profilePhoto:
                    user.profilePhoto?.displayUrl ||
                    user.profilePhoto?.url ||
                    ''
            }
        });

    } catch (error) {
        console.error(
            'Upload profile photo error:',
            error
        );

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ============================================================
// UPLOAD GOVERNMENT DOCUMENT ONLY
// ============================================================
// @route POST /api/auth/upload-govt-doc
// @access Private
// ============================================================
exports.uploadGovernmentDocument = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Government document is required'
            });
        }

        const {
            documentType
        } = req.body;

        if (!documentType) {
            return res.status(400).json({
                success: false,
                message: 'Document type is required'
            });
        }

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Delete old document
        if (
            user.governmentDocument &&
            user.governmentDocument.deleteUrl
        ) {
            await deleteFromImgBB(
                user.governmentDocument.deleteUrl
            );
        }

        // Upload document
        const uploadResult = await uploadToImgBB(
            req.file.buffer,
            req.file.originalname,
            {
                name: `govt-${user._id}`
            }
        );

        user.governmentDocumentType = documentType;

        user.governmentDocument = {
            url: uploadResult.data.url,
            displayUrl: uploadResult.data.displayUrl,
            deleteUrl: uploadResult.data.deleteUrl,
            filename: uploadResult.data.filename,
            size: uploadResult.data.size,
            fileType: req.file.mimetype
        };

        user.governmentDocumentName =
            req.file.originalname;

        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Government document uploaded successfully',
            data: {
                governmentDocumentType:
                    user.governmentDocumentType,

                governmentDocument:
                    user.governmentDocument?.url ||
                    user.governmentDocument?.displayUrl ||
                    '',

                governmentDocumentName:
                    user.governmentDocumentName
            }
        });

    } catch (error) {
        console.error(
            'Upload government document error:',
            error
        );

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ============================================================
// DELETE PROFILE PHOTO
// ============================================================
// @route DELETE /api/auth/profile-photo
// @access Private
// ============================================================
exports.deleteProfilePhoto = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        if (
            user.profilePhoto &&
            user.profilePhoto.deleteUrl
        ) {
            await deleteFromImgBB(
                user.profilePhoto.deleteUrl
            );
        }

        user.profilePhoto = {
            url: '',
            displayUrl: '',
            deleteUrl: '',
            thumb: '',
            medium: '',
            filename: '',
            imgbbId: ''
        };

        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Profile photo deleted successfully'
        });

    } catch (error) {
        console.error(
            'Delete profile photo error:',
            error
        );

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ============================================================
// DELETE GOVERNMENT DOCUMENT
// ============================================================
// @route DELETE /api/auth/govt-doc
// @access Private
// ============================================================
exports.deleteGovernmentDocument = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        if (
            user.governmentDocument &&
            user.governmentDocument.deleteUrl
        ) {
            await deleteFromImgBB(
                user.governmentDocument.deleteUrl
            );
        }

        user.governmentDocumentType = '';

        user.governmentDocument = {
            url: '',
            displayUrl: '',
            deleteUrl: '',
            filename: '',
            size: 0,
            fileType: ''
        };

        user.governmentDocumentName = '';

        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Government document deleted successfully'
        });

    } catch (error) {
        console.error(
            'Delete government document error:',
            error
        );

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ============================================================
// DELETE RESUME
// ============================================================
// @route DELETE /api/auth/resume
// @access Private
// ============================================================
exports.deleteResume = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        if (
            user.resume &&
            user.resume.deleteUrl
        ) {
            await deleteFromImgBB(
                user.resume.deleteUrl
            );
        }

        user.resume = {
            url: '',
            displayUrl: '',
            deleteUrl: '',
            filename: '',
            size: 0
        };

        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Resume deleted successfully'
        });

    } catch (error) {
        console.error(
            'Delete resume error:',
            error
        );

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ============================================================
// CHANGE PASSWORD
// ============================================================
// @route PUT /api/auth/change-password
// @access Private
// ============================================================
exports.changePassword = async (req, res) => {
    try {
        const {
            currentPassword,
            newPassword
        } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message:
                    'Current password and new password are required'
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message:
                    'New password must be at least 6 characters'
            });
        }

        const user = await User.findById(
            req.user._id
        ).select('+password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // ====================================================
        // CHECK CURRENT PASSWORD
        // ====================================================
        const isMatch = await bcrypt.compare(
            currentPassword,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Current password is incorrect'
            });
        }

        // ====================================================
        // HASH NEW PASSWORD
        // ====================================================
        const hashedPassword = await bcrypt.hash(
            newPassword,
            10
        );

        user.password = hashedPassword;

        await user.save();

        // Generate new token
        const token = generateToken(user._id);

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            message: 'Password changed successfully',
            token
        });

    } catch (error) {
        console.error(
            'Change password error:',
            error
        );

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ============================================================
// LOGOUT
// ============================================================
// @route POST /api/auth/logout
// @access Private
// ============================================================
exports.logout = async (req, res) => {
    try {
        res.clearCookie('token');

        return res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });

    } catch (error) {
        console.error('Logout error:', error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
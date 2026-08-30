const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { uploadToImgBB, deleteFromImgBB } = require("../utils/imgbb");

// ============================================================
// GENERATE JWT
// ============================================================
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// ============================================================
// REGISTER USER
// ============================================================
exports.register = async (req, res) => {
  try {
    const { name, mobile, email, password } = req.body;

    // Required fields
    if (!name || !mobile || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, mobile, email and password are required",
      });
    }

    // Password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // Normalize email/mobile
    const normalizedEmail = email.toLowerCase().trim();
    const normalizedMobile = mobile.trim();

    // Check existing user
    const userExists = await User.findOne({
      $or: [{ email: normalizedEmail }, { mobile: normalizedMobile }],
    });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email or mobile",
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
      password: hashedPassword,
    });

    // Generate token
    const token = generateToken(user._id);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: user._id,
        name: user.name,
        mobile: user.mobile,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Register error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================================
// LOGIN USER
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Password select:false hai, isliye manually select
    const user = await User.findOne({
      email: normalizedEmail,
    }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check active account
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Your account is inactive",
      });
    }

    // ====================================================
    // COMPARE PASSWORD IN CONTROLLER
    // ====================================================
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Update last login
    user.lastLogin = new Date();

    await user.save({
      validateBeforeSave: false,
    });

    // Generate token
    const token = generateToken(user._id);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        id: user._id,
        name: user.name,
        mobile: user.mobile,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================================
// GET PROFILE
// ============================================================
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
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

        location: user.location || "",
        dateOfBirth: user.dateOfBirth || "",
        gender: user.gender || "",

        qualification: user.qualification || "",
        university: user.university || "",
        graduationYear: user.graduationYear || "",

        jobTitle: user.jobTitle || "",
        currentCompany: user.currentCompany || "",
        experience: user.experience || "",

        skills: user.skills || [],
        bio: user.bio || "",

        preferredJobRole: user.preferredJobRole || "",
        preferredLocation: user.preferredLocation || "",
        employmentType: user.employmentType || "",
        salaryExpectation: user.salaryExpectation || "",

        linkedin: user.linkedin || "",
        github: user.github || "",
        portfolio: user.portfolio || "",

        resume: user.resume?.url || user.resume?.displayUrl || "",

        profilePhoto:
          user.profilePhoto?.displayUrl || user.profilePhoto?.url || "",

        governmentDocumentType: user.governmentDocumentType || "",

        governmentDocument:
          user.governmentDocument?.url ||
          user.governmentDocument?.displayUrl ||
          "",

        governmentDocumentName: user.governmentDocumentName || "",

        isActive: user.isActive,
        isVerified: user.isVerified,

        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.error("Get profile error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================================
// UPDATE COMPLETE PROFILE
// ============================================================
exports.updateProfile = async (req, res) => {
  console.log("FILES RECEIVED:", req.files);
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ========================================================
    // REQUEST BODY
    // ========================================================

    const {
      name,
      email,
      mobile,
      phone,

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
      governmentDocumentName,
    } = req.body;

    // ========================================================
    // BASIC INFORMATION
    // ========================================================

    if (name !== undefined) {
      const value = String(name).trim();

      if (!value) {
        return res.status(400).json({
          success: false,
          message: "Name is required",
        });
      }

      user.name = value;
    }

    // ========================================================
    // EMAIL
    // ========================================================

    if (email !== undefined) {
      const normalizedEmail = String(email).toLowerCase().trim();

      if (!normalizedEmail) {
        return res.status(400).json({
          success: false,
          message: "Email is required",
        });
      }

      if (normalizedEmail !== user.email) {
        const existingEmail = await User.findOne({
          email: normalizedEmail,
          _id: {
            $ne: user._id,
          },
        });

        if (existingEmail) {
          return res.status(400).json({
            success: false,
            message: "Email already in use",
          });
        }
      }

      user.email = normalizedEmail;
    }

    // ========================================================
    // MOBILE
    // Supports both: mobile and phone
    // ========================================================

    const incomingMobile = mobile !== undefined ? mobile : phone;

    if (incomingMobile !== undefined) {
      const normalizedMobile = String(incomingMobile).trim();

      if (!normalizedMobile) {
        return res.status(400).json({
          success: false,
          message: "Mobile number is required",
        });
      }

      if (normalizedMobile !== user.mobile) {
        const existingMobile = await User.findOne({
          mobile: normalizedMobile,
          _id: {
            $ne: user._id,
          },
        });

        if (existingMobile) {
          return res.status(400).json({
            success: false,
            message: "Mobile number already in use",
          });
        }
      }

      user.mobile = normalizedMobile;
    }

    // ========================================================
    // PERSONAL
    // ========================================================

    if (location !== undefined) {
      user.location = String(location).trim();
    }

    if (dateOfBirth !== undefined) {
      user.dateOfBirth = String(dateOfBirth).trim();
    }

    if (gender !== undefined) {
      user.gender = String(gender).trim();
    }

    // ========================================================
    // EDUCATION
    // ========================================================

    if (qualification !== undefined) {
      user.qualification = String(qualification).trim();
    }

    if (university !== undefined) {
      user.university = String(university).trim();
    }

    if (graduationYear !== undefined) {
      user.graduationYear = String(graduationYear).trim();
    }

    // ========================================================
    // EXPERIENCE
    // ========================================================

    if (jobTitle !== undefined) {
      user.jobTitle = String(jobTitle).trim();
    }

    if (currentCompany !== undefined) {
      user.currentCompany = String(currentCompany).trim();
    }

    if (experience !== undefined) {
      user.experience = String(experience).trim();
    }

    // ========================================================
    // SKILLS
    // ========================================================

    if (skills !== undefined) {
      if (Array.isArray(skills)) {
        user.skills = skills
          .map((skill) => String(skill).trim())
          .filter(Boolean);
      } else {
        user.skills = String(skills)
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean);
      }
    }

    // ========================================================
    // BIO
    // ========================================================

    if (bio !== undefined) {
      user.bio = String(bio);
    }

    // ========================================================
    // JOB PREFERENCES
    // ========================================================

    if (preferredJobRole !== undefined) {
      user.preferredJobRole = String(preferredJobRole).trim();
    }

    if (preferredLocation !== undefined) {
      user.preferredLocation = String(preferredLocation).trim();
    }

    if (employmentType !== undefined) {
      user.employmentType = String(employmentType).trim();
    }

    if (salaryExpectation !== undefined) {
      user.salaryExpectation = String(salaryExpectation).trim();
    }

    // ========================================================
    // SOCIAL LINKS
    // ========================================================

    if (linkedin !== undefined) {
      user.linkedin = String(linkedin).trim();
    }

    if (github !== undefined) {
      user.github = String(github).trim();
    }

    if (portfolio !== undefined) {
      user.portfolio = String(portfolio).trim();
    }

    // ========================================================
    // RESUME URL
    // ========================================================

    if (resume !== undefined) {
      const resumeUrl = String(resume).trim();

      if (
        resumeUrl &&
        user.resume?.deleteUrl &&
        resumeUrl !== (user.resume.url || user.resume.displayUrl || "")
      ) {
        try {
          await deleteFromImgBB(user.resume.deleteUrl);
        } catch (error) {
          console.error("Old resume delete error:", error.message);
        }
      }

      if (resumeUrl) {
        user.resume = {
          url: resumeUrl,
          displayUrl: resumeUrl,
          deleteUrl: "",
          filename: "",
          size: 0,
        };
      } else {
        user.resume = {};
      }
    }

    // ========================================================
    // GOVERNMENT DOCUMENT INFO
    // ========================================================

    if (governmentDocumentType !== undefined) {
      user.governmentDocumentType = String(governmentDocumentType).trim();
    }

    if (governmentDocumentName !== undefined) {
      user.governmentDocumentName = String(governmentDocumentName).trim();
    }

    // ========================================================
    // FILES
    // ========================================================

    const profilePhotoFile = req.files?.profilePhoto?.[0];
    const governmentDocumentFile = req.files?.governmentDocument?.[0];

    // ========================================================
    // PROFILE PHOTO
    // ========================================================

    if (profilePhotoFile) {
      // Delete old profile photo if exists
      if (user.profilePhoto && user.profilePhoto.deleteUrl) {
        try {
          await deleteFromImgBB(user.profilePhoto.deleteUrl);
        } catch (error) {
          console.error("Old profile photo delete error:", error.message);
        }
      }

      try {
        const uploadResult = await uploadToImgBB(
          profilePhotoFile.buffer,
          profilePhotoFile.originalname,
          profilePhotoFile.mimetype,
        );

        const imgData = uploadResult.data; // 👈 ADD THIS

        user.profilePhoto = {
          url: imgData.url,
          displayUrl: imgData.displayUrl,
          deleteUrl: imgData.deleteUrl,
          filename: imgData.filename,
          size: imgData.size,
          thumb: imgData.thumb?.url || "", // 👈 thumb ab object hai
          medium: imgData.medium?.url || "",
          imgbbId: imgData.id || "",
        };
      } catch (uploadError) {
        console.error("Profile photo upload error:", uploadError);
        return res.status(500).json({
          success: false,
          message: "Failed to upload profile photo: " + uploadError.message,
        });
      }
    } // ← THIS BRACE WAS MISSING!

    // ========================================================
    // GOVERNMENT DOCUMENT
    // ========================================================

    if (governmentDocumentFile) {
      if (!user.governmentDocumentType) {
        return res.status(400).json({
          success: false,
          message: "Government document type is required",
        });
      }

      // Delete old government document if exists
      if (user.governmentDocument && user.governmentDocument.deleteUrl) {
        try {
          await deleteFromImgBB(user.governmentDocument.deleteUrl);
        } catch (error) {
          console.error("Old government document delete error:", error.message);
        }
      }

      try {
        const uploadResult = await uploadToImgBB(
          governmentDocumentFile.buffer,
          governmentDocumentFile.originalname,
          governmentDocumentFile.mimetype,
        );

        user.governmentDocument = {
          url: uploadResult.url,
          displayUrl: uploadResult.displayUrl,
          deleteUrl: uploadResult.deleteUrl,
          filename: uploadResult.filename,
          size: uploadResult.size,
          fileType: governmentDocumentFile.mimetype,
          thumb: uploadResult.thumb || "",
          medium: uploadResult.medium || "",
          imgbbId: uploadResult.id || "",
        };

        user.governmentDocumentName = governmentDocumentFile.originalname;
      } catch (uploadError) {
        console.error("Government document upload error:", uploadError);
        return res.status(500).json({
          success: false,
          message:
            "Failed to upload government document: " + uploadError.message,
        });
      }
    } // ← THIS BRACE WAS ALSO MISSING / MISPLACED!

    // ========================================================
    // SAVE USER
    // ========================================================

    await user.save();

    // ========================================================
    // RESPONSE
    // ========================================================

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
        location: user.location || "",
        dateOfBirth: user.dateOfBirth || "",
        gender: user.gender || "",
        qualification: user.qualification || "",
        university: user.university || "",
        graduationYear: user.graduationYear || "",
        jobTitle: user.jobTitle || "",
        currentCompany: user.currentCompany || "",
        experience: user.experience || "",
        skills: user.skills || [],
        bio: user.bio || "",
        preferredJobRole: user.preferredJobRole || "",
        preferredLocation: user.preferredLocation || "",
        employmentType: user.employmentType || "",
        salaryExpectation: user.salaryExpectation || "",
        linkedin: user.linkedin || "",
        github: user.github || "",
        portfolio: user.portfolio || "",
        resume: user.resume?.url || user.resume?.displayUrl || "",
        profilePhoto:
          user.profilePhoto?.displayUrl || user.profilePhoto?.url || "",
        governmentDocumentType: user.governmentDocumentType || "",
        governmentDocument:
          user.governmentDocument?.url ||
          user.governmentDocument?.displayUrl ||
          "",
        governmentDocumentName: user.governmentDocumentName || "",
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}; // ← THIS CLOSING BRACE FOR THE FUNCTION WAS MISSING!

// ============================================================
// CHANGE PASSWORD
// ============================================================
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password and new password are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters",
      });
    }

    const user = await User.findById(req.user._id).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ====================================================
    // CHECK CURRENT PASSWORD
    // ====================================================
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // ====================================================
    // HASH NEW PASSWORD
    // ====================================================
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    // Generate new token
    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
      token,
    });
  } catch (error) {
    console.error("Change password error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================================
// LOGOUT
// ============================================================

exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

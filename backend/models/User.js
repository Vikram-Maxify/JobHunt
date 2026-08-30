const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        mobile: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
            select: false
        },

        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        },

        location: {
            type: String,
            default: ''
        },

        dateOfBirth: {
            type: String,
            default: ''
        },

        gender: {
            type: String,
            default: ''
        },

        qualification: {
            type: String,
            default: ''
        },

        university: {
            type: String,
            default: ''
        },

        graduationYear: {
            type: String,
            default: ''
        },

        jobTitle: {
            type: String,
            default: ''
        },

        currentCompany: {
            type: String,
            default: ''
        },

        experience: {
            type: String,
            default: ''
        },

        skills: {
            type: [String],
            default: []
        },

        bio: {
            type: String,
            default: ''
        },

        preferredJobRole: {
            type: String,
            default: ''
        },

        preferredLocation: {
            type: String,
            default: ''
        },

        employmentType: {
            type: String,
            default: ''
        },

        salaryExpectation: {
            type: String,
            default: ''
        },

        linkedin: {
            type: String,
            default: ''
        },

        github: {
            type: String,
            default: ''
        },

        portfolio: {
            type: String,
            default: ''
        },

        resume: {
            type: Object,
            default: {}
        },

        profilePhoto: {
            type: Object,
            default: {}
        },

        governmentDocumentType: {
            type: String,
            default: ''
        },

        governmentDocument: {
            type: Object,
            default: {}
        },

        governmentDocumentName: {
            type: String,
            default: ''
        },

        isActive: {
            type: Boolean,
            default: true
        },

        isVerified: {
            type: Boolean,
            default: false
        },

        lastLogin: {
            type: Date
        },

        resetPasswordToken: String,
        resetPasswordExpire: Date
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', UserSchema);
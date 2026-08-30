const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
    planName: {
        type: String,
        required: [true, 'Plan name is required'],
        unique: true,
        trim: true,
        maxlength: [50, 'Plan name cannot exceed 50 characters']
    },
    billingType: {
        type: String,
        enum: ['Monthly', 'Yearly', 'Quarterly', 'Lifetime'],
        default: 'Monthly',
        required: [true, 'Billing type is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be greater than 0']
    },
    features: {
        type: [String],
        required: [true, 'At least one feature is required'],
        validate: {
            validator: function (arr) {
                return arr && arr.length > 0 && arr.some(item => item.trim() !== '');
            },
            message: 'At least one feature is required'
        }
    },
    // Additional features
    maxJobs: {
        type: Number,
        default: 10,
        min: 0
    },
    maxApplications: {
        type: Number,
        default: 50,
        min: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isPopular: {
        type: Boolean,
        default: false
    },
    discountPercentage: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // For yearly plans - savings info
    savingsLabel: {
        type: String,
        trim: true
    },
    // Badge/ribbon text (e.g., "Best Value", "Popular")
    badge: {
        type: String,
        trim: true
    },
    // Color theme
    color: {
        type: String,
        default: '#3B82F6' // Blue
    }
}, {
    timestamps: true
});

// Indexes
SubscriptionSchema.index({ planName: 1 });
SubscriptionSchema.index({ billingType: 1 });
SubscriptionSchema.index({ isActive: 1 });

// Virtual for formatted price
SubscriptionSchema.virtual('formattedPrice').get(function () {
    return `₹${this.price.toLocaleString('en-IN')}`;
});

// Virtual for price per month (for yearly)
SubscriptionSchema.virtual('pricePerMonth').get(function () {
    if (this.billingType === 'Yearly') {
        return Math.round(this.price / 12);
    }
    return this.price;
});

// To include virtuals in JSON
SubscriptionSchema.set('toJSON', { virtuals: true });
SubscriptionSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Subscription', SubscriptionSchema);
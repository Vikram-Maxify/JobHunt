const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema(
  {
    planName: {
      type: String,
      required: [true, "Plan name is required"],
      unique: true,
      trim: true,
      maxlength: [50, "Plan name cannot exceed 50 characters"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be greater than 0"],
    },
    features: {
      type: [String],
      required: [true, "At least one feature is required"],
      validate: {
        validator: function (arr) {
          return (
            arr && arr.length > 0 && arr.some((item) => item.trim() !== "")
          );
        },
        message: "At least one feature is required",
      },
    },
    // Countries jaha ye plan applicable hai - admin manually add karega
    countries: {
      type: [String],
      required: [true, "At least one country is required"],
      validate: {
        validator: function (arr) {
          return arr && arr.length > 0;
        },
        message: "At least one country must be selected",
      },
    },
    // Waiting time in days (admin sets manually)
    waitingTime: {
      type: Number,
      required: [true, "Waiting time is required"],
      min: [0, "Waiting time cannot be negative"],
      default: 0,
    },
    // Additional features
    maxJobs: {
      type: Number,
      default: 10,
      min: 0,
    },
    maxApplications: {
      type: Number,
      default: 50,
      min: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isPopular: {
      type: Boolean,
      default: false,
    },
    discountPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // Badge/ribbon text (e.g., "Best Value", "Popular")
    badge: {
      type: String,
      trim: true,
    },
    // Color theme
    color: {
      type: String,
      default: "#3B82F6", // Blue
    },
  },
  {
    timestamps: true,
  },
);

// Indexes
SubscriptionSchema.index({ planName: 1 });
SubscriptionSchema.index({ isActive: 1 });
SubscriptionSchema.index({ countries: 1 });

// Virtual for formatted price
SubscriptionSchema.virtual("formattedPrice").get(function () {
  return `₹${this.price.toLocaleString("en-IN")}`;
});

SubscriptionSchema.set("toJSON", { virtuals: true });
SubscriptionSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Subscription", SubscriptionSchema);

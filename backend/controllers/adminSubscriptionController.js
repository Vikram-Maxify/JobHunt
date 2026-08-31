const Subscription = require("../models/Subscription");

// @desc    Get all plans (admin - includes inactive)
// @route   GET /api/admin/subscriptions
exports.getAllPlansAdmin = async (req, res) => {
  try {
    const { billingType, isActive } = req.query;

    const filter = {};
    if (billingType) filter.billingType = billingType;
    if (isActive !== undefined) filter.isActive = isActive === "true";

    const plans = await Subscription.find(filter).sort({ price: 1 });

    res.status(200).json({
      success: true,
      count: plans.length,
      data: plans,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch plans",
      error: error.message,
    });
  }
};

// @desc    Get single plan by id (admin)
// @route   GET /api/admin/subscriptions/:id
exports.getPlanByIdAdmin = async (req, res) => {
  try {
    const plan = await Subscription.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found",
      });
    }

    res.status(200).json({ success: true, data: plan });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch plan",
      error: error.message,
    });
  }
};

// @desc    Create new plan
// @route   POST /api/admin/subscriptions
exports.createPlan = async (req, res) => {
  try {
    const {
      planName,
      billingType,
      price,
      features,
      maxJobs,
      maxApplications,
      isActive,
      isPopular,
      discountPercentage,
      description,
      savingsLabel,
      badge,
      color,
    } = req.body;

    if (!planName || price === undefined || !features) {
      return res.status(400).json({
        success: false,
        message: "planName, price and features are required",
      });
    }

    const existing = await Subscription.findOne({ planName: planName.trim() });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "A plan with this name already exists",
      });
    }

    // agar naya plan popular mark ho raha hai, baaki plans se popular hata do
    if (isPopular) {
      await Subscription.updateMany({}, { $set: { isPopular: false } });
    }

    const plan = await Subscription.create({
      planName: planName.trim(),
      billingType,
      price,
      features: Array.isArray(features)
        ? features.filter((f) => f && f.trim() !== "")
        : features,
      maxJobs,
      maxApplications,
      isActive,
      isPopular: !!isPopular,
      discountPercentage,
      description,
      savingsLabel,
      badge,
      color,
      createdBy: req.user?._id, // 'protect' middleware se aata hai
    });

    res.status(201).json({
      success: true,
      message: "Plan created successfully",
      data: plan,
    });
  } catch (error) {
    // mongoose validation error ko clean message me convert
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create plan",
      error: error.message,
    });
  }
};

// @desc    Update plan
// @route   PUT /api/admin/subscriptions/:id
exports.updatePlan = async (req, res) => {
  try {
    const plan = await Subscription.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found",
      });
    }

    const {
      planName,
      billingType,
      price,
      features,
      maxJobs,
      maxApplications,
      isActive,
      isPopular,
      discountPercentage,
      description,
      savingsLabel,
      badge,
      color,
    } = req.body;

    if (planName && planName.trim() !== plan.planName) {
      const existing = await Subscription.findOne({
        planName: planName.trim(),
      });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: "A plan with this name already exists",
        });
      }
      plan.planName = planName.trim();
    }

    if (billingType !== undefined) plan.billingType = billingType;
    if (price !== undefined) plan.price = price;
    if (features !== undefined) {
      plan.features = Array.isArray(features)
        ? features.filter((f) => f && f.trim() !== "")
        : plan.features;
    }
    if (maxJobs !== undefined) plan.maxJobs = maxJobs;
    if (maxApplications !== undefined) plan.maxApplications = maxApplications;
    if (isActive !== undefined) plan.isActive = isActive;
    if (discountPercentage !== undefined)
      plan.discountPercentage = discountPercentage;
    if (description !== undefined) plan.description = description;
    if (savingsLabel !== undefined) plan.savingsLabel = savingsLabel;
    if (badge !== undefined) plan.badge = badge;
    if (color !== undefined) plan.color = color;

    if (isPopular !== undefined) {
      if (isPopular) {
        await Subscription.updateMany(
          { _id: { $ne: plan._id } },
          { $set: { isPopular: false } },
        );
      }
      plan.isPopular = isPopular;
    }

    await plan.save();

    res.status(200).json({
      success: true,
      message: "Plan updated successfully",
      data: plan,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update plan",
      error: error.message,
    });
  }
};

// @desc    Delete plan (hard delete)
// @route   DELETE /api/admin/subscriptions/:id
exports.deletePlan = async (req, res) => {
  try {
    const plan = await Subscription.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found",
      });
    }

    await plan.deleteOne();

    res.status(200).json({
      success: true,
      message: "Plan deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete plan",
      error: error.message,
    });
  }
};

// @desc    Toggle plan active/inactive (soft delete alternative)
// @route   PATCH /api/admin/subscriptions/:id/toggle-active
exports.togglePlanActive = async (req, res) => {
  try {
    const plan = await Subscription.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found",
      });
    }

    plan.isActive = !plan.isActive;
    await plan.save();

    res.status(200).json({
      success: true,
      message: `Plan ${plan.isActive ? "activated" : "deactivated"} successfully`,
      data: plan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to toggle plan status",
      error: error.message,
    });
  }
};

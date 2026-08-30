const Subscription = require('../models/Subscription');
const UserSubscription = require('../models/UserSubscription');

// ============ ADMIN CONTROLLERS ============

// @desc    Create subscription (Admin only)
// @route   POST /api/admin/subscriptions
exports.createSubscription = async (req, res) => {
    try {
        const {
            planName,
            billingType,
            price,
            features,
            maxJobs,
            maxApplications,
            isPopular,
            discountPercentage,
            description,
            savingsLabel,
            badge,
            color
        } = req.body;

        // Check if subscription already exists
        const existingSubscription = await Subscription.findOne({ planName });
        if (existingSubscription) {
            return res.status(400).json({
                success: false,
                message: 'Subscription with this plan name already exists'
            });
        }

        // Parse features from string if needed
        const parsedFeatures = typeof features === 'string'
            ? JSON.parse(features)
            : features;

        // Validate features
        if (!parsedFeatures || parsedFeatures.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'At least one feature is required'
            });
        }

        // Create subscription
        const subscription = await Subscription.create({
            planName,
            billingType: billingType || 'Monthly',
            price: parseFloat(price),
            features: parsedFeatures,
            maxJobs: maxJobs || 10,
            maxApplications: maxApplications || 50,
            isPopular: isPopular || false,
            discountPercentage: discountPercentage || 0,
            description: description || '',
            savingsLabel: savingsLabel || '',
            badge: badge || '',
            color: color || '#3B82F6',
            createdBy: req.user._id
        });

        res.status(201).json({
            success: true,
            message: 'Subscription created successfully',
            data: subscription
        });

    } catch (error) {
        console.error('Create subscription error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to create subscription'
        });
    }
};

// @desc    Get all subscriptions (Admin)
// @route   GET /api/admin/subscriptions
exports.getAllSubscriptionsAdmin = async (req, res) => {
    try {
        const { isActive, billingType } = req.query;

        const filter = {};
        if (isActive !== undefined) filter.isActive = isActive === 'true';
        if (billingType) filter.billingType = billingType;

        const subscriptions = await Subscription.find(filter)
            .populate('createdBy', 'name email')
            .sort({ price: 1, createdAt: -1 });

        res.status(200).json({
            success: true,
            count: subscriptions.length,
            data: subscriptions
        });

    } catch (error) {
        console.error('Get all subscriptions error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch subscriptions'
        });
    }
};

// @desc    Get single subscription (Admin)
// @route   GET /api/admin/subscriptions/:id
exports.getSubscriptionByIdAdmin = async (req, res) => {
    try {
        const subscription = await Subscription.findById(req.params.id)
            .populate('createdBy', 'name email');

        if (!subscription) {
            return res.status(404).json({
                success: false,
                message: 'Subscription not found'
            });
        }

        res.status(200).json({
            success: true,
            data: subscription
        });

    } catch (error) {
        console.error('Get subscription error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch subscription'
        });
    }
};

// @desc    Update subscription (Admin)
// @route   PUT /api/admin/subscriptions/:id
exports.updateSubscription = async (req, res) => {
    try {
        const subscription = await Subscription.findById(req.params.id);
        if (!subscription) {
            return res.status(404).json({
                success: false,
                message: 'Subscription not found'
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
            color
        } = req.body;

        // Check duplicate plan name
        if (planName && planName !== subscription.planName) {
            const existing = await Subscription.findOne({ planName });
            if (existing) {
                return res.status(400).json({
                    success: false,
                    message: 'Subscription with this plan name already exists'
                });
            }
        }

        // Parse features from string if needed
        const parsedFeatures = typeof features === 'string'
            ? JSON.parse(features)
            : features;

        // Update fields
        if (planName) subscription.planName = planName;
        if (billingType) subscription.billingType = billingType;
        if (price) subscription.price = parseFloat(price);
        if (parsedFeatures) subscription.features = parsedFeatures;
        if (maxJobs !== undefined) subscription.maxJobs = maxJobs;
        if (maxApplications !== undefined) subscription.maxApplications = maxApplications;
        if (isActive !== undefined) subscription.isActive = isActive;
        if (isPopular !== undefined) subscription.isPopular = isPopular;
        if (discountPercentage !== undefined) subscription.discountPercentage = discountPercentage;
        if (description !== undefined) subscription.description = description;
        if (savingsLabel !== undefined) subscription.savingsLabel = savingsLabel;
        if (badge !== undefined) subscription.badge = badge;
        if (color) subscription.color = color;

        await subscription.save();

        res.status(200).json({
            success: true,
            message: 'Subscription updated successfully',
            data: subscription
        });

    } catch (error) {
        console.error('Update subscription error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to update subscription'
        });
    }
};

// @desc    Delete subscription (Admin)
// @route   DELETE /api/admin/subscriptions/:id
exports.deleteSubscription = async (req, res) => {
    try {
        const subscription = await Subscription.findById(req.params.id);
        if (!subscription) {
            return res.status(404).json({
                success: false,
                message: 'Subscription not found'
            });
        }

        // Check if any user has this subscription
        const userSubscriptions = await UserSubscription.find({ subscription: subscription._id });
        if (userSubscriptions.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Cannot delete subscription. ${userSubscriptions.length} user(s) have this subscription.`
            });
        }

        await subscription.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Subscription deleted successfully'
        });

    } catch (error) {
        console.error('Delete subscription error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to delete subscription'
        });
    }
};

// @desc    Toggle subscription active status
// @route   PATCH /api/admin/subscriptions/:id/toggle
exports.toggleSubscriptionStatus = async (req, res) => {
    try {
        const subscription = await Subscription.findById(req.params.id);
        if (!subscription) {
            return res.status(404).json({
                success: false,
                message: 'Subscription not found'
            });
        }

        subscription.isActive = !subscription.isActive;
        await subscription.save();

        res.status(200).json({
            success: true,
            message: `Subscription ${subscription.isActive ? 'activated' : 'deactivated'} successfully`,
            data: subscription
        });

    } catch (error) {
        console.error('Toggle subscription status error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to toggle subscription status'
        });
    }
};

// ============ USER CONTROLLERS ============

// @desc    Get all active subscriptions (User)
// @route   GET /api/subscriptions
exports.getAllSubscriptionsUser = async (req, res) => {
    try {
        const { billingType } = req.query;

        const filter = { isActive: true };
        if (billingType) filter.billingType = billingType;

        const subscriptions = await Subscription.find(filter)
            .select('planName billingType price features maxJobs maxApplications isPopular discountPercentage description savingsLabel badge color createdAt')
            .sort({ price: 1 });

        res.status(200).json({
            success: true,
            count: subscriptions.length,
            data: subscriptions
        });

    } catch (error) {
        console.error('Get subscriptions user error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch subscriptions'
        });
    }
};

// @desc    Get single subscription (User)
// @route   GET /api/subscriptions/:id
exports.getSubscriptionByIdUser = async (req, res) => {
    try {
        const subscription = await Subscription.findOne({
            _id: req.params.id,
            isActive: true
        }).select('planName billingType price features maxJobs maxApplications isPopular discountPercentage description savingsLabel badge color createdAt');

        if (!subscription) {
            return res.status(404).json({
                success: false,
                message: 'Subscription not found'
            });
        }

        res.status(200).json({
            success: true,
            data: subscription
        });

    } catch (error) {
        console.error('Get subscription user error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch subscription'
        });
    }
};

// @desc    Get subscription by plan name (User)
// @route   GET /api/subscriptions/plan/:planName
exports.getSubscriptionByPlanName = async (req, res) => {
    try {
        const subscription = await Subscription.findOne({
            planName: { $regex: new RegExp(`^${req.params.planName}$`, 'i') },
            isActive: true
        }).select('planName billingType price features maxJobs maxApplications isPopular discountPercentage description savingsLabel badge color createdAt');

        if (!subscription) {
            return res.status(404).json({
                success: false,
                message: 'Subscription not found'
            });
        }

        res.status(200).json({
            success: true,
            data: subscription
        });

    } catch (error) {
        console.error('Get subscription by name error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch subscription'
        });
    }
};
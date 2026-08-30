const UserSubscription = require('../models/UserSubscription');
const Subscription = require('../models/Subscription');

// @desc    Buy subscription (User)
// @route   POST /api/subscriptions/buy
exports.buySubscription = async (req, res) => {
    try {
        const { subscriptionId, paymentMethod, paymentId, autoRenew } = req.body;

        // Validate subscription exists
        const subscription = await Subscription.findOne({
            _id: subscriptionId,
            isActive: true
        });

        if (!subscription) {
            return res.status(404).json({
                success: false,
                message: 'Subscription not found or inactive'
            });
        }

        // Check if user already has active subscription
        const existingSubscription = await UserSubscription.findOne({
            user: req.user._id,
            isActive: true
        });

        // Calculate end date
        const startDate = new Date();
        let endDate = new Date();

        if (subscription.billingType === 'Monthly') {
            endDate.setMonth(endDate.getMonth() + 1);
        } else if (subscription.billingType === 'Yearly') {
            endDate.setFullYear(endDate.getFullYear() + 1);
        } else if (subscription.billingType === 'Quarterly') {
            endDate.setMonth(endDate.getMonth() + 3);
        } else if (subscription.billingType === 'Lifetime') {
            endDate.setFullYear(endDate.getFullYear() + 100); // 100 years
        }

        // Create user subscription
        const userSubscription = await UserSubscription.create({
            user: req.user._id,
            subscription: subscription._id,
            subscriptionDetails: {
                planName: subscription.planName,
                billingType: subscription.billingType,
                price: subscription.price,
                features: subscription.features
            },
            paymentId: paymentId || `PAY-${Date.now()}`,
            paymentMethod: paymentMethod || 'razorpay',
            paymentStatus: 'completed',
            startDate: startDate,
            endDate: endDate,
            isActive: true,
            autoRenew: autoRenew || false
        });

        // If user had existing subscription, deactivate it
        if (existingSubscription) {
            existingSubscription.isActive = false;
            existingSubscription.cancelledAt = new Date();
            existingSubscription.cancellationReason = 'Upgraded/Replaced with new subscription';
            await existingSubscription.save();
        }

        res.status(201).json({
            success: true,
            message: 'Subscription purchased successfully',
            data: {
                subscription: userSubscription,
                planName: subscription.planName,
                validUntil: endDate
            }
        });

    } catch (error) {
        console.error('Buy subscription error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to purchase subscription'
        });
    }
};

// @desc    Get current user's subscription
// @route   GET /api/subscriptions/my-subscription
exports.getMySubscription = async (req, res) => {
    try {
        const subscription = await UserSubscription.findOne({
            user: req.user._id,
            isActive: true
        })
            .populate('subscription', 'planName billingType price features maxJobs maxApplications isPopular color')
            .sort({ createdAt: -1 });

        if (!subscription) {
            return res.status(404).json({
                success: false,
                message: 'No active subscription found'
            });
        }

        res.status(200).json({
            success: true,
            data: subscription
        });

    } catch (error) {
        console.error('Get my subscription error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch subscription'
        });
    }
};

// @desc    Get user's subscription history
// @route   GET /api/subscriptions/history
exports.getSubscriptionHistory = async (req, res) => {
    try {
        const subscriptions = await UserSubscription.find({
            user: req.user._id
        })
            .populate('subscription', 'planName billingType price color')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: subscriptions.length,
            data: subscriptions
        });

    } catch (error) {
        console.error('Get subscription history error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch subscription history'
        });
    }
};

// @desc    Cancel subscription
// @route   PATCH /api/subscriptions/cancel
exports.cancelSubscription = async (req, res) => {
    try {
        const { cancellationReason } = req.body;

        const subscription = await UserSubscription.findOne({
            user: req.user._id,
            isActive: true
        });

        if (!subscription) {
            return res.status(404).json({
                success: false,
                message: 'No active subscription found'
            });
        }

        subscription.isActive = false;
        subscription.cancelledAt = new Date();
        subscription.cancellationReason = cancellationReason || 'User requested cancellation';
        subscription.autoRenew = false;
        await subscription.save();

        res.status(200).json({
            success: true,
            message: 'Subscription cancelled successfully',
            data: subscription
        });

    } catch (error) {
        console.error('Cancel subscription error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to cancel subscription'
        });
    }
};

// @desc    Toggle auto-renew
// @route   PATCH /api/subscriptions/auto-renew
exports.toggleAutoRenew = async (req, res) => {
    try {
        const { autoRenew } = req.body;

        const subscription = await UserSubscription.findOne({
            user: req.user._id,
            isActive: true
        });

        if (!subscription) {
            return res.status(404).json({
                success: false,
                message: 'No active subscription found'
            });
        }

        subscription.autoRenew = autoRenew !== undefined ? autoRenew : !subscription.autoRenew;
        await subscription.save();

        res.status(200).json({
            success: true,
            message: `Auto-renew ${subscription.autoRenew ? 'enabled' : 'disabled'} successfully`,
            data: { autoRenew: subscription.autoRenew }
        });

    } catch (error) {
        console.error('Toggle auto-renew error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to toggle auto-renew'
        });
    }
};

// @desc    Check subscription status
// @route   GET /api/subscriptions/status
exports.checkSubscriptionStatus = async (req, res) => {
    try {
        const subscription = await UserSubscription.findOne({
            user: req.user._id,
            isActive: true
        })
            .populate('subscription', 'planName billingType price maxJobs maxApplications');

        if (!subscription) {
            return res.status(200).json({
                success: true,
                hasActiveSubscription: false,
                message: 'No active subscription'
            });
        }

        const isExpired = new Date() > subscription.endDate;

        if (isExpired) {
            subscription.isActive = false;
            await subscription.save();

            return res.status(200).json({
                success: true,
                hasActiveSubscription: false,
                message: 'Subscription has expired',
                data: {
                    expired: true,
                    endDate: subscription.endDate
                }
            });
        }

        res.status(200).json({
            success: true,
            hasActiveSubscription: true,
            data: {
                planName: subscription.subscriptionDetails?.planName || subscription.subscription?.planName,
                billingType: subscription.subscriptionDetails?.billingType || subscription.subscription?.billingType,
                startDate: subscription.startDate,
                endDate: subscription.endDate,
                daysRemaining: subscription.daysRemaining,
                maxJobs: subscription.subscription?.maxJobs || 10,
                maxApplications: subscription.subscription?.maxApplications || 50,
                jobsPosted: subscription.jobsPosted || 0,
                applicationsUsed: subscription.applicationsUsed || 0,
                autoRenew: subscription.autoRenew
            }
        });

    } catch (error) {
        console.error('Check subscription status error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to check subscription status'
        });
    }
};

// @desc    Admin: Get all user subscriptions
// @route   GET /api/admin/user-subscriptions
exports.getAllUserSubscriptionsAdmin = async (req, res) => {
    try {
        const { status, user } = req.query;

        const filter = {};
        if (status === 'active') filter.isActive = true;
        if (status === 'inactive') filter.isActive = false;
        if (user) filter.user = user;

        const subscriptions = await UserSubscription.find(filter)
            .populate('user', 'name email mobile')
            .populate('subscription', 'planName billingType price color')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: subscriptions.length,
            data: subscriptions
        });

    } catch (error) {
        console.error('Get all user subscriptions error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch user subscriptions'
        });
    }
};

// @desc    Admin: Get user subscription by ID
// @route   GET /api/admin/user-subscriptions/:id
exports.getUserSubscriptionByIdAdmin = async (req, res) => {
    try {
        const subscription = await UserSubscription.findById(req.params.id)
            .populate('user', 'name email mobile')
            .populate('subscription', 'planName billingType price color');

        if (!subscription) {
            return res.status(404).json({
                success: false,
                message: 'User subscription not found'
            });
        }

        res.status(200).json({
            success: true,
            data: subscription
        });

    } catch (error) {
        console.error('Get user subscription error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch user subscription'
        });
    }
};
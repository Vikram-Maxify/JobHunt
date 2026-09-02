const express = require('express');
const router = express.Router();
const {
  getAllSubscriptionsUser,
  getSubscriptionByIdUser,
  getSubscriptionByPlanName
} = require('../controllers/subscriptionController');
const {
  buySubscription,
  getMySubscription,
  getSubscriptionHistory,
  cancelSubscription,
  toggleAutoRenew,
  checkSubscriptionStatus
} = require('../controllers/userSubscriptionController');
const { protect } = require('../middleware/auth');

// Public routes (get subscriptions)
router.get('/', getAllSubscriptionsUser);
router.get('/plan/:planName', getSubscriptionByPlanName);
router.get('/:id', getSubscriptionByIdUser);

// Protected user routes
router.use(protect);
router.post('/buy', buySubscription);
router.get('/my-subscription', getMySubscription);
router.get('/history', getSubscriptionHistory);
router.get('/status', checkSubscriptionStatus);
router.patch('/cancel', cancelSubscription);
router.patch('/auto-renew', toggleAutoRenew);

module.exports = router;
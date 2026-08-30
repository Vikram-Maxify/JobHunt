const express = require('express');
const router = express.Router();
const {
    getAllJobsUser,
    getJobByIdUser,
    getJobsByCategory,
    getFeaturedJobs,
    getUrgentJobs,
    searchJobs,
    getJobStats
} = require('../controllers/jobController');

// Public user routes
router.get('/', getAllJobsUser);
router.get('/search', searchJobs);
router.get('/featured', getFeaturedJobs);
router.get('/urgent', getUrgentJobs);
router.get('/stats', getJobStats);
router.get('/category/:slug', getJobsByCategory);
router.get('/:id', getJobByIdUser);

module.exports = router;
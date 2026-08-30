const Job = require('../models/Job');
const Category = require('../models/Category');
const { uploadToImgBB, deleteFromImgBB } = require('../utils/imgbb');

// ============ ADMIN CONTROLLERS ============

// @desc    Create job (Admin only)
// @route   POST /api/admin/jobs
exports.createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      categoryId,
      location,
      jobType,
      experience,
      salary,
      description,
      responsibilities,
      requirements,
      skills,
      status,
      companyWebsite,
      companyEmail,
      applicationDeadline,
      isFeatured,
      isUrgent,
      tags
    } = req.body;

    // Validate category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category selected'
      });
    }

    // Parse arrays from string if needed (for frontend compatibility)
    const parsedResponsibilities = typeof responsibilities === 'string' 
      ? JSON.parse(responsibilities) 
      : responsibilities;
    const parsedRequirements = typeof requirements === 'string' 
      ? JSON.parse(requirements) 
      : requirements;
    const parsedSkills = typeof skills === 'string' 
      ? JSON.parse(skills) 
      : skills;
    const parsedTags = typeof tags === 'string' 
      ? JSON.parse(tags) 
      : tags;

    // Validate arrays
    if (!parsedResponsibilities || parsedResponsibilities.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one responsibility is required'
      });
    }

    if (!parsedRequirements || parsedRequirements.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one requirement is required'
      });
    }

    if (!parsedSkills || parsedSkills.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one skill is required'
      });
    }

    // Upload company logo if provided
    let companyLogo = null;
    if (req.file) {
      const uploadResult = await uploadToImgBB(
        req.file.buffer,
        req.file.originalname,
        { name: `company-logo-${company}` }
      );
      companyLogo = uploadResult.data;
    }

    // Create job
    const job = await Job.create({
      title,
      company,
      categoryId,
      categoryName: category.name,
      location,
      jobType: jobType || 'Full Time',
      experience: experience || '0-3 Yrs',
      salary,
      description,
      responsibilities: parsedResponsibilities,
      requirements: parsedRequirements,
      skills: parsedSkills,
      status: status || 'active',
      postedBy: req.user._id,
      postedByName: req.user.name,
      companyLogo,
      companyWebsite,
      companyEmail,
      applicationDeadline: applicationDeadline || null,
      isFeatured: isFeatured || false,
      isUrgent: isUrgent || false,
      tags: parsedTags || []
    });

    // Increment job count in category
    category.jobCount = (category.jobCount || 0) + 1;
    await category.save();

    res.status(201).json({
      success: true,
      message: 'Job created successfully',
      data: job
    });

  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create job'
    });
  }
};

// @desc    Get all jobs (Admin)
// @route   GET /api/admin/jobs
exports.getAllJobsAdmin = async (req, res) => {
  try {
    const { status, category, search, sort } = req.query;

    // Build filter
    const filter = {};
    if (status) filter.status = status;
    if (category) filter.categoryId = category;

    // Search filter
    if (search) {
      filter.$text = { $search: search };
    }

    // Sort options
    let sortOption = { createdAt: -1 };
    if (sort === 'latest') sortOption = { createdAt: -1 };
    else if (sort === 'oldest') sortOption = { createdAt: 1 };
    else if (sort === 'applicants') sortOption = { applicantCount: -1 };
    else if (sort === 'views') sortOption = { views: -1 };

    const jobs = await Job.find(filter)
      .populate('categoryId', 'name slug')
      .populate('postedBy', 'name email')
      .sort(sortOption);

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs
    });

  } catch (error) {
    console.error('Get all jobs error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch jobs'
    });
  }
};

// @desc    Get single job (Admin)
// @route   GET /api/admin/jobs/:id
exports.getJobByIdAdmin = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('categoryId', 'name slug shortDescription image')
      .populate('postedBy', 'name email mobile');

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    res.status(200).json({
      success: true,
      data: job
    });

  } catch (error) {
    console.error('Get job error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch job'
    });
  }
};

// @desc    Update job (Admin)
// @route   PUT /api/admin/jobs/:id
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    const {
      title,
      company,
      categoryId,
      location,
      jobType,
      experience,
      salary,
      description,
      responsibilities,
      requirements,
      skills,
      status,
      companyWebsite,
      companyEmail,
      applicationDeadline,
      isFeatured,
      isUrgent,
      tags
    } = req.body;

    // Check if category is changing
    if (categoryId && categoryId !== job.categoryId.toString()) {
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(400).json({
          success: false,
          message: 'Invalid category selected'
        });
      }
      
      // Decrease old category count
      const oldCategory = await Category.findById(job.categoryId);
      if (oldCategory) {
        oldCategory.jobCount = Math.max(0, (oldCategory.jobCount || 0) - 1);
        await oldCategory.save();
      }
      
      // Increase new category count
      category.jobCount = (category.jobCount || 0) + 1;
      await category.save();
      
      job.categoryId = categoryId;
      job.categoryName = category.name;
    }

    // Parse arrays from string if needed
    const parsedResponsibilities = typeof responsibilities === 'string' 
      ? JSON.parse(responsibilities) 
      : responsibilities;
    const parsedRequirements = typeof requirements === 'string' 
      ? JSON.parse(requirements) 
      : requirements;
    const parsedSkills = typeof skills === 'string' 
      ? JSON.parse(skills) 
      : skills;
    const parsedTags = typeof tags === 'string' 
      ? JSON.parse(tags) 
      : tags;

    // Update fields
    if (title) job.title = title;
    if (company) job.company = company;
    if (location) job.location = location;
    if (jobType) job.jobType = jobType;
    if (experience) job.experience = experience;
    if (salary) job.salary = salary;
    if (description) job.description = description;
    if (parsedResponsibilities) job.responsibilities = parsedResponsibilities;
    if (parsedRequirements) job.requirements = parsedRequirements;
    if (parsedSkills) job.skills = parsedSkills;
    if (status) job.status = status;
    if (companyWebsite) job.companyWebsite = companyWebsite;
    if (companyEmail) job.companyEmail = companyEmail;
    if (applicationDeadline) job.applicationDeadline = applicationDeadline;
    if (isFeatured !== undefined) job.isFeatured = isFeatured;
    if (isUrgent !== undefined) job.isUrgent = isUrgent;
    if (parsedTags) job.tags = parsedTags;

    // Update company logo if provided
    if (req.file) {
      // Delete old logo
      if (job.companyLogo && job.companyLogo.deleteUrl) {
        await deleteFromImgBB(job.companyLogo.deleteUrl);
      }
      
      const uploadResult = await uploadToImgBB(
        req.file.buffer,
        req.file.originalname,
        { name: `company-logo-${company || job.company}` }
      );
      job.companyLogo = uploadResult.data;
    }

    await job.save();

    res.status(200).json({
      success: true,
      message: 'Job updated successfully',
      data: job
    });

  } catch (error) {
    console.error('Update job error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update job'
    });
  }
};

// @desc    Delete job (Admin)
// @route   DELETE /api/admin/jobs/:id
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    // Delete company logo from ImgBB
    if (job.companyLogo && job.companyLogo.deleteUrl) {
      await deleteFromImgBB(job.companyLogo.deleteUrl);
    }

    // Decrease job count in category
    const category = await Category.findById(job.categoryId);
    if (category) {
      category.jobCount = Math.max(0, (category.jobCount || 0) - 1);
      await category.save();
    }

    await job.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Job deleted successfully'
    });

  } catch (error) {
    console.error('Delete job error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete job'
    });
  }
};

// @desc    Toggle job status
// @route   PATCH /api/admin/jobs/:id/toggle-status
exports.toggleJobStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status || !['active', 'draft', 'closed', 'pending'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be: active, draft, closed, or pending'
      });
    }

    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    job.status = status;
    await job.save();

    res.status(200).json({
      success: true,
      message: `Job status updated to ${status}`,
      data: job
    });

  } catch (error) {
    console.error('Toggle job status error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update job status'
    });
  }
};

// @desc    Toggle featured job
// @route   PATCH /api/admin/jobs/:id/toggle-featured
exports.toggleFeatured = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    job.isFeatured = !job.isFeatured;
    await job.save();

    res.status(200).json({
      success: true,
      message: `Job ${job.isFeatured ? 'featured' : 'unfeatured'} successfully`,
      data: job
    });

  } catch (error) {
    console.error('Toggle featured error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to toggle featured status'
    });
  }
};

// @desc    Toggle urgent job
// @route   PATCH /api/admin/jobs/:id/toggle-urgent
exports.toggleUrgent = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    job.isUrgent = !job.isUrgent;
    await job.save();

    res.status(200).json({
      success: true,
      message: `Job ${job.isUrgent ? 'marked as urgent' : 'unmarked as urgent'} successfully`,
      data: job
    });

  } catch (error) {
    console.error('Toggle urgent error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to toggle urgent status'
    });
  }
};

// ============ USER CONTROLLERS ============

// @desc    Get all active jobs (User)
// @route   GET /api/jobs
exports.getAllJobsUser = async (req, res) => {
  try {
    const { category, jobType, experience, search, sort, page = 1, limit = 10 } = req.query;

    // Build filter
    const filter = { status: 'active' };
    
    if (category) filter.categoryId = category;
    if (jobType) filter.jobType = jobType;
    if (experience) filter.experience = experience;
    
    // Search filter
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { skills: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Sort options
    let sortOption = { createdAt: -1 };
    if (sort === 'latest') sortOption = { createdAt: -1 };
    else if (sort === 'oldest') sortOption = { createdAt: 1 };
    else if (sort === 'popular') sortOption = { views: -1 };
    else if (sort === 'urgent') sortOption = { isUrgent: -1, createdAt: -1 };

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const jobs = await Job.find(filter)
      .populate('categoryId', 'name slug')
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-postedBy -postedByName');

    const total = await Job.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: jobs.length,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      data: jobs
    });

  } catch (error) {
    console.error('Get all jobs user error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch jobs'
    });
  }
};

// @desc    Get single job (User)
// @route   GET /api/jobs/:id
exports.getJobByIdUser = async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id,
      status: 'active'
    }).populate('categoryId', 'name slug shortDescription image');

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    // Increment views
    job.views = (job.views || 0) + 1;
    await job.save();

    res.status(200).json({
      success: true,
      data: job
    });

  } catch (error) {
    console.error('Get job user error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch job'
    });
  }
};

// @desc    Get jobs by category slug (User)
// @route   GET /api/jobs/category/:slug
exports.getJobsByCategory = async (req, res) => {
  try {
    const { slug } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const category = await Category.findOne({ slug, isActive: true });
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const jobs = await Job.find({
      categoryId: category._id,
      status: 'active'
    })
      .populate('categoryId', 'name slug')
      .sort({ isUrgent: -1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Job.countDocuments({
      categoryId: category._id,
      status: 'active'
    });

    res.status(200).json({
      success: true,
      category: category.name,
      count: jobs.length,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      data: jobs
    });

  } catch (error) {
    console.error('Get jobs by category error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch jobs'
    });
  }
};

// @desc    Get featured jobs (User)
// @route   GET /api/jobs/featured
exports.getFeaturedJobs = async (req, res) => {
  try {
    const { limit = 6 } = req.query;

    const jobs = await Job.find({
      status: 'active',
      isFeatured: true
    })
      .populate('categoryId', 'name slug')
      .sort({ isUrgent: -1, createdAt: -1 })
      .limit(parseInt(limit))
      .select('-postedBy -postedByName');

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs
    });

  } catch (error) {
    console.error('Get featured jobs error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch featured jobs'
    });
  }
};

// @desc    Get urgent jobs (User)
// @route   GET /api/jobs/urgent
exports.getUrgentJobs = async (req, res) => {
  try {
    const { limit = 5 } = req.query;

    const jobs = await Job.find({
      status: 'active',
      isUrgent: true
    })
      .populate('categoryId', 'name slug')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .select('-postedBy -postedByName');

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs
    });

  } catch (error) {
    console.error('Get urgent jobs error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch urgent jobs'
    });
  }
};

// @desc    Search jobs (User)
// @route   GET /api/jobs/search
exports.searchJobs = async (req, res) => {
  try {
    const { q, page = 1, limit = 10 } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const filter = {
      status: 'active',
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { company: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { location: { $regex: q, $options: 'i' } },
        { skills: { $in: [new RegExp(q, 'i')] } }
      ]
    };

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const jobs = await Job.find(filter)
      .populate('categoryId', 'name slug')
      .sort({ isUrgent: -1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Job.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: jobs.length,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      query: q,
      data: jobs
    });

  } catch (error) {
    console.error('Search jobs error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to search jobs'
    });
  }
};

// @desc    Get job stats (User)
// @route   GET /api/jobs/stats
exports.getJobStats = async (req, res) => {
  try {
    const totalJobs = await Job.countDocuments({ status: 'active' });
    const featuredJobs = await Job.countDocuments({ status: 'active', isFeatured: true });
    const urgentJobs = await Job.countDocuments({ status: 'active', isUrgent: true });
    
    // Get jobs by category
    const categoryStats = await Job.aggregate([
      { $match: { status: 'active' } },
      { $group: { _id: '$categoryId', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'categories',
          localField: '_id',
          foreignField: '_id',
          as: 'category'
        }
      },
      { $unwind: '$category' },
      { $project: { categoryName: '$category.name', count: 1 } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalJobs,
        featuredJobs,
        urgentJobs,
        topCategories: categoryStats
      }
    });

  } catch (error) {
    console.error('Get job stats error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch job stats'
    });
  }
};
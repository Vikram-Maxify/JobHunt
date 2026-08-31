const Job = require("../models/Job");
const Category = require("../models/Category");
const {
  uploadToImgBB,
  deleteFromImgBB,
} = require("../utils/imgbb");

// ============================================================
// HELPERS
// ============================================================

const parseArray = (value, fieldName) => {
  if (value === undefined || value === null || value === "") {
    return [];
  }

  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);

      if (!Array.isArray(parsed)) {
        throw new Error(fieldName + " must be an array");
      }

      return parsed;
    } catch (error) {
      throw new Error(
        "Invalid " + fieldName + " format. Expected JSON array."
      );
    }
  }

  throw new Error(fieldName + " must be an array");
};

const parseBoolean = (value, defaultValue) => {
  if (value === undefined || value === null || value === "") {
    return defaultValue;
  }

  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    return value.toLowerCase() === "true";
  }

  return Boolean(value);
};

const isValidObjectId = (id) => {
  return /^[0-9a-fA-F]{24}$/.test(String(id));
};

// ============================================================
// ADMIN CONTROLLERS
// ============================================================

// @desc    Create job
// @route   POST /api/admin/jobs
exports.createJob = async (req, res) => {
  try {
    console.log("=================================");
    console.log("CREATE JOB");
    console.log("BODY:", req.body);
    console.log("FILE:", req.file ? req.file.originalname : "No file");
    console.log("=================================");

    const {
      title,
      company,

      // Frontend may send either category or categoryId
      category,
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
      tags,
    } = req.body;

    // --------------------------------------------------------
    // BASIC VALIDATION
    // --------------------------------------------------------

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Job title is required",
      });
    }

    if (!company) {
      return res.status(400).json({
        success: false,
        message: "Company is required",
      });
    }

    if (!location) {
      return res.status(400).json({
        success: false,
        message: "Location is required",
      });
    }

    // --------------------------------------------------------
    // CATEGORY
    // --------------------------------------------------------

    const selectedCategoryId = categoryId || category;

    console.log("Selected Category ID:", selectedCategoryId);

    if (!selectedCategoryId) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    if (!isValidObjectId(selectedCategoryId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }

    const categoryDoc = await Category.findById(selectedCategoryId);

    console.log("Category Found:", categoryDoc);

    if (!categoryDoc) {
      return res.status(400).json({
        success: false,
        message: "Invalid category selected",
      });
    }

    // --------------------------------------------------------
    // PARSE ARRAYS
    // --------------------------------------------------------

    const parsedResponsibilities = parseArray(
      responsibilities,
      "responsibilities"
    );

    const parsedRequirements = parseArray(
      requirements,
      "requirements"
    );

    const parsedSkills = parseArray(
      skills,
      "skills"
    );

    const parsedTags = parseArray(
      tags,
      "tags"
    );

    // --------------------------------------------------------
    // ARRAY VALIDATION
    // --------------------------------------------------------

    if (parsedResponsibilities.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one responsibility is required",
      });
    }

    if (parsedRequirements.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one requirement is required",
      });
    }

    if (parsedSkills.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one skill is required",
      });
    }

    // --------------------------------------------------------
    // UPLOAD COMPANY LOGO
    // --------------------------------------------------------

    let companyLogo = null;

    if (req.file) {
      try {
        const uploadResult = await uploadToImgBB(
          req.file.buffer,
          req.file.originalname,
          {
            name: "company-logo-" + company,
          }
        );

        companyLogo = uploadResult.data;
      } catch (uploadError) {
        console.error("Company logo upload error:", uploadError);

        return res.status(500).json({
          success: false,
          message: "Failed to upload company logo",
          error: uploadError.message,
        });
      }
    }

    // --------------------------------------------------------
    // CREATE JOB
    // --------------------------------------------------------

    const jobData = {
      title,
      company,

      categoryId: categoryDoc._id,
      categoryName: categoryDoc.name,

      location,

      jobType: jobType || "Full Time",
      experience: experience || "0-3 Yrs",

      salary,
      description,

      responsibilities: parsedResponsibilities,
      requirements: parsedRequirements,
      skills: parsedSkills,

      status: status || "active",

      postedBy: req.user ? req.user._id : undefined,
      postedByName: req.user ? req.user.name : undefined,

      companyLogo,

      companyWebsite: companyWebsite || "",
      companyEmail: companyEmail || "",

      applicationDeadline: applicationDeadline || null,

      isFeatured: parseBoolean(isFeatured, false),
      isUrgent: parseBoolean(isUrgent, false),

      tags: parsedTags,
    };

    console.log("JOB DATA:", jobData);

    const job = await Job.create(jobData);

    // --------------------------------------------------------
    // INCREMENT CATEGORY JOB COUNT
    // --------------------------------------------------------

    categoryDoc.jobCount =
      (categoryDoc.jobCount || 0) + 1;

    await categoryDoc.save();

    // --------------------------------------------------------
    // RESPONSE
    // --------------------------------------------------------

    return res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: job,
    });
  } catch (error) {
    console.error("Create job error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create job",
    });
  }
};

// ============================================================
// GET ALL JOBS ADMIN
// ============================================================

// @desc    Get all jobs (Admin)
// @route   GET /api/admin/jobs
exports.getAllJobsAdmin = async (req, res) => {
  try {
    const {
      status,
      category,
      categoryId,
      search,
      sort,
    } = req.query;

    const filter = {};

    // --------------------------------------------------------
    // STATUS
    // --------------------------------------------------------

    if (status) {
      filter.status = status;
    }

    // --------------------------------------------------------
    // CATEGORY
    // --------------------------------------------------------

    const selectedCategoryId = categoryId || category;

    if (selectedCategoryId) {
      if (!isValidObjectId(selectedCategoryId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid category ID",
        });
      }

      filter.categoryId = selectedCategoryId;
    }

    // --------------------------------------------------------
    // SEARCH
    // --------------------------------------------------------

    if (search) {
      filter.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          company: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
        {
          location: {
            $regex: search,
            $options: "i",
          },
        },
        {
          skills: {
            $in: [
              new RegExp(search, "i"),
            ],
          },
        },
      ];
    }

    // --------------------------------------------------------
    // SORT
    // --------------------------------------------------------

    let sortOption = {
      createdAt: -1,
    };

    if (sort === "latest") {
      sortOption = {
        createdAt: -1,
      };
    } else if (sort === "oldest") {
      sortOption = {
        createdAt: 1,
      };
    } else if (sort === "applicants") {
      sortOption = {
        applicantCount: -1,
      };
    } else if (sort === "views") {
      sortOption = {
        views: -1,
      };
    }

    // --------------------------------------------------------
    // GET JOBS
    // --------------------------------------------------------

    const jobs = await Job.find(filter)
      .populate(
        "categoryId",
        "name slug"
      )
      .populate(
        "postedBy",
        "name email"
      )
      .sort(sortOption);

    return res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    console.error("Get all jobs error:", error);

    return res.status(500).json({
      success: false,
      message:
        error.message || "Failed to fetch jobs",
    });
  }
};

// ============================================================
// GET SINGLE JOB ADMIN
// ============================================================

// @desc    Get single job (Admin)
// @route   GET /api/admin/jobs/:id
exports.getJobByIdAdmin = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID",
      });
    }

    const job = await Job.findById(req.params.id)
      .populate(
        "categoryId",
        "name slug shortDescription image"
      )
      .populate(
        "postedBy",
        "name email mobile"
      );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    console.error("Get job error:", error);

    return res.status(500).json({
      success: false,
      message:
        error.message || "Failed to fetch job",
    });
  }
};

// ============================================================
// UPDATE JOB ADMIN
// ============================================================

// @desc    Update job (Admin)
// @route   PUT /api/admin/jobs/:id
exports.updateJob = async (req, res) => {
  try {
    console.log("=================================");
    console.log("UPDATE JOB");
    console.log("JOB ID:", req.params.id);
    console.log("BODY:", req.body);
    console.log("FILE:", req.file ? req.file.originalname : "No file");
    console.log("=================================");

    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID",
      });
    }

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const {
      title,
      company,

      category,
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
      tags,
    } = req.body;

    // --------------------------------------------------------
    // CATEGORY UPDATE
    // --------------------------------------------------------

    const selectedCategoryId =
      category;

    if (selectedCategoryId) {
      if (!isValidObjectId(selectedCategoryId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid category ID",
        });
      }

      const oldCategoryId =
        job.categoryId
          ? job.categoryId.toString()
          : null;

      if (
        !oldCategoryId ||
        selectedCategoryId !== oldCategoryId
      ) {
        const newCategory =
          await Category.findById(
            selectedCategoryId
          );

        if (!newCategory) {
          return res.status(400).json({
            success: false,
            message: "Invalid category selected",
          });
        }

        // Decrease old category count
        if (job.categoryId) {
          const oldCategory =
            await Category.findById(
              job.categoryId
            );

          if (oldCategory) {
            oldCategory.jobCount =
              Math.max(
                0,
                (oldCategory.jobCount || 0) - 1
              );

            await oldCategory.save();
          }
        }

        // Increase new category count
        newCategory.jobCount =
          (newCategory.jobCount || 0) + 1;

        await newCategory.save();

        job.categoryId =
          newCategory._id;

        job.categoryName =
          newCategory.name;
      }
    }

    // --------------------------------------------------------
    // BASIC FIELDS
    // --------------------------------------------------------

    if (title !== undefined) {
      job.title = title;
    }

    if (company !== undefined) {
      job.company = company;
    }

    if (location !== undefined) {
      job.location = location;
    }

    if (jobType !== undefined) {
      job.jobType = jobType;
    }

    if (experience !== undefined) {
      job.experience = experience;
    }

    if (salary !== undefined) {
      job.salary = salary;
    }

    if (description !== undefined) {
      job.description = description;
    }

    if (status !== undefined) {
      job.status = status;
    }

    if (companyWebsite !== undefined) {
      job.companyWebsite =
        companyWebsite;
    }

    if (companyEmail !== undefined) {
      job.companyEmail =
        companyEmail;
    }

    if (applicationDeadline !== undefined) {
      job.applicationDeadline =
        applicationDeadline || null;
    }

    // --------------------------------------------------------
    // BOOLEAN FIELDS
    // --------------------------------------------------------

    if (isFeatured !== undefined) {
      job.isFeatured =
        parseBoolean(isFeatured, false);
    }

    if (isUrgent !== undefined) {
      job.isUrgent =
        parseBoolean(isUrgent, false);
    }

    // --------------------------------------------------------
    // RESPONSIBILITIES
    // --------------------------------------------------------

    if (responsibilities !== undefined) {
      const parsedResponsibilities =
        parseArray(
          responsibilities,
          "responsibilities"
        );

      if (
        parsedResponsibilities.length === 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "At least one responsibility is required",
        });
      }

      job.responsibilities =
        parsedResponsibilities;
    }

    // --------------------------------------------------------
    // REQUIREMENTS
    // --------------------------------------------------------

    if (requirements !== undefined) {
      const parsedRequirements =
        parseArray(
          requirements,
          "requirements"
        );

      if (
        parsedRequirements.length === 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "At least one requirement is required",
        });
      }

      job.requirements =
        parsedRequirements;
    }

    // --------------------------------------------------------
    // SKILLS
    // --------------------------------------------------------

    if (skills !== undefined) {
      const parsedSkills =
        parseArray(
          skills,
          "skills"
        );

      if (
        parsedSkills.length === 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "At least one skill is required",
        });
      }

      job.skills =
        parsedSkills;
    }

    // --------------------------------------------------------
    // TAGS
    // --------------------------------------------------------

    if (tags !== undefined) {
      job.tags =
        parseArray(tags, "tags");
    }

    // --------------------------------------------------------
    // COMPANY LOGO
    // --------------------------------------------------------

    if (req.file) {
      // Delete old logo
      if (
        job.companyLogo &&
        job.companyLogo.deleteUrl
      ) {
        try {
          await deleteFromImgBB(
            job.companyLogo.deleteUrl
          );
        } catch (deleteError) {
          console.error(
            "Old logo delete error:",
            deleteError
          );
        }
      }

      const uploadResult =
        await uploadToImgBB(
          req.file.buffer,
          req.file.originalname,
          {
            name:
              "company-logo-" +
              (company || job.company),
          }
        );

      job.companyLogo =
        uploadResult.data;
    }

    // --------------------------------------------------------
    // SAVE
    // --------------------------------------------------------

    await job.save();

    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: job,
    });
  } catch (error) {
    console.error("Update job error:", error);

    return res.status(500).json({
      success: false,
      message:
        error.message || "Failed to update job",
    });
  }
};

// ============================================================
// DELETE JOB
// ============================================================

// @desc    Delete job (Admin)
// @route   DELETE /api/admin/jobs/:id
exports.deleteJob = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID",
      });
    }

    const job = await Job.findById(
      req.params.id
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // --------------------------------------------------------
    // DELETE COMPANY LOGO
    // --------------------------------------------------------

    if (
      job.companyLogo &&
      job.companyLogo.deleteUrl
    ) {
      try {
        await deleteFromImgBB(
          job.companyLogo.deleteUrl
        );
      } catch (deleteError) {
        console.error(
          "Logo delete error:",
          deleteError
        );
      }
    }

    // --------------------------------------------------------
    // DECREASE CATEGORY COUNT
    // --------------------------------------------------------

    if (job.categoryId) {
      const category =
        await Category.findById(
          job.categoryId
        );

      if (category) {
        category.jobCount =
          Math.max(
            0,
            (category.jobCount || 0) - 1
          );

        await category.save();
      }
    }

    // --------------------------------------------------------
    // DELETE JOB
    // --------------------------------------------------------

    await job.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.error("Delete job error:", error);

    return res.status(500).json({
      success: false,
      message:
        error.message || "Failed to delete job",
    });
  }
};

// ============================================================
// TOGGLE JOB STATUS
// ============================================================

// @desc    Toggle job status
// @route   PATCH /api/admin/jobs/:id/toggle-status
exports.toggleJobStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "active",
      "draft",
      "closed",
      "pending",
    ];

    if (
      !status ||
      !allowedStatuses.includes(status)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid status. Must be: active, draft, closed, or pending",
      });
    }

    const job = await Job.findById(
      req.params.id
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    job.status = status;

    await job.save();

    return res.status(200).json({
      success: true,
      message:
        "Job status updated to " +
        status,
      data: job,
    });
  } catch (error) {
    console.error(
      "Toggle job status error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to update job status",
    });
  }
};

// ============================================================
// TOGGLE FEATURED
// ============================================================

// @desc    Toggle featured job
// @route   PATCH /api/admin/jobs/:id/toggle-featured
exports.toggleFeatured = async (req, res) => {
  try {
    const job = await Job.findById(
      req.params.id
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    job.isFeatured =
      !job.isFeatured;

    await job.save();

    return res.status(200).json({
      success: true,
      message:
        "Job " +
        (job.isFeatured
          ? "featured"
          : "unfeatured") +
        " successfully",
      data: job,
    });
  } catch (error) {
    console.error(
      "Toggle featured error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to toggle featured status",
    });
  }
};

// ============================================================
// TOGGLE URGENT
// ============================================================

// @desc    Toggle urgent job
// @route   PATCH /api/admin/jobs/:id/toggle-urgent
exports.toggleUrgent = async (req, res) => {
  try {
    const job = await Job.findById(
      req.params.id
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    job.isUrgent =
      !job.isUrgent;

    await job.save();

    return res.status(200).json({
      success: true,
      message:
        "Job " +
        (job.isUrgent
          ? "marked as urgent"
          : "unmarked as urgent") +
        " successfully",
      data: job,
    });
  } catch (error) {
    console.error(
      "Toggle urgent error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to toggle urgent status",
    });
  }
};

// ============================================================
// USER CONTROLLERS
// ============================================================

// @desc    Get all active jobs
// @route   GET /api/jobs
exports.getAllJobsUser = async (req, res) => {
  try {
    const {
      category,
      categoryId,
      jobType,
      experience,
      search,
      sort,
      page = 1,
      limit = 10,
    } = req.query;

    const filter = {
      status: "active",
    };

    // --------------------------------------------------------
    // CATEGORY
    // --------------------------------------------------------

    const selectedCategoryId =
      categoryId || category;

    if (selectedCategoryId) {
      if (!isValidObjectId(selectedCategoryId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid category ID",
        });
      }

      filter.categoryId =
        selectedCategoryId;
    }

    // --------------------------------------------------------
    // JOB TYPE
    // --------------------------------------------------------

    if (jobType) {
      filter.jobType = jobType;
    }

    // --------------------------------------------------------
    // EXPERIENCE
    // --------------------------------------------------------

    if (experience) {
      filter.experience = experience;
    }

    // --------------------------------------------------------
    // SEARCH
    // --------------------------------------------------------

    if (search) {
      filter.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          company: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
        {
          location: {
            $regex: search,
            $options: "i",
          },
        },
        {
          skills: {
            $in: [
              new RegExp(search, "i"),
            ],
          },
        },
      ];
    }

    // --------------------------------------------------------
    // SORT
    // --------------------------------------------------------

    let sortOption = {
      createdAt: -1,
    };

    if (sort === "latest") {
      sortOption = {
        createdAt: -1,
      };
    } else if (sort === "oldest") {
      sortOption = {
        createdAt: 1,
      };
    } else if (sort === "popular") {
      sortOption = {
        views: -1,
      };
    } else if (sort === "urgent") {
      sortOption = {
        isUrgent: -1,
        createdAt: -1,
      };
    }

    // --------------------------------------------------------
    // PAGINATION
    // --------------------------------------------------------

    const pageNumber = Math.max(
      1,
      parseInt(page) || 1
    );

    const limitNumber = Math.max(
      1,
      parseInt(limit) || 10
    );

    const skip =
      (pageNumber - 1) *
      limitNumber;

    // --------------------------------------------------------
    // GET JOBS
    // --------------------------------------------------------

    const jobs = await Job.find(filter)
      .populate(
        "categoryId",
        "name slug"
      )
      .sort(sortOption)
      .skip(skip)
      .limit(limitNumber)
      .select(
        "-postedBy -postedByName"
      );

    const total =
      await Job.countDocuments(
        filter
      );

    return res.status(200).json({
      success: true,
      count: jobs.length,
      total,
      page: pageNumber,
      totalPages: Math.ceil(
        total / limitNumber
      ),
      data: jobs,
    });
  } catch (error) {
    console.error(
      "Get all jobs user error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch jobs",
    });
  }
};

// ============================================================
// GET SINGLE JOB USER
// ============================================================

// @desc    Get single job
// @route   GET /api/jobs/:id
exports.getJobByIdUser = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID",
      });
    }

    const job = await Job.findOne({
      _id: req.params.id,
      status: "active",
    }).populate(
      "categoryId",
      "name slug shortDescription image"
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Increment views
    job.views =
      (job.views || 0) + 1;

    await job.save();

    return res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    console.error(
      "Get job user error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch job",
    });
  }
};

// ============================================================
// GET JOBS BY CATEGORY SLUG
// ============================================================

// @desc    Get jobs by category slug
// @route   GET /api/jobs/category/:slug
exports.getJobsByCategory = async (
  req,
  res
) => {
  try {
    const { slug } = req.params;

    const {
      page = 1,
      limit = 10,
    } = req.query;

    const category =
      await Category.findOne({
        slug,
        isActive: true,
      });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const pageNumber = Math.max(
      1,
      parseInt(page) || 1
    );

    const limitNumber = Math.max(
      1,
      parseInt(limit) || 10
    );

    const skip =
      (pageNumber - 1) *
      limitNumber;

    const jobs = await Job.find({
      categoryId: category._id,
      status: "active",
    })
      .populate(
        "categoryId",
        "name slug"
      )
      .sort({
        isUrgent: -1,
        createdAt: -1,
      })
      .skip(skip)
      .limit(limitNumber);

    const total =
      await Job.countDocuments({
        categoryId: category._id,
        status: "active",
      });

    return res.status(200).json({
      success: true,
      category: category.name,
      count: jobs.length,
      total,
      page: pageNumber,
      totalPages: Math.ceil(
        total / limitNumber
      ),
      data: jobs,
    });
  } catch (error) {
    console.error(
      "Get jobs by category error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch jobs",
    });
  }
};

// ============================================================
// FEATURED JOBS
// ============================================================

// @desc    Get featured jobs
// @route   GET /api/jobs/featured
exports.getFeaturedJobs = async (
  req,
  res
) => {
  try {
    const {
      limit = 6,
    } = req.query;

    const limitNumber = Math.max(
      1,
      parseInt(limit) || 6
    );

    const jobs = await Job.find({
      status: "active",
      isFeatured: true,
    })
      .populate(
        "categoryId",
        "name slug"
      )
      .sort({
        isUrgent: -1,
        createdAt: -1,
      })
      .limit(limitNumber)
      .select(
        "-postedBy -postedByName"
      );

    return res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    console.error(
      "Get featured jobs error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch featured jobs",
    });
  }
};

// ============================================================
// URGENT JOBS
// ============================================================

// @desc    Get urgent jobs
// @route   GET /api/jobs/urgent
exports.getUrgentJobs = async (
  req,
  res
) => {
  try {
    const {
      limit = 5,
    } = req.query;

    const limitNumber = Math.max(
      1,
      parseInt(limit) || 5
    );

    const jobs = await Job.find({
      status: "active",
      isUrgent: true,
    })
      .populate(
        "categoryId",
        "name slug"
      )
      .sort({
        createdAt: -1,
      })
      .limit(limitNumber)
      .select(
        "-postedBy -postedByName"
      );

    return res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    console.error(
      "Get urgent jobs error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch urgent jobs",
    });
  }
};

// ============================================================
// SEARCH JOBS
// ============================================================

// @desc    Search jobs
// @route   GET /api/jobs/search
exports.searchJobs = async (
  req,
  res
) => {
  try {
    const {
      q,
      page = 1,
      limit = 10,
    } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message:
          "Search query is required",
      });
    }

    const filter = {
      status: "active",

      $or: [
        {
          title: {
            $regex: q,
            $options: "i",
          },
        },
        {
          company: {
            $regex: q,
            $options: "i",
          },
        },
        {
          description: {
            $regex: q,
            $options: "i",
          },
        },
        {
          location: {
            $regex: q,
            $options: "i",
          },
        },
        {
          skills: {
            $in: [
              new RegExp(q, "i"),
            ],
          },
        },
      ],
    };

    const pageNumber = Math.max(
      1,
      parseInt(page) || 1
    );

    const limitNumber = Math.max(
      1,
      parseInt(limit) || 10
    );

    const skip =
      (pageNumber - 1) *
      limitNumber;

    const jobs = await Job.find(filter)
      .populate(
        "categoryId",
        "name slug"
      )
      .sort({
        isUrgent: -1,
        createdAt: -1,
      })
      .skip(skip)
      .limit(limitNumber);

    const total =
      await Job.countDocuments(
        filter
      );

    return res.status(200).json({
      success: true,
      count: jobs.length,
      total,
      page: pageNumber,
      totalPages: Math.ceil(
        total / limitNumber
      ),
      query: q,
      data: jobs,
    });
  } catch (error) {
    console.error(
      "Search jobs error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to search jobs",
    });
  }
};

// ============================================================
// JOB STATS
// ============================================================

// @desc    Get job stats
// @route   GET /api/jobs/stats
exports.getJobStats = async (
  req,
  res
) => {
  try {
    const totalJobs =
      await Job.countDocuments({
        status: "active",
      });

    const featuredJobs =
      await Job.countDocuments({
        status: "active",
        isFeatured: true,
      });

    const urgentJobs =
      await Job.countDocuments({
        status: "active",
        isUrgent: true,
      });

    // --------------------------------------------------------
    // JOBS BY CATEGORY
    // --------------------------------------------------------

    const categoryStats =
      await Job.aggregate([
        {
          $match: {
            status: "active",
          },
        },

        {
          $group: {
            _id: "$categoryId",
            count: {
              $sum: 1,
            },
          },
        },

        {
          $sort: {
            count: -1,
          },
        },

        {
          $limit: 5,
        },

        {
          $lookup: {
            from: "categories",
            localField: "_id",
            foreignField: "_id",
            as: "category",
          },
        },

        {
          $unwind: "$category",
        },

        {
          $project: {
            categoryName:
              "$category.name",
            count: 1,
          },
        },
      ]);

    return res.status(200).json({
      success: true,
      data: {
        totalJobs,
        featuredJobs,
        urgentJobs,
        topCategories:
          categoryStats,
      },
    });
  } catch (error) {
    console.error(
      "Get job stats error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch job stats",
    });
  }
};
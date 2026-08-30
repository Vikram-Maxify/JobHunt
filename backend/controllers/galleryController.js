const Gallery = require('../models/Gallery');
const { uploadToImgBB, deleteFromImgBB } = require('../utils/imgbb');

// ============ ADMIN CONTROLLERS ============

// @desc    Create gallery image (Admin only)
// @route   POST /api/admin/gallery
exports.createGalleryImage = async (req, res) => {
    try {
        const { heading, subHeading, category, isFeatured, altText, tags, sortOrder } = req.body;

        // Check if image is uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Image is required'
            });
        }

        // Upload image to ImgBB
        const uploadResult = await uploadToImgBB(
            req.file.buffer,
            req.file.originalname,
            { name: `gallery-${heading || 'image'}` }
        );

        // Parse tags from string if needed
        const parsedTags = typeof tags === 'string'
            ? JSON.parse(tags)
            : tags || [];

        // Create gallery image
        const galleryImage = await Gallery.create({
            image: uploadResult.data,
            heading,
            subHeading,
            category: category || 'Workplace',
            isFeatured: isFeatured || false,
            altText: altText || heading,
            tags: parsedTags,
            sortOrder: sortOrder || 0,
            createdBy: req.user._id
        });

        res.status(201).json({
            success: true,
            message: 'Gallery image added successfully',
            data: galleryImage
        });

    } catch (error) {
        console.error('Create gallery image error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to add gallery image'
        });
    }
};

// @desc    Get all gallery images (Admin)
// @route   GET /api/admin/gallery
exports.getAllGalleryAdmin = async (req, res) => {
    try {
        const { category, isActive, isFeatured, search } = req.query;

        const filter = {};
        if (category) filter.category = category;
        if (isActive !== undefined) filter.isActive = isActive === 'true';
        if (isFeatured !== undefined) filter.isFeatured = isFeatured === 'true';

        if (search) {
            filter.$or = [
                { heading: { $regex: search, $options: 'i' } },
                { subHeading: { $regex: search, $options: 'i' } },
                { category: { $regex: search, $options: 'i' } }
            ];
        }

        const galleryImages = await Gallery.find(filter)
            .populate('createdBy', 'name email')
            .sort({ sortOrder: 1, createdAt: -1 });

        res.status(200).json({
            success: true,
            count: galleryImages.length,
            data: galleryImages
        });

    } catch (error) {
        console.error('Get all gallery admin error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch gallery images'
        });
    }
};

// @desc    Get single gallery image (Admin)
// @route   GET /api/admin/gallery/:id
exports.getGalleryByIdAdmin = async (req, res) => {
    try {
        const galleryImage = await Gallery.findById(req.params.id)
            .populate('createdBy', 'name email');

        if (!galleryImage) {
            return res.status(404).json({
                success: false,
                message: 'Gallery image not found'
            });
        }

        res.status(200).json({
            success: true,
            data: galleryImage
        });

    } catch (error) {
        console.error('Get gallery by id admin error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch gallery image'
        });
    }
};

// @desc    Update gallery image (Admin)
// @route   PUT /api/admin/gallery/:id
exports.updateGalleryImage = async (req, res) => {
    try {
        const galleryImage = await Gallery.findById(req.params.id);
        if (!galleryImage) {
            return res.status(404).json({
                success: false,
                message: 'Gallery image not found'
            });
        }

        const { heading, subHeading, category, isActive, isFeatured, altText, tags, sortOrder } = req.body;

        // Update fields
        if (heading) galleryImage.heading = heading;
        if (subHeading) galleryImage.subHeading = subHeading;
        if (category) galleryImage.category = category;
        if (isActive !== undefined) galleryImage.isActive = isActive;
        if (isFeatured !== undefined) galleryImage.isFeatured = isFeatured;
        if (altText !== undefined) galleryImage.altText = altText;
        if (sortOrder !== undefined) galleryImage.sortOrder = sortOrder;

        // Parse tags from string if needed
        if (tags) {
            galleryImage.tags = typeof tags === 'string' ? JSON.parse(tags) : tags;
        }

        // Update image if new image uploaded
        if (req.file) {
            // Delete old image from ImgBB
            if (galleryImage.image && galleryImage.image.deleteUrl) {
                await deleteFromImgBB(galleryImage.image.deleteUrl);
            }

            // Upload new image
            const uploadResult = await uploadToImgBB(
                req.file.buffer,
                req.file.originalname,
                { name: `gallery-${heading || galleryImage.heading}` }
            );

            galleryImage.image = uploadResult.data;
        }

        await galleryImage.save();

        res.status(200).json({
            success: true,
            message: 'Gallery image updated successfully',
            data: galleryImage
        });

    } catch (error) {
        console.error('Update gallery image error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to update gallery image'
        });
    }
};

// @desc    Delete gallery image (Admin)
// @route   DELETE /api/admin/gallery/:id
exports.deleteGalleryImage = async (req, res) => {
    try {
        const galleryImage = await Gallery.findById(req.params.id);
        if (!galleryImage) {
            return res.status(404).json({
                success: false,
                message: 'Gallery image not found'
            });
        }

        // Delete image from ImgBB
        if (galleryImage.image && galleryImage.image.deleteUrl) {
            await deleteFromImgBB(galleryImage.image.deleteUrl);
        }

        await galleryImage.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Gallery image deleted successfully'
        });

    } catch (error) {
        console.error('Delete gallery image error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to delete gallery image'
        });
    }
};

// @desc    Toggle gallery image active status
// @route   PATCH /api/admin/gallery/:id/toggle
exports.toggleGalleryStatus = async (req, res) => {
    try {
        const galleryImage = await Gallery.findById(req.params.id);
        if (!galleryImage) {
            return res.status(404).json({
                success: false,
                message: 'Gallery image not found'
            });
        }

        galleryImage.isActive = !galleryImage.isActive;
        await galleryImage.save();

        res.status(200).json({
            success: true,
            message: `Gallery image ${galleryImage.isActive ? 'activated' : 'deactivated'} successfully`,
            data: galleryImage
        });

    } catch (error) {
        console.error('Toggle gallery status error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to toggle gallery status'
        });
    }
};

// @desc    Toggle gallery image featured status
// @route   PATCH /api/admin/gallery/:id/toggle-featured
exports.toggleGalleryFeatured = async (req, res) => {
    try {
        const galleryImage = await Gallery.findById(req.params.id);
        if (!galleryImage) {
            return res.status(404).json({
                success: false,
                message: 'Gallery image not found'
            });
        }

        galleryImage.isFeatured = !galleryImage.isFeatured;
        await galleryImage.save();

        res.status(200).json({
            success: true,
            message: `Gallery image ${galleryImage.isFeatured ? 'featured' : 'unfeatured'} successfully`,
            data: galleryImage
        });

    } catch (error) {
        console.error('Toggle gallery featured error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to toggle featured status'
        });
    }
};

// @desc    Bulk delete gallery images (Admin)
// @route   DELETE /api/admin/gallery/bulk
exports.bulkDeleteGallery = async (req, res) => {
    try {
        const { ids } = req.body;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Please provide an array of image IDs'
            });
        }

        // Get all gallery images
        const galleryImages = await Gallery.find({ _id: { $in: ids } });

        // Delete all images from ImgBB
        for (const image of galleryImages) {
            if (image.image && image.image.deleteUrl) {
                await deleteFromImgBB(image.image.deleteUrl);
            }
        }

        // Delete from database
        await Gallery.deleteMany({ _id: { $in: ids } });

        res.status(200).json({
            success: true,
            message: `${galleryImages.length} gallery image(s) deleted successfully`
        });

    } catch (error) {
        console.error('Bulk delete gallery error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to delete gallery images'
        });
    }
};

// @desc    Get gallery statistics (Admin)
// @route   GET /api/admin/gallery/stats
exports.getGalleryStats = async (req, res) => {
    try {
        const totalImages = await Gallery.countDocuments();
        const activeImages = await Gallery.countDocuments({ isActive: true });
        const featuredImages = await Gallery.countDocuments({ isFeatured: true });

        // Category wise count
        const categoryStats = await Gallery.aggregate([
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        res.status(200).json({
            success: true,
            data: {
                totalImages,
                activeImages,
                featuredImages,
                categoryStats
            }
        });

    } catch (error) {
        console.error('Get gallery stats error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch gallery statistics'
        });
    }
};

// ============ USER CONTROLLERS ============

// @desc    Get all active gallery images (User)
// @route   GET /api/gallery
exports.getAllGalleryUser = async (req, res) => {
    try {
        const { category, limit = 20, page = 1 } = req.query;

        const filter = { isActive: true };
        if (category) filter.category = category;

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const galleryImages = await Gallery.find(filter)
            .select('image heading subHeading category isFeatured createdAt altText tags')
            .sort({ isFeatured: -1, sortOrder: 1, createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Gallery.countDocuments(filter);

        // Format response for user
        const formattedData = galleryImages.map(item => ({
            id: item._id,
            image: item.image?.displayUrl || item.image?.url || null,
            heading: item.heading,
            subHeading: item.subHeading,
            category: item.category,
            isFeatured: item.isFeatured,
            createdAt: item.createdAt,
            altText: item.altText || item.heading,
            tags: item.tags || []
        }));

        res.status(200).json({
            success: true,
            count: galleryImages.length,
            total,
            page: parseInt(page),
            totalPages: Math.ceil(total / parseInt(limit)),
            data: formattedData
        });

    } catch (error) {
        console.error('Get all gallery user error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch gallery images'
        });
    }
};

// @desc    Get single gallery image (User)
// @route   GET /api/gallery/:id
exports.getGalleryByIdUser = async (req, res) => {
    try {
        const galleryImage = await Gallery.findOne({
            _id: req.params.id,
            isActive: true
        });

        if (!galleryImage) {
            return res.status(404).json({
                success: false,
                message: 'Gallery image not found'
            });
        }

        // Increment views
        galleryImage.views = (galleryImage.views || 0) + 1;
        await galleryImage.save();

        res.status(200).json({
            success: true,
            data: {
                id: galleryImage._id,
                image: galleryImage.image?.displayUrl || galleryImage.image?.url || null,
                heading: galleryImage.heading,
                subHeading: galleryImage.subHeading,
                category: galleryImage.category,
                isFeatured: galleryImage.isFeatured,
                createdAt: galleryImage.createdAt,
                altText: galleryImage.altText || galleryImage.heading,
                tags: galleryImage.tags || [],
                views: galleryImage.views
            }
        });

    } catch (error) {
        console.error('Get gallery by id user error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch gallery image'
        });
    }
};

// @desc    Get featured gallery images (User)
// @route   GET /api/gallery/featured
exports.getFeaturedGallery = async (req, res) => {
    try {
        const { limit = 6 } = req.query;

        const galleryImages = await Gallery.find({
            isActive: true,
            isFeatured: true
        })
            .select('image heading subHeading category createdAt altText')
            .sort({ sortOrder: 1, createdAt: -1 })
            .limit(parseInt(limit));

        const formattedData = galleryImages.map(item => ({
            id: item._id,
            image: item.image?.displayUrl || item.image?.url || null,
            heading: item.heading,
            subHeading: item.subHeading,
            category: item.category,
            createdAt: item.createdAt,
            altText: item.altText || item.heading
        }));

        res.status(200).json({
            success: true,
            count: galleryImages.length,
            data: formattedData
        });

    } catch (error) {
        console.error('Get featured gallery error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch featured gallery images'
        });
    }
};

// @desc    Get gallery by category (User)
// @route   GET /api/gallery/category/:category
exports.getGalleryByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const { limit = 20, page = 1 } = req.query;

        const filter = {
            isActive: true,
            category: category
        };

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const galleryImages = await Gallery.find(filter)
            .select('image heading subHeading category isFeatured createdAt altText')
            .sort({ isFeatured: -1, sortOrder: 1, createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Gallery.countDocuments(filter);

        const formattedData = galleryImages.map(item => ({
            id: item._id,
            image: item.image?.displayUrl || item.image?.url || null,
            heading: item.heading,
            subHeading: item.subHeading,
            category: item.category,
            isFeatured: item.isFeatured,
            createdAt: item.createdAt,
            altText: item.altText || item.heading
        }));

        res.status(200).json({
            success: true,
            count: galleryImages.length,
            total,
            page: parseInt(page),
            totalPages: Math.ceil(total / parseInt(limit)),
            category: category,
            data: formattedData
        });

    } catch (error) {
        console.error('Get gallery by category error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch gallery images by category'
        });
    }
};

// @desc    Search gallery images (User)
// @route   GET /api/gallery/search
exports.searchGallery = async (req, res) => {
    try {
        const { q, limit = 20, page = 1 } = req.query;

        if (!q) {
            return res.status(400).json({
                success: false,
                message: 'Search query is required'
            });
        }

        const filter = {
            isActive: true,
            $or: [
                { heading: { $regex: q, $options: 'i' } },
                { subHeading: { $regex: q, $options: 'i' } },
                { category: { $regex: q, $options: 'i' } },
                { tags: { $in: [new RegExp(q, 'i')] } }
            ]
        };

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const galleryImages = await Gallery.find(filter)
            .select('image heading subHeading category isFeatured createdAt altText')
            .sort({ isFeatured: -1, createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Gallery.countDocuments(filter);

        const formattedData = galleryImages.map(item => ({
            id: item._id,
            image: item.image?.displayUrl || item.image?.url || null,
            heading: item.heading,
            subHeading: item.subHeading,
            category: item.category,
            isFeatured: item.isFeatured,
            createdAt: item.createdAt,
            altText: item.altText || item.heading
        }));

        res.status(200).json({
            success: true,
            count: galleryImages.length,
            total,
            page: parseInt(page),
            totalPages: Math.ceil(total / parseInt(limit)),
            query: q,
            data: formattedData
        });

    } catch (error) {
        console.error('Search gallery error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to search gallery images'
        });
    }
};

// @desc    Get gallery categories with counts (User)
// @route   GET /api/gallery/categories
exports.getGalleryCategories = async (req, res) => {
    try {
        const categories = await Gallery.aggregate([
            { $match: { isActive: true } },
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 },
                    images: { $push: '$$ROOT' }
                }
            },
            {
                $project: {
                    category: '$_id',
                    count: 1,
                    thumbnail: { $arrayElemAt: ['$images.image.displayUrl', 0] }
                }
            },
            { $sort: { count: -1 } }
        ]);

        res.status(200).json({
            success: true,
            count: categories.length,
            data: categories.map(cat => ({
                name: cat.category,
                count: cat.count,
                thumbnail: cat.thumbnail || null
            }))
        });

    } catch (error) {
        console.error('Get gallery categories error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch gallery categories'
        });
    }
};
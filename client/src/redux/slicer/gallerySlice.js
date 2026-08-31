// src/redux/slicer/gallerySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// ============ ADMIN THUNKS ============

// @desc    Create gallery image (Admin)
export const createGalleryImage = createAsyncThunk(
    "gallery/createGalleryImage",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await api.post("/admin/gallery", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log("Create Gallery Response:", response.data); // Debug log
            return response.data;
        } catch (error) {
            console.error("Create Gallery Error:", error);
            return rejectWithValue(
                error.response?.data?.message || "Failed to create gallery image"
            );
        }
    }
);

// @desc    Get all gallery images (Admin)
export const getAllGalleryAdmin = createAsyncThunk(
    "gallery/getAllGalleryAdmin",
    async (params = {}, { rejectWithValue }) => {
        try {
            const response = await api.get("/admin/gallery", { params });
            console.log("Get All Gallery Response:", response.data); // Debug log
            return response.data;
        } catch (error) {
            console.error("Get All Gallery Error:", error);
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch gallery images"
            );
        }
    }
);

// @desc    Get single gallery image (Admin)
export const getGalleryByIdAdmin = createAsyncThunk(
    "gallery/getGalleryByIdAdmin",
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.get(`/admin/gallery/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch gallery image"
            );
        }
    }
);

// @desc    Update gallery image (Admin)
export const updateGalleryImage = createAsyncThunk(
    "gallery/updateGalleryImage",
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/admin/gallery/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to update gallery image"
            );
        }
    }
);

// @desc    Delete gallery image (Admin)
export const deleteGalleryImage = createAsyncThunk(
    "gallery/deleteGalleryImage",
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/admin/gallery/${id}`);
            return {
                ...response.data,
                id,
            };
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to delete gallery image"
            );
        }
    }
);

// @desc    Toggle gallery image active status
export const toggleGalleryStatus = createAsyncThunk(
    "gallery/toggleGalleryStatus",
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.patch(`/admin/gallery/${id}/toggle`);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to toggle gallery status"
            );
        }
    }
);

// @desc    Toggle gallery image featured status
export const toggleGalleryFeatured = createAsyncThunk(
    "gallery/toggleGalleryFeatured",
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.patch(`/admin/gallery/${id}/toggle-featured`);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to toggle featured status"
            );
        }
    }
);

// @desc    Bulk delete gallery images (Admin)
export const bulkDeleteGallery = createAsyncThunk(
    "gallery/bulkDeleteGallery",
    async (ids, { rejectWithValue }) => {
        try {
            const response = await api.delete("/admin/gallery/bulk", {
                data: { ids },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to delete gallery images"
            );
        }
    }
);

// @desc    Get gallery statistics (Admin)
export const getGalleryStats = createAsyncThunk(
    "gallery/getGalleryStats",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/admin/gallery/stats");
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch gallery statistics"
            );
        }
    }
);

// ============ SLICE ============

const initialState = {
    adminGallery: [],
    adminGalleryCount: 0,
    adminGalleryStats: null,
    currentGalleryImage: null,
    userGallery: [],
    userGalleryCount: 0,
    userGalleryTotal: 0,
    userGalleryTotalPages: 0,
    userGalleryPage: 1,
    featuredGallery: [],
    galleryCategories: [],
    loading: false,
    createLoading: false,
    updateLoading: false,
    deleteLoading: false,
    bulkDeleteLoading: false,
    error: null,
    createError: null,
    updateError: null,
    deleteError: null,
    successMessage: null,
};

const gallerySlice = createSlice({
    name: 'gallery',
    initialState,
    reducers: {
        clearGalleryMessages: (state) => {
            state.error = null;
            state.createError = null;
            state.updateError = null;
            state.deleteError = null;
            state.successMessage = null;
        },
        clearCurrentGalleryImage: (state) => {
            state.currentGalleryImage = null;
        },
        resetUserGallery: (state) => {
            state.userGallery = [];
            state.userGalleryCount = 0;
            state.userGalleryTotal = 0;
            state.userGalleryTotalPages = 0;
            state.userGalleryPage = 1;
        },
    },
    extraReducers: (builder) => {
        // ============ CREATE GALLERY IMAGE ============
        builder
            .addCase(createGalleryImage.pending, (state) => {
                state.createLoading = true;
                state.createError = null;
                state.successMessage = null;
            })
            .addCase(createGalleryImage.fulfilled, (state, action) => {
                state.createLoading = false;
                console.log("Create fulfilled - payload:", action.payload); // Debug log
                const newImage = action.payload?.data;
                if (newImage) {
                    // Add the new image to the beginning of the array
                    state.adminGallery = [newImage, ...state.adminGallery];
                    state.adminGalleryCount += 1;
                    console.log("Updated adminGallery:", state.adminGallery); // Debug log
                }
                state.successMessage = action.payload?.message || "Gallery image created successfully";
            })
            .addCase(createGalleryImage.rejected, (state, action) => {
                state.createLoading = false;
                state.createError = action.payload || "Failed to create gallery image";
            })

        // ============ GET ALL GALLERY ADMIN ============
        .addCase(getAllGalleryAdmin.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getAllGalleryAdmin.fulfilled, (state, action) => {
            state.loading = false;
            console.log("Get All fulfilled - payload:", action.payload); // Debug log
            // Make sure we're setting the data correctly
            state.adminGallery = action.payload?.data || [];
            state.adminGalleryCount = action.payload?.count || state.adminGallery.length;
            console.log("Updated adminGallery from getAll:", state.adminGallery); // Debug log
        })
        .addCase(getAllGalleryAdmin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Failed to fetch gallery images";
        })

        // ============ GET GALLERY BY ID ADMIN ============
        .addCase(getGalleryByIdAdmin.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getGalleryByIdAdmin.fulfilled, (state, action) => {
            state.loading = false;
            state.currentGalleryImage = action.payload?.data || null;
        })
        .addCase(getGalleryByIdAdmin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Failed to fetch gallery image";
        })

        // ============ UPDATE GALLERY IMAGE ============
        .addCase(updateGalleryImage.pending, (state) => {
            state.updateLoading = true;
            state.updateError = null;
            state.successMessage = null;
        })
        .addCase(updateGalleryImage.fulfilled, (state, action) => {
            state.updateLoading = false;
            const updatedImage = action.payload?.data;
            if (updatedImage) {
                const index = state.adminGallery.findIndex(
                    (img) => img._id === updatedImage._id || img.id === updatedImage.id
                );
                if (index !== -1) {
                    state.adminGallery[index] = updatedImage;
                }
                state.currentGalleryImage = updatedImage;
            }
            state.successMessage = action.payload?.message || "Gallery image updated successfully";
        })
        .addCase(updateGalleryImage.rejected, (state, action) => {
            state.updateLoading = false;
            state.updateError = action.payload || "Failed to update gallery image";
        })

        // ============ DELETE GALLERY IMAGE ============
        .addCase(deleteGalleryImage.pending, (state) => {
            state.deleteLoading = true;
            state.deleteError = null;
            state.successMessage = null;
        })
        .addCase(deleteGalleryImage.fulfilled, (state, action) => {
            state.deleteLoading = false;
            const deletedId = action.payload?.id;
            if (deletedId) {
                state.adminGallery = state.adminGallery.filter(
                    (img) => img._id !== deletedId && img.id !== deletedId
                );
                state.adminGalleryCount = Math.max(0, state.adminGalleryCount - 1);
                if (state.currentGalleryImage?._id === deletedId || state.currentGalleryImage?.id === deletedId) {
                    state.currentGalleryImage = null;
                }
            }
            state.successMessage = action.payload?.message || "Gallery image deleted successfully";
        })
        .addCase(deleteGalleryImage.rejected, (state, action) => {
            state.deleteLoading = false;
            state.deleteError = action.payload || "Failed to delete gallery image";
        })

        // ============ TOGGLE GALLERY STATUS ============
        .addCase(toggleGalleryStatus.fulfilled, (state, action) => {
            const updatedImage = action.payload?.data;
            if (updatedImage) {
                const index = state.adminGallery.findIndex(
                    (img) => img._id === updatedImage._id || img.id === updatedImage.id
                );
                if (index !== -1) {
                    state.adminGallery[index] = updatedImage;
                }
                if (state.currentGalleryImage?._id === updatedImage._id || 
                    state.currentGalleryImage?.id === updatedImage.id) {
                    state.currentGalleryImage = updatedImage;
                }
            }
            state.successMessage = action.payload?.message || "Gallery status toggled successfully";
        })
        .addCase(toggleGalleryStatus.rejected, (state, action) => {
            state.error = action.payload || "Failed to toggle gallery status";
        })

        // ============ TOGGLE GALLERY FEATURED ============
        .addCase(toggleGalleryFeatured.fulfilled, (state, action) => {
            const updatedImage = action.payload?.data;
            if (updatedImage) {
                const index = state.adminGallery.findIndex(
                    (img) => img._id === updatedImage._id || img.id === updatedImage.id
                );
                if (index !== -1) {
                    state.adminGallery[index] = updatedImage;
                }
                if (state.currentGalleryImage?._id === updatedImage._id || 
                    state.currentGalleryImage?.id === updatedImage.id) {
                    state.currentGalleryImage = updatedImage;
                }
            }
            state.successMessage = action.payload?.message || "Featured status toggled successfully";
        })
        .addCase(toggleGalleryFeatured.rejected, (state, action) => {
            state.error = action.payload || "Failed to toggle featured status";
        })

        // ============ BULK DELETE GALLERY ============
        .addCase(bulkDeleteGallery.pending, (state) => {
            state.bulkDeleteLoading = true;
            state.deleteError = null;
            state.successMessage = null;
        })
        .addCase(bulkDeleteGallery.fulfilled, (state, action) => {
            state.bulkDeleteLoading = false;
            state.successMessage = action.payload?.message || "Gallery images deleted successfully";
        })
        .addCase(bulkDeleteGallery.rejected, (state, action) => {
            state.bulkDeleteLoading = false;
            state.deleteError = action.payload || "Failed to delete gallery images";
        })

        // ============ GET GALLERY STATS ============
        .addCase(getGalleryStats.fulfilled, (state, action) => {
            state.adminGalleryStats = action.payload?.data || null;
        })
        .addCase(getGalleryStats.rejected, (state, action) => {
            state.error = action.payload || "Failed to fetch gallery statistics";
        });
    },
});

export const {
    clearGalleryMessages,
    clearCurrentGalleryImage,
    resetUserGallery,
} = gallerySlice.actions;

export default gallerySlice.reducer;
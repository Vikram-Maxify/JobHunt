import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

// ================================
// GET ALL CATEGORIES - ADMIN
// ================================
export const getAdminCategories = createAsyncThunk(
  "categories/getAdminCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/categories");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch categories"
      );
    }
  }
);

// ================================
// CREATE CATEGORY
// ================================
export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post("/admin/categories", formData, {
        headers: { "Content-Type": null },
      });
      return response.data;
    } catch (error) {
      console.error("Create category error:", error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data?.message || "Failed to create category"
      );
    }
  }
);

// ================================
// UPDATE CATEGORY
// ================================
export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/admin/categories/${id}`, formData, {
        headers: { "Content-Type": null },
      });
      return response.data;
    } catch (error) {
      console.error("Update category error:", error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data?.message || "Failed to update category"
      );
    }
  }
);

// ================================
// DELETE CATEGORY
// ================================
export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/admin/categories/${id}`);
      return { id, ...response.data };
    } catch (error) {
      console.error("Delete category error:", error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete category"
      );
    }
  }
);

// ================================
// TOGGLE CATEGORY STATUS
// ================================
export const toggleCategoryStatus = createAsyncThunk(
  "categories/toggleCategoryStatus",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/admin/categories/${id}/toggle`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update category status"
      );
    }
  }
);

// ================================
// INITIAL STATE
// ================================
const initialState = {
  categories: [],
  loading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
  toggleLoading: false,
  error: null,
  success: false,
  message: "",
};

// ================================
// SLICE
// ================================
const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    clearCategoryError: (state) => {
      state.error = null;
    },
    clearCategoryMessage: (state) => {
      state.message = "";
      state.success = false;
    },
    clearCategoryState: (state) => {
      state.error = null;
      state.message = "";
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(getAdminCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdminCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload?.data || [];
        state.error = null;
      })
      .addCase(getAdminCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch categories";
      })
      // CREATE
      .addCase(createCategory.pending, (state) => {
        state.createLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.createLoading = false;
        state.success = true;
        state.message = action.payload?.message || "Category created successfully";
        if (action.payload?.data) {
          state.categories.unshift(action.payload.data);
        }
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload || "Failed to create category";
        state.success = false;
      })
      // UPDATE
      .addCase(updateCategory.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.success = true;
        state.message = action.payload?.message || "Category updated successfully";
        const updatedCategory = action.payload?.data;
        if (updatedCategory) {
          const index = state.categories.findIndex(
            (cat) => cat._id === updatedCategory._id
          );
          if (index !== -1) {
            state.categories[index] = updatedCategory;
          }
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload || "Failed to update category";
        state.success = false;
      })
      // DELETE
      .addCase(deleteCategory.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.success = true;
        state.message = action.payload?.message || "Category deleted successfully";
        state.categories = state.categories.filter(
          (cat) => cat._id !== action.payload.id
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload || "Failed to delete category";
        state.success = false;
      })
      // TOGGLE
      .addCase(toggleCategoryStatus.pending, (state) => {
        state.toggleLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(toggleCategoryStatus.fulfilled, (state, action) => {
        state.toggleLoading = false;
        state.success = true;
        state.message = action.payload?.message || "Category status updated";
        const updatedCategory = action.payload?.data;
        if (updatedCategory) {
          const index = state.categories.findIndex(
            (cat) => cat._id === updatedCategory._id
          );
          if (index !== -1) {
            state.categories[index] = updatedCategory;
          }
        }
      })
      .addCase(toggleCategoryStatus.rejected, (state, action) => {
        state.toggleLoading = false;
        state.error = action.payload || "Failed to update category status";
        state.success = false;
      });
  },
});

export const {
  clearCategoryError,
  clearCategoryMessage,
  clearCategoryState,
} = categorySlice.actions;

export default categorySlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

// =========================================================
// REGISTER
// =========================================================

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/auth/register",
        userData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Registration failed"
      );
    }
  }
);

// =========================================================
// LOGIN
// =========================================================

export const loginUser = createAsyncThunk(
  "auth/login",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/auth/login",
        loginData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Login failed"
      );
    }
  }
);
// =========================================================
// GET PROFILE
// =========================================================

export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/auth/profile");

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to fetch profile"
      );
    }
  }
);

// =========================================================
// UPDATE PROFILE
// =========================================================

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.put(
        "/auth/profile",
        userData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to update profile"
      );
    }
  }
);

// =========================================================
// CHANGE PASSWORD
// =========================================================

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (passwordData, { rejectWithValue }) => {
    try {
      const response = await api.put(
        "/auth/change-password",
        passwordData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to change password"
      );
    }
  }
);

// =========================================================
// LOGOUT
// =========================================================

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/auth/logout"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Logout failed"
      );
    }
  }
);

// =========================================================
// INITIAL STATE
// =========================================================

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  authInitialized: false,
  loading: false,
  error: null,
  success: false,
  message: "",
};

// =========================================================
// SLICE
// =========================================================

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },

    clearAuthSuccess: (state) => {
      state.success = false;
      state.message = "";
    },

    setUser: (state, action) => {
      state.user = action.payload;
    },
    logoutLocal: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    // =====================================================
    // REGISTER
    // =====================================================

    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(
        registerUser.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;
          state.error = null;

          state.user = action.payload.data;

          state.token =
            action.payload.data?.token || null;

          state.isAuthenticated = true;
          state.authInitialized = true;

          state.message =
            action.payload.message ||
            "Registration successful";
        }
      )

      .addCase(
        registerUser.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;
          state.error =
            action.payload ||
            "Registration failed";
        }
      );

    // =====================================================
    // LOGIN
    // =====================================================

    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;

        state.user = action.payload.data || null;

        // Backend response ke according token yahan hai
        state.token = action.payload.token || null;

        state.isAuthenticated = true;
        state.authInitialized = true;

        state.message =
          action.payload.message || "Login successful";
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error =
          action.payload ||
          "Login failed";
      });
    // =====================================================
    // GET PROFILE
    // =====================================================

    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.user = action.payload.data;
        state.isAuthenticated = true;
        state.authInitialized = true;
      })

      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload || "Failed to fetch profile";

        state.user = null;
        state.isAuthenticated = false;
        state.authInitialized = true;
      })

    // =====================================================
    // UPDATE PROFILE
    // =====================================================

    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(
        updateProfile.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;
          state.error = null;

          // Backend se updated user Redux me set hoga
          state.user = action.payload.data;

          state.message =
            action.payload.message ||
            "Profile updated successfully";
        }
      )

      .addCase(
        updateProfile.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;
          state.error =
            action.payload ||
            "Failed to update profile";
        }
      );

    // =====================================================
    // CHANGE PASSWORD
    // =====================================================
    builder
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(
        changePassword.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;
          state.error = null;

          // Backend response se token aaye to Redux me rakho
          if (action.payload.token) {
            state.token = action.payload.token;
          }

          state.message =
            action.payload.message ||
            "Password changed successfully";
        }
      )

      .addCase(
        changePassword.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;
          state.error =
            action.payload ||
            "Failed to change password";
        }
      );

    // =====================================================
    // LOGOUT
    // =====================================================

    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        logoutUser.fulfilled,
        (state, action) => {
          state.loading = false;

          state.user = null;
          state.token = null;
          state.isAuthenticated = false;
          state.authInitialized = true;

          state.success = true;
          state.error = null;

          state.message =
            action.payload.message ||
            "Logged out successfully";
        }
      )

      .addCase(
        logoutUser.rejected,
        (state, action) => {
          state.loading = false;

          // Even if backend logout fails,
          // clear Redux authentication state
          state.user = null;
          state.token = null;
          state.isAuthenticated = false;

          state.success = false;
          state.error =
            action.payload ||
            "Logout failed";
        }
      );
  },
});

export const {
  clearAuthError,
  clearAuthSuccess,
  setUser,
  logoutLocal,
} = authSlice.actions;

export default authSlice.reducer;
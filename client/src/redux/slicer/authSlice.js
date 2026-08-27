import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

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

      const { data } = response.data;

      // Save token
      if (data?.token) {
        localStorage.setItem("token", data.token);
      }

      // Save user
      if (data) {
        localStorage.setItem(
          "user",
          JSON.stringify(data)
        );
      }

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

      const { data } = response.data;

      // Save token
      if (data?.token) {
        localStorage.setItem("token", data.token);
      }

      // Save user
      if (data) {
        localStorage.setItem(
          "user",
          JSON.stringify(data)
        );
      }

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
      const response = await api.get(
        "/auth/profile"
      );

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

      const { data } = response.data;

      // Update localStorage
      if (data) {
        localStorage.setItem(
          "user",
          JSON.stringify(data)
        );
      }

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

      const { token } = response.data;

      // Backend sends new token
      if (token) {
        localStorage.setItem("token", token);
      }

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

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      return response.data;
    } catch (error) {
      // Even if backend logout fails,
      // remove local auth data
      localStorage.removeItem("token");
      localStorage.removeItem("user");

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

const storedUser = localStorage.getItem("user");
const storedToken = localStorage.getItem("token");

const initialState = {
  user: storedUser
    ? JSON.parse(storedUser)
    : null,

  token: storedToken || null,

  isAuthenticated: !!storedToken,

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

      localStorage.setItem(
        "user",
        JSON.stringify(action.payload)
      );
    },

    logoutLocal: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = "";

      localStorage.removeItem("token");
      localStorage.removeItem("user");
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

      .addCase(
        loginUser.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;
          state.error = null;

          state.user = action.payload.data;
          state.token =
            action.payload.data?.token || null;

          state.isAuthenticated = true;

          state.message =
            action.payload.message ||
            "Login successful";
        }
      )

      .addCase(
        loginUser.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;
          state.error =
            action.payload ||
            "Login failed";
        }
      );

    // =====================================================
    // GET PROFILE
    // =====================================================

    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        getProfile.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          state.user = action.payload.data;

          state.isAuthenticated = true;

          localStorage.setItem(
            "user",
            JSON.stringify(
              action.payload.data
            )
          );
        }
      )

      .addCase(
        getProfile.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload ||
            "Failed to fetch profile";
        }
      );

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

          state.user = action.payload.data;

          state.message =
            action.payload.message ||
            "Profile updated successfully";

          localStorage.setItem(
            "user",
            JSON.stringify(
              action.payload.data
            )
          );
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

          if (action.payload.token) {
            state.token =
              action.payload.token;

            localStorage.setItem(
              "token",
              action.payload.token
            );
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

          state.success = true;
          state.error = null;

          state.message =
            action.payload.message ||
            "Logged out successfully";

          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      )

      .addCase(
        logoutUser.rejected,
        (state, action) => {
          state.loading = false;

          state.user = null;
          state.token = null;
          state.isAuthenticated = false;

          state.error =
            action.payload ||
            "Logout failed";

          localStorage.removeItem("token");
          localStorage.removeItem("user");
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
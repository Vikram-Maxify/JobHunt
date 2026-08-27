import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../redux/slicer/authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
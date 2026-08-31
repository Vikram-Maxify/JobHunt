import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slicer/authSlice";
import categoryReducer from "../redux/slicer/categorySlice";
import galleryReducer from "../redux/slicer/gallerySlice";
import jobsReducer from "../redux/slicer/jobSlice";
import testimonialReducer from "../redux/slicer/testimonialSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
    jobs: jobsReducer,
    gallery: galleryReducer,
    testimonials: testimonialReducer,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../redux/slicer/authSlice'
import categoryReducer from '../redux/slicer/categorySlice'
import jobsReducer from '../redux/slicer/jobSlice'
import galleryReducer from '../redux/slicer/gallerySlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
    jobs: jobsReducer,
    gallery: galleryReducer,
  },
});
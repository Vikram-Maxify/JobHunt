import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../redux/slicer/authSlice'
import categoryReducer from '../redux/slicer/categorySlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
  },
});
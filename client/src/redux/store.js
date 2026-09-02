import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../redux/slicer/authSlice'
import categoryReducer from '../redux/slicer/categorySlice'
import jobsReducer from '../redux/slicer/jobSlice'
import galleryReducer from '../redux/slicer/gallerySlice'
import subscriptionReducer from '../redux/slicer/adminsubscriptionSlice'
import testimonialReducer from '../redux/slicer/testimonialSlice'
import adminUserReducer from '../redux/slicer/adminuserSlice'
import testimonialsReducer from '../redux/slicer/userTestimonialSlice'
import userSubscriptionReducer from '../redux/slicer/UserSubscription'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
    jobs: jobsReducer,
    gallery: galleryReducer,
    subscription: subscriptionReducer,
    testimonials: testimonialReducer,
    adminUser: adminUserReducer,
    usertestimonial: testimonialsReducer,
    userSubscription: userSubscriptionReducer,
  }
});

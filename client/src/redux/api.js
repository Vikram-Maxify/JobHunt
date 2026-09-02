import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5069/api",
  // baseURL:"/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// =====================================================
// REQUEST INTERCEPTOR
// =====================================================

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// =====================================================
// RESPONSE INTERCEPTOR
// =====================================================

api.interceptors.request.use(
  (config) => {
    // FormData bhejte waqt Content-Type mat force karo — axios khud
    // multipart boundary set kar lega. Isse file upload kaam karega.
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;

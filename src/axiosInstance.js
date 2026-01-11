import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:8080",
  baseURL: "https://bizbridgetech.onrender.com",
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
}); 

// Interceptor to handle 401 errors (token expired)
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const res = await instance.post("/api/v1/auth/refresh");
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          originalRequest.headers["Authorization"] = `Bearer ${res.data.token}`;
          return instance(originalRequest);
        }
      } catch (err) {
        // Refresh failed → logout
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        window.location.href = "/login"; // force redirect to login
      }
    }

    return Promise.reject(error);
  }
);

export default instance;

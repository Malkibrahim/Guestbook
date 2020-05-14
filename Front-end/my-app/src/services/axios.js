import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    // Get token from local storage
    const token = localStorage.getItem("token");
    // Check if there is a token, put it in the Authorization header
    if (token) config.headers.Authorization = ` ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;

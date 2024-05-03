import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `add base url here`,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // take token form the local storage 
    const token = localStorage.getItem("Admintoken") || localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
import axios from "axios";
import { getCookie } from "cookies-next";

export const baseUrl =
  (process.env.NEXT_PUBLIC_API_URL as string) || "http://localhost:3000";

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers.platform = "web";
    config.headers.version = "1.0.0";

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

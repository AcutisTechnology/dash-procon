import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";

const api = axios.create({
  baseURL: "https://procon-back-production.up.railway.app",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${JSON.parse(token)}`;
    }
    return config;
  },
  (error) => {
    const { setToken } = useAuth();
    if (error.response.status === 403) {
      setToken(null);
    }
    return Promise.reject(error);
  }
);

export default api;

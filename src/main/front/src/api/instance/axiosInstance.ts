import { getAccessToken, getAuthActions } from "@/store/authStore";
import axios from "axios";

const api = axios.create({
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (e) => {
    return Promise.reject(e);
  },
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;

    if (error.response?.status === 401 && !config._retry) {
      config._retry = true;

      try {
        const response = await axios.post("/api/reissue", null, {
          withCredentials: true,
        });
        const newAccessToken = response.data;

        const { setToken } = getAuthActions();
        setToken(newAccessToken);

        config.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(config);
      } catch (e) {
        const { clearToken } = getAuthActions();
        clearToken();

        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }

        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  },
);

export default api;

import axios from "axios";

export const api = axios.create({
  baseURL: "https://conecta-api-l0kh.onrender.com",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 403 && !error.config._retry) {
      error.config._retry = true;
      try {
        const { data } = await api.post("/auth/refresh");
        error.config.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(error.config);
      } catch {
        console.warn("Refresh token expirado");
      }
    }
    return Promise.reject(error);
  }
);

api.interceptors.request.use((config) => {
  return config;
});

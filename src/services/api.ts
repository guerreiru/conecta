import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL || "https://conecta-api-l0kh.onrender.com",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await api.post("/auth/refresh");

        Cookies.set("accessToken", data.accessToken, {
          secure: true,
          sameSite: "Strict",
        });

        originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;

        return api(originalRequest);
      } catch (err) {
        console.error("Erro ao fazer refresh do token:", err);
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      const isTokenExpired = error.response?.data?.code === "TOKEN_EXPIRED";
      const isAuthEndpoint = originalRequest.url?.includes("/auth/");
      const isRefreshEndpoint = originalRequest.url?.includes("/auth/refresh");
      const isLoginEndpoint = originalRequest.url?.includes("/auth/login");

      if (isRefreshEndpoint || isLoginEndpoint) {
        // Não redireciona se já estiver na página de login/register
        if (
          typeof window !== "undefined" &&
          !window.location.pathname.startsWith("/login") &&
          !window.location.pathname.startsWith("/register")
        ) {
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }

      if (isTokenExpired || !isAuthEndpoint) {
        originalRequest._retry = true;

        try {
          await api.post("/auth/refresh");

          return api(originalRequest);
        } catch (refreshError) {
          // Não redireciona se já estiver na página de login/register
          if (
            typeof window !== "undefined" &&
            !window.location.pathname.startsWith("/login") &&
            !window.location.pathname.startsWith("/register")
          ) {
            window.location.href = "/login";
          }
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

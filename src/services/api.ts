import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

/**
 * Extensão da config do Axios para permitir _retry
 */
interface AxiosRequestConfigWithRetry extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

/**
 * Tipo para a resposta de erro da API
 */
interface ApiErrorResponse {
  code?: string;
  message?: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
// const BASE_URL = "http://localhost:3001";

const AUTH_ROUTES = {
  login: "/auth/login",
  refresh: "/auth/refresh",
  me: "/auth/me",
};

const PUBLIC_PATHS = ["/", "/service", "/provider", "/about", "/plans"];

const isClient = () => typeof window !== "undefined";

const isPublicPage = () =>
  isClient() &&
  PUBLIC_PATHS.some((path) => window.location.pathname.startsWith(path));

const redirectToLogin = () => {
  if (!isClient()) return;

  const { pathname } = window.location;

  if (!pathname.startsWith("/login") && !pathname.startsWith("/register")) {
    window.location.href = "/login";
  }
};

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorResponse>) => {
    const originalRequest = error.config as AxiosRequestConfigWithRetry;

    const status = error.response?.status;
    const errorCode = error.response?.data?.code;
    const requestUrl = originalRequest?.url ?? "";

    const isUnauthorized = status === 401;
    const isTokenExpired = errorCode === "TOKEN_EXPIRED";

    const isLoginEndpoint = requestUrl.includes(AUTH_ROUTES.login);
    const isRefreshEndpoint = requestUrl.includes(AUTH_ROUTES.refresh);
    const isMeEndpoint = requestUrl.includes(AUTH_ROUTES.me);
    const isAuthEndpoint = requestUrl.includes("/auth/");

    /**
     * 1️⃣ Se não for 401 ou já tentou retry, rejeita
     */
    if (!isUnauthorized || originalRequest?._retry) {
      return Promise.reject(error);
    }

    /**
     * 2️⃣ Página pública:
     * - permite falha no /auth/me
     * - não tenta refresh
     */
    if (isPublicPage()) {
      if (isMeEndpoint) {
        return Promise.reject(error);
      }

      return Promise.reject(error);
    }

    /**
     * 3️⃣ Se falhou no login ou refresh → redireciona
     */
    if (isLoginEndpoint || isRefreshEndpoint) {
      redirectToLogin();
      return Promise.reject(error);
    }

    /**
     * 4️⃣ Token expirado → tenta refresh
     */
    if (isTokenExpired || !isAuthEndpoint) {
      originalRequest._retry = true;

      try {
        await api.post(AUTH_ROUTES.refresh);
        return api(originalRequest);
      } catch (refreshError) {
        redirectToLogin();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

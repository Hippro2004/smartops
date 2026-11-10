import axios from "axios";
import { LoginInput, LoginResponse, RegisterInput } from "../../types/auth";
import { tokens } from "../auth/auth";
import { DashboardStats } from "../../types/assets/dashboard";
import { ProfileResponse } from "../../types/users/user";

let refreshing: Promise<string | null> | null = null;

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const isAuthPath = config.url?.startsWith("/auth/");
  const token = tokens.access();
  if (token && !isAuthPath) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config as typeof error.config & {
      _retried?: boolean;
    };
    const isAuthPath = original?.url?.startsWith("/auth/");

    if (error.response?.status !== 401 || isAuthPath || original._retried) {
      return Promise.reject(error);
    }
    original._retried = true;

    // หลาย request ที่ 401 พร้อมกันให้ขอ token ใหม่ครั้งเดียว
    refreshing ??= (async () => {
      const refreshToken = tokens.refresh();
      if (!refreshToken) return null;
      try {
        const { data } = await api.post<LoginResponse>("/auth/refresh", {
          refreshToken,
        });
        tokens.save(data);
        return data.accessToken;
      } catch {
        return null;
      }
    })().finally(() => {
      refreshing = null;
    });

    const newToken = await refreshing;
    if (!newToken) {
      tokens.clear();
      window.location.href = "/login";
      return Promise.reject(error);
    }

    original.headers.Authorization = `Bearer ${newToken}`;
    return api(original);
  },
);

export const authApi = {
  login: async (data: LoginInput) => {
    const res = await api.post("/auth/login", data);
    return res.data;
  },

  register: async (data: RegisterInput) => {
    await api.post("/users/register", data);
  },

  logout: async (refreshToken: string) => {
    await api.post("/auth/logout", { refreshToken });
  },
};

export const userApi = {
  me: async () => {
    const res = await api.get<ProfileResponse>("/users/me");
    return res.data;
  },
};

export const dashboardApi = {
  getStats: async () => {
    const res = await api.get<DashboardStats>("/assets/dashboard");
    return res.data;
  },
};

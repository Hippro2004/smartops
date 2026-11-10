import axios from "axios";
import { LoginInput, LoginResponse, RegisterInput } from "../../types/auth";
import { tokens } from "../auth/auth";
import { DashboardStats } from "../../types/assets/dashboard";
import { ProfileResponse } from "../../types/users/user";
import {
  AssetRequest,
  AssetResponse,
  PageResponse,
} from "@/src/types/assets/asset";
import { loadingStore } from "./loadingStore";

let refreshing: Promise<string | null> | null = null;

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  loadingStore.start();
  const isAuthPath = config.url?.startsWith("/auth/");
  const token = tokens.access();
  if (token && !isAuthPath) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => {
    loadingStore.end();
    return res;
  },
  async (error) => {
    loadingStore.end();
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

export const assetApi = {
  list: async () => {
    const res =
      await api.get<PageResponse<AssetResponse>>("/assets/all-assets");
    return res.data.content;
  },
  create: async (data: AssetRequest) => {
    const res = await api.post<AssetResponse>("/assets/create-asset", data);
    return res.data;
  },
  update: async (id: number, data: AssetRequest) => {
    const res = await api.put<AssetResponse>(`/assets/${id}`, data);
    return res.data;
  },
  remove: async (id: number) => {
    await api.delete(`/assets/${id}`);
  },
};

export const fileApi = {
  upload: async (file: File) => {
    const form = new FormData();
    form.append("file", file);
    const res = await api.post<{ filename: string }>("/files/upload", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.filename;
  },
};

import axios from "axios";
import { LoginInput, LoginResponse, RegisterInput } from "../types/auth";
import { ProfileResponse } from "../types/user";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: async (data: LoginInput) => {
    const res = await api.post<LoginResponse>("/auth/login", data);
    return res.data;
  },
  register: async (data: RegisterInput) => {
    await api.post("/users/register", data);
  },
};

export const userApi = {
  me: async () => {
    const res = await api.get<ProfileResponse>("/users/me");
    return res.data;
  },
};

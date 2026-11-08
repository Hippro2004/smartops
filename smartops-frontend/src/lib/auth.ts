// src/lib/auth.ts
const isBrowser = typeof window !== "undefined";

export const tokens = {
  access: () => (isBrowser ? localStorage.getItem("access_token") : null),
  refresh: () => (isBrowser ? localStorage.getItem("refresh_token") : null),
  save: (t: { accessToken: string; refreshToken: string }) => {
    if (!isBrowser) return;
    localStorage.setItem("access_token", t.accessToken);
    localStorage.setItem("refresh_token", t.refreshToken);
  },
  clear: () => {
    if (!isBrowser) return;
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  },
};

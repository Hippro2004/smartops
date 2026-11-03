// lib/auth.ts
export const tokens = {
  access: () => localStorage.getItem("access_token"),
  refresh: () => localStorage.getItem("refresh_token"),
  save: (t: { accessToken: string; refreshToken: string }) => {
    localStorage.setItem("access_token", t.accessToken);
    localStorage.setItem("refresh_token", t.refreshToken);
  },
  clear: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  },
};

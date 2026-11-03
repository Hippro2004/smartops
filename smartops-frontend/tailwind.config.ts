import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // 👈 ต้องมีโฟลเดอร์ app ตรงนี้
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;

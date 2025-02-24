import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/google-map/",
  build: {
    outDir: "dist", // 确保输出的目录是 dist
  },
  plugins: [react()],
  server: {
    headers: {
      content_security_policy: {
        extension_pages: "script-src 'self' 'unsafe-eval'; object-src 'self'",
      },
    },
  },
});

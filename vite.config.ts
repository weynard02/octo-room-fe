import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    allowedHosts: ["all"],
    proxy: {
      "/api": {
        target: "https://octo-booking-room-be-production-cf99.up.railway.app",
        changeOrigin: true,
        secure: false,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        configure: (proxy, _options) => {
          proxy.on("proxyRes", (proxyRes, _req, res) => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader(
              "Access-Control-Allow-Methods",
              "GET, POST, PUT, DELETE, PATCH, OPTIONS"
            );
            res.setHeader(
              "Access-Control-Allow-Headers",
              "Content-Type, Authorization"
            );
          });
        },
      },
    },
  },
});

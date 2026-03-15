import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "");

  const apiTarget = env.VITE_API_BASE_URL || "";

  return {
    plugins: [react(), tailwindcss()],
    server: {
      host: true,
      allowedHosts: ["all"],
      proxy: {
        // Proxy all requests starting with /api to the backend
        "/api": {
          target: apiTarget,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ""),
          // If apiTarget is not set, we should warn
          bypass: () => {
            if (!apiTarget) {
              console.warn("VITE_API_BASE_URL is not defined in .env! API requests will fail.");
              return;
            }
          }
        },
      },
    },
  };
});

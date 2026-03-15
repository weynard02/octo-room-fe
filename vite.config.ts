import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(() => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  // const env = loadEnv(mode, process.cwd(), "");

  // const apiTarget = env.VITE_API_BASE_URL || "http://localhost:3000/api";

  return {
    plugins: [react(), tailwindcss()],
    server: {
      host: true,
      allowedHosts: ["all"],
      proxy: {
        // Proxy all requests starting with /api to the backend
        // "/api": {
        //   target: apiTarget,
        //   changeOrigin: true,
        //   secure: false,
        //   rewrite: (path) => path.replace(/^\/api/, ""),
        // },
      },
    },
  };
});

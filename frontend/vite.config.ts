/// <reference types="vite/client" />
import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//       "@/components": path.resolve(__dirname, "./src/components"),
//       "@/assets": path.resolve(__dirname, "./src/assets"),
//       "@/pages": path.resolve(__dirname, "./src/pages"),
//       "@/state": path.resolve(__dirname, "./src/state"),
//       "@/static": path.resolve(__dirname, "./src/static"),
//       "@/types": path.resolve(__dirname, "./src/types"),
//       "@/utils": path.resolve(__dirname, "./src/utils"),
//     },
//   },
// });

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_APP_");
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@/components": path.resolve(__dirname, "./src/components"),
        "@/assets": path.resolve(__dirname, "./src/assets"),
        "@/pages": path.resolve(__dirname, "./src/pages"),
        "@/state": path.resolve(__dirname, "./src/state"),
        "@/static": path.resolve(__dirname, "./src/static"),
        "@/types": path.resolve(__dirname, "./src/types"),
        "@/utils": path.resolve(__dirname, "./src/utils"),
      },
    },
    define: {
      "process.env": env,
    },
  };
});

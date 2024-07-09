import type { UserConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";
import checker from "vite-plugin-checker";
import path from "path";

const config: UserConfig = {
  root: "src/",
  base: "/systems/dragons-den-2/",
  publicDir: path.resolve(__dirname, "public"),
  server: {
    port: 30001,
    open: true,
    proxy: {
      "^(?!/systems/dragons-den-2)": "http://localhost:30000/",
      "/socket.io": {
        target: "ws://localhost:30000",
        ws: true,
      },
    },
  },
  resolve: {
    alias: [
      {
        find: "./runtimeConfig",
        replacement: "./runtimeConfig.browser",
      },
    ],
  },
  optimizeDeps: {
    include: ["jszip"],
  },
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: false,
    sourcemap: true,
    lib: {
      name: "dragons-den-2",
      entry: path.resolve(__dirname, "src/dragons-den-2.ts"),
      formats: ["es"],
      fileName: "dragons-den-2",
    },
    rollupOptions:{
      output: {
        assetFileNames: ({ name }): string => (name === "style.css" ? "styles/dragons-den-2.css" : name ?? ""),
        chunkFileNames: "[name].mjs",
        entryFileNames: "dragons-den-2.mjs"
      }
    }
  },
  esbuild: {
    minifyIdentifiers: false,
    keepNames: true,
  },
  plugins: [
    checker({
      typescript: true,
    }),
    visualizer({
      gzipSize: true,
      template: "treemap",
    }),
  ],
  define: {
    "process.env": process.env,
  },
};

export default config;
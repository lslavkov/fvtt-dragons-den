import * as Vite from "vite";
import path from "node:path";
import checker from "vite-plugin-checker";
import { visualizer } from "rollup-plugin-visualizer";

const config: Vite.UserConfig = {
  root: "src/",
  publicDir: path.resolve(__dirname, "public"),
  base: "/systems/fvtt-dragons-den",
  server: {
    port: 30001,
    open: true,
    proxy: {
      "^(?!/systems/fvtt-dragons-den)": "http://localhost:30000/",
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
      name: "lancer",
      entry: path.resolve(__dirname, "src/dragons-den-2.ts"),
      formats: ["es"],
      fileName: "lancer",
    },
  },
  esbuild: {
    minifyIdentifiers: false,
    keepNames: true,
  },
  plugins: [
    checker({
      typescript: true,
      // svelte: { root: __dirname },
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
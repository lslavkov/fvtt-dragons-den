import * as Vite from "vite";
import path from "node:path";

const config: Vite.UserConfig = {
    root: "src/",
    publicDir: path.resolve(__dirname, "public"),
    base: "/systems/fvtt-dragons-den",
    server: {
        port: 30001,
        open: true,
        proxy: {
            "^(?!/systems/fvtt-dragons-den)": "http://localhost:30000/"

        }
    }
};

export default config;
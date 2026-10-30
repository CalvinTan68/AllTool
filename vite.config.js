import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { redact } from "@tanstack/redact/vite";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), redact()],
});

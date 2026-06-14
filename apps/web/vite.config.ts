import { reactRouter } from "@react-router/dev/vite"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"
import path from "node:path"

export default defineConfig({
  // Load .env from monorepo root so DATABASE_URL and other secrets are available in SSR
  envDir: path.resolve(__dirname, "../../"),
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
})

/// <reference types="vitest" />
import path from "node:path"
import { defineConfig } from "vite"

export default defineConfig(() => {
  return {
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./bot"),
      },
    },
    test: {
      setupFiles: ["dotenv/config"],
      /* for example, use global to avoid globals imports (describe, test, expect): */
      // globals: true,
    },
  }
})

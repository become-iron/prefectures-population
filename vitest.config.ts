import { fileURLToPath, URL } from "node:url"
import { mergeConfig, defineConfig, configDefaults } from "vitest/config"
import viteConfig from "./vite.config"

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      // coverage: {
      //   reporter: ["text", "json-summary", "json"],
      // },
      environment: "jsdom",
      exclude: [...configDefaults.exclude, "e2e/*"],
      root: fileURLToPath(new URL("./", import.meta.url)),
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  }),
)

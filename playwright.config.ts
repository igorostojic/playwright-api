import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "tests/api",
  outputDir: "./results",
  fullyParallel: true,
  retries: 1,
  reporter: "html",
  timeout: 30000,
  use: {
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});

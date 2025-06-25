// @ts-nocheck
import { defineConfig, devices } from '@playwright/experimental-ct-react';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './',
  testMatch: '**/*.spec.tsx',
  /* The base directory, relative to the config file, for snapshot files created with toMatchSnapshot and toHaveScreenshot. */
  snapshotDir: './__snapshots__',
  /* Maximum time one test can run for. */
  timeout: 10 * 1000,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'off',

    /* Port to use for Playwright component endpoint. */
    ctPort: 3100,
    // Reference the Vite config file path instead of passing plugins directly
    ctViteConfig: {
      plugins: [tsconfigPaths(), react()],
      test: {
        environment: 'jsdom',
        exclude: [
          '.next/**',
          '.wrangler/**',
          '**/.{idea,git,cache,output,temp}/**',
          '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
          '**/cypress/**',
          '**/dist/**',
          '**/node_modules/**',
          'e2e-tests/**',
          'out/**',
        ],
      },
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});

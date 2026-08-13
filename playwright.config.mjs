import {defineConfig,devices} from '@playwright/test';

export default defineConfig({
  testDir:'./tests',
  testMatch:'v10-e2e.spec.mjs',
  timeout:30_000,
  expect:{timeout:7_000},
  fullyParallel:false,
  workers:1,
  reporter:'line',
  use:{
    ...devices['Desktop Chrome'],
    baseURL:process.env.BASE_URL||'http://127.0.0.1:4177',
    trace:'retain-on-failure',
    screenshot:'only-on-failure'
  },
  projects:[{name:'chromium',use:{...devices['Desktop Chrome']}}]
});

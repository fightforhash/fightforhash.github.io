import path from 'path';
import { execSync } from 'node:child_process';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/** Build provenance shown in the footer — deploy-pipeline literacy
 *  reads better on a network portfolio than a CSS-framework credit. */
const commitSha = (() => {
  try {
    return execSync('git rev-parse --short HEAD', { stdio: ['ignore', 'pipe', 'ignore'] })
      .toString()
      .trim();
  } catch {
    return 'local';
  }
})();

const buildTime = new Date().toISOString().slice(0, 16).replace('T', ' ');

export default defineConfig(() => {
    return {
      build: {
        outDir: "docs",
      },
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        __COMMIT_SHA__: JSON.stringify(commitSha),
        __BUILD_TIME__: JSON.stringify(`${buildTime} UTC`),
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});

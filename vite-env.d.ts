/// <reference types="vite/client" />

/** Injected by vite.config.ts `define`. */
declare const __COMMIT_SHA__: string;
declare const __BUILD_TIME__: string;

declare module '*.md?raw' {
  const content: string;
  export default content;
}

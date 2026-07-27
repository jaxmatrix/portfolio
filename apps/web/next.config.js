//@ts-check

const path = require('node:path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the workspace root. Without this Turbopack walks up, finds an unrelated
  // lockfile in the home directory and picks the wrong root.
  turbopack: { root: path.join(__dirname, '..', '..') },

  // pnpm symlinks deps into the workspace root, so tracing must start there.
  outputFileTracingRoot: path.join(__dirname, '..', '..'),

  // Consume the workspace UI library from source so per-file "use client"
  // boundaries are preserved (a bundled dist would strip the directive).
  transpilePackages: ['@portfolio/ui'],

  // shiki ships large WASM/JSON grammar assets used only while highlighting at
  // build time — keep them out of the RSC bundle.
  serverExternalPackages: ['shiki'],
};

module.exports = nextConfig;

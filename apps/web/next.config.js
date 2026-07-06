//@ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Consume the workspace UI library from source so per-file "use client"
  // boundaries are preserved (a bundled dist would strip the directive).
  transpilePackages: ['@portfolio/ui'],
};

module.exports = nextConfig;

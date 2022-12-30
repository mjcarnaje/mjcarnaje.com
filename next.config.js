/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    reactRoot: true,
    runtime: "nodejs",
  },
};

module.exports = nextConfig;

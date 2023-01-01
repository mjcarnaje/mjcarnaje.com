/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["i.scdn.co", "scontent.fmaa10-1.fna.fbcdn.net"],
  },
};

module.exports = nextConfig;

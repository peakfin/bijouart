// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true, // ✅ App Router 명시적으로 활성화
  },
};

module.exports = nextConfig;
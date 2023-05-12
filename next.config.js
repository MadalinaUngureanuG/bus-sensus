/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/:path*' // Proxy to Backend because of CORS
      }
    ];
  }
};

module.exports = nextConfig;

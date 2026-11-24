/** @type {import('next').NextConfig} */
const API_TARGET = process.env.API_TARGET || 'http://localhost:8080';

const nextConfig = {
  reactStrictMode: true,
  // In dev, proxy /api/* to the gateway so the enquiry form can post with a
  // relative URL. In production on Netlify, set NEXT_PUBLIC_API_BASE to the
  // gateway's public URL instead (and add that origin to the backend CORS list).
  // "Courses" were renamed "Programs" (Nov 2026). Old links, bookmarks and
  // search results keep working through permanent redirects.
  async redirects() {
    return [
      { source: '/courses', destination: '/programs', permanent: true },
      { source: '/courses/:slug', destination: '/programs/:slug', permanent: true },
    ];
  },
  async rewrites() {
    return [{ source: '/api/:path*', destination: `${API_TARGET}/api/:path*` }];
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  // cor
  async redirects() {
    return [
      // {
      //   source: '/',
      //   destination: '/auth/login',
      //   permanent: false,
      // },
      // {
      //   source: '/dashboard',
      //   destination: '/dashboard/job',
      //   permanent: false,
      // },
    ];
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       // destination: 'http://127.0.0.1:3000/:path*',
  //       // destination: 'http://localhost:3005/:path*', // express server
  //       destination: 'http://localhost:8787/:path*', // local server
  //     },
  //   ];
  // },
};

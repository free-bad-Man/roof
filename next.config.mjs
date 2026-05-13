/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: '/natyazhnye-potolki/v-kvartiru',
        destination: '/natyazhnye-potolki/pod-klyuch/',
        permanent: false,
      },
      {
        source: '/natyazhnye-potolki/v-chastnyy-dom',
        destination: '/natyazhnye-potolki/pod-klyuch/',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
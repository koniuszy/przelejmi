/**
 * @type {import('next').NextConfig}
 */
const configs = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['*'],
  },
}

module.exports = configs

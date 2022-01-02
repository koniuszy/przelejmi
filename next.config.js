const isProd = process.env.VERCEL_ENV === 'production'

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
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack(config) {
    // load worker files as a urls by using Asset Modules
    // https://webpack.js.org/guides/asset-modules/
    config.module.rules.unshift({
      test: /pdf\.worker\.(min\.)?js/,
      type: 'asset/resource',
      generator: {
        filename: 'static/worker/[hash][ext][query]',
      },
    })

    return config
  },
  env: {
    HASURA_ADMIN_TOKEN: (!isProd && process.env.NEXT_PUBLIC_HASURA_ADMIN_TOKEN) || '',
    GQL_API_ENDPOINT: process.env.GQL_API_ENDPOINT || 'https://przelejemi.hasura.app/v1/graphql',
  },
}

module.exports = configs
